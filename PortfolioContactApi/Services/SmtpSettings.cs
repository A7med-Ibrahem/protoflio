using System.ComponentModel.DataAnnotations;

namespace PortfolioContactApi.Services;

public class SmtpSettings
{
    public const string SectionName = "Smtp";

    [Required]
    public string Host { get; set; } = string.Empty;

    [Range(1, 65535)]
    public int Port { get; set; } = 587;

    [Required]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;

    public bool EnableSsl { get; set; } = true;

    [Required]
    [EmailAddress]
    public string ToEmail { get; set; } = "ai4456213@gmail.com";

    [EmailAddress]
    public string? FromEmail { get; set; }
}
