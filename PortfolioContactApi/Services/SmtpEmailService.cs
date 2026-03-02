using System.Net;
using System.Net.Mail;
using System.Text;
using Microsoft.Extensions.Options;
using PortfolioContactApi.Models;

namespace PortfolioContactApi.Services;

public class SmtpEmailService : IEmailService
{
    private readonly SmtpSettings _smtpSettings;
    private readonly ILogger<SmtpEmailService> _logger;

    public SmtpEmailService(IOptions<SmtpSettings> smtpOptions, ILogger<SmtpEmailService> logger)
    {
        _smtpSettings = smtpOptions.Value;
        _logger = logger;
    }

    public async Task SendContactEmailAsync(ContactRequest request, CancellationToken cancellationToken = default)
    {
        ValidateSmtpSettings(_smtpSettings);

        var fromEmail = string.IsNullOrWhiteSpace(_smtpSettings.FromEmail)
            ? _smtpSettings.Username
            : _smtpSettings.FromEmail;

        using var message = new MailMessage
        {
            From = new MailAddress(fromEmail, "Portfolio Contact Form"),
            Subject = $"[Portfolio Contact] {request.Subject}",
            Body = BuildBody(request),
            IsBodyHtml = false
        };

        message.To.Add(_smtpSettings.ToEmail);
        message.ReplyToList.Add(new MailAddress(request.Email, request.Name));

        using var client = new SmtpClient(_smtpSettings.Host, _smtpSettings.Port)
        {
            EnableSsl = _smtpSettings.EnableSsl,
            Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password),
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false
        };

        try
        {
            cancellationToken.ThrowIfCancellationRequested();
            await client.SendMailAsync(message, cancellationToken);
            _logger.LogInformation("Contact email sent successfully for {Email}", request.Email);
        }
        catch (SmtpException ex)
        {
            _logger.LogError(ex, "SMTP error while sending contact email.");
            throw new InvalidOperationException("Email could not be sent due to an SMTP error.", ex);
        }
    }

    private static string BuildBody(ContactRequest request)
    {
        var body = new StringBuilder();
        body.AppendLine("New contact form submission:");
        body.AppendLine($"Name: {request.Name}");
        body.AppendLine($"Email: {request.Email}");
        body.AppendLine($"Subject: {request.Subject}");
        body.AppendLine("Message:");
        body.AppendLine(request.Message);

        return body.ToString();
    }

    private static void ValidateSmtpSettings(SmtpSettings settings)
    {
        if (string.IsNullOrWhiteSpace(settings.Host) ||
            string.IsNullOrWhiteSpace(settings.Username) ||
            string.IsNullOrWhiteSpace(settings.Password) ||
            string.IsNullOrWhiteSpace(settings.ToEmail))
        {
            throw new InvalidOperationException("SMTP settings are incomplete. Check appsettings configuration.");
        }
    }
}
