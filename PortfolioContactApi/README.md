# PortfolioContactApi (.NET 7)

ASP.NET Core Web API for a portfolio contact form with SMTP delivery.

## What this project does
- Exposes `POST /api/contact`.
- Validates input JSON (`name`, `email`, `subject`, `message`).
- Sends email using `System.Net.Mail` through SMTP.
- Returns JSON responses in all cases.
- Includes frontend form at `wwwroot/index.html`.

## SMTP config (critical)
Update `appsettings.json`:

```json
"Smtp": {
  "Host": "smtp.gmail.com",
  "Port": 587,
  "Username": "ai4456213@gmail.com",
  "Password": "YOUR_REAL_GMAIL_APP_PASSWORD",
  "EnableSsl": true,
  "ToEmail": "ai4456213@gmail.com",
  "FromEmail": "ai4456213@gmail.com"
}
```

### Gmail requirements
1. Enable 2-Step Verification on your Google account.
2. Generate a **Google App Password** (16 chars).
3. Put this App Password in `Smtp:Password`.
4. Do **not** use your normal Gmail login password.

If password is still placeholder, API now returns explicit error.

## Run
```bash
dotnet restore PortfolioContactApi/PortfolioContactApi.csproj
dotnet run --project PortfolioContactApi/PortfolioContactApi.csproj
```

Open:
- `https://localhost:7188`
- `http://localhost:5188`

## Test quickly
Health endpoint:
```bash
curl http://localhost:5188/api/contact/health
```

Send test message:
```bash
curl -X POST http://localhost:5188/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "subject":"SMTP test",
    "message":"Hello from curl test message."
  }'
```

Success response:
```json
{ "success": true, "message": "Message sent successfully." }
```
