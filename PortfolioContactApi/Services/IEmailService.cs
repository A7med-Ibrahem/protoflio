using PortfolioContactApi.Models;

namespace PortfolioContactApi.Services;

public interface IEmailService
{
    Task SendContactEmailAsync(ContactRequest request, CancellationToken cancellationToken = default);
}
