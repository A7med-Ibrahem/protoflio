# PortfolioContactApi (.NET 7)

A complete ASP.NET Core Web API project for a portfolio contact form.

## Features
- `POST /api/contact` endpoint.
- Validates incoming JSON payload (`name`, `email`, `subject`, `message`).
- Sends email through SMTP using `System.Net.Mail`.
- Uses `appsettings.json` for SMTP configuration.
- Returns consistent JSON success/error responses.
- Includes a simple frontend form (`wwwroot/index.html`) with AJAX.

## Required SMTP setup
Update `appsettings.json`:

```json
"Smtp": {
  "Host": "smtp.gmail.com",
  "Port": 587,
  "Username": "ai4456213@gmail.com",
  "Password": "YOUR_APP_PASSWORD",
  "EnableSsl": true,
  "ToEmail": "ai4456213@gmail.com",
  "FromEmail": "ai4456213@gmail.com"
}
```

> For Gmail, create an App Password and place it in `Password`.

## Run locally
```bash
dotnet restore
dotnet run --project PortfolioContactApi.csproj
```

Then open: `https://localhost:7188` or `http://localhost:5188`
