using Microsoft.AspNetCore.Mvc;
using PortfolioContactApi.Models;
using PortfolioContactApi.Services;

namespace PortfolioContactApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IEmailService emailService, ILogger<ContactController> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Send([FromBody] ContactRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            var validationErrors = ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .SelectMany(kvp => kvp.Value!.Errors.Select(err => $"{kvp.Key}: {err.ErrorMessage}"));

            return BadRequest(new ApiResponse(false, $"Invalid request payload. {string.Join(" | ", validationErrors)}"));
        }

        try
        {
            await _emailService.SendContactEmailAsync(request, cancellationToken);
            return Ok(new ApiResponse(true, "Message sent successfully."));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Configuration or SMTP issue while sending contact email.");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new ApiResponse(false, ex.Message));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error while processing contact form.");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new ApiResponse(false, "An unexpected error occurred."));
        }
    }

    [HttpGet("health")]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status200OK)]
    public IActionResult Health() => Ok(new ApiResponse(true, "Contact API is running."));
}
