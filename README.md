# Ahmed Ibrahim Portfolio

A modern, responsive portfolio website for **Ahmed Ibrahim**, a Full-Stack .NET Developer, showcasing skills, projects, experience, and contact information.

## ✨ Highlights
- Clean one-page portfolio with smooth section navigation.
- Responsive layout with mobile menu.
- Light/Dark mode with saved user preference.
- Animated skills bars and scroll reveal effects.
- Profile image lightbox and polished UI interactions.
- Contact form UX with loading/success/error states.
- Optional ASP.NET Core backend API for sending contact emails via SMTP.

## 🧰 Tech Stack
### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome + Google Fonts

### Backend (optional)
- ASP.NET Core Web API (.NET 7)
- SMTP email service (`System.Net.Mail`)
- Swagger/OpenAPI (development)

## 📁 Project Structure

```text
.
├── index.html
├── style.css
├── script.js
├── image/
│   └── ...
├── Dipak_Dey__CV.pdf
└── PortfolioContactApi/
    ├── Controllers/
    ├── Models/
    ├── Services/
    ├── wwwroot/
    ├── Program.cs
    └── PortfolioContactApi.csproj
```

## 🚀 Run Locally

### 1) Frontend only (quickest)
You can run the portfolio as a static site:

- Open `index.html` directly in your browser, **or**
- Serve with a local server (recommended):

```bash
python3 -m http.server 8080
```

Then visit: `http://localhost:8080`

### 2) Backend API (contact email)
From the repository root:

```bash
cd PortfolioContactApi
dotnet restore
dotnet run
```

Default local URLs are printed in terminal (typically similar to `https://localhost:7188` / `http://localhost:5188`).

## ⚙️ SMTP Configuration (Backend)
Edit `PortfolioContactApi/appsettings.json`:

```json
"Smtp": {
  "Host": "smtp.gmail.com",
  "Port": 587,
  "Username": "your-email@example.com",
  "Password": "YOUR_APP_PASSWORD",
  "EnableSsl": true,
  "ToEmail": "your-email@example.com",
  "FromEmail": "your-email@example.com"
}
```

> For Gmail, use an **App Password** (not your account password).

## 📬 API Endpoint
When backend is running:

- `POST /api/contact`
- Body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "subject": "Project Opportunity",
  "message": "Hello Ahmed, I'd like to discuss..."
}
```

## 🛠️ Customization Tips
- Update personal details, social links, and project entries in `index.html`.
- Adjust colors, spacing, and theme variables in `style.css`.
- Modify interactions/animations and contact behavior in `script.js`.
- Replace CV and images with your own assets.

## 📄 License
This project is available for personal portfolio use and customization.
