# Genç Yeşilay — Niğde Ömer Halisdemir University (NÖHÜ) Website

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Payload CMS](https://img.shields.io/badge/Payload_CMS-000000?style=for-the-badge&logo=payload&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

This project hosts the official website and content management infrastructure for the **Niğde Ömer Halisdemir University Genç Yeşilay Club**. Built with "quiet & clean" modern design principles, it aims to provide an accessible experience that volunteers can easily use while maintaining a corporate feel.

**🌐 Live Demo:** [https://nohugencyesilay.mustafacan.dev/](https://nohugencyesilay.mustafacan.dev/)

## 📸 Screenshots

Here are some sample visuals from key sections of our website:

### Home Page (Events and Hero Section)
![Home Page](https://i.imgur.com/ClKhEnb.png)

### About Us
![About Us](https://i.imgur.com/SbMWR9Z.png)

### Event Detail Page
![Event Detail](https://i.imgur.com/zefjQss.jpeg)

### Admin Panel (Payload CMS - Volunteer Usage)
![Admin Panel](https://i.imgur.com/RsnxUVb.png)

## 🚀 Technologies and Architecture

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Content Management System (CMS):** [Payload CMS v3](https://payloadcms.com/) (Integrated into Next.js)
*   **UI & Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Preline UI](https://preline.co/) / Framer Motion
*   **Database:** SQLite
*   **Language:** TypeScript
*   **Testing:** Vitest (Integration) & Playwright (E2E)

## 🎨 Design System (Quiet Modern Yeşilay)

"Corporate" and "Trust-inspiring" tones were preferred in the project design:
-   **Yeşilay Color Palette:** `yesilay` tones loyal to the logo and culture.
-   **Background:** Light gray colors (`kurumsal` class) that do not tire the eyes and feel professional instead of pure white.

## 🛠️ Local Setup & Development

Follow the steps below to run the project on your local machine. (**pnpm** is recommended as the package manager.)

### 1. Clone the Repository

```bash
git clone https://github.com/mustafacangoktas/gencyesilay-web.git
cd website
```

### 2. Set Up Environment Variables

You need a `.env` file for the project to run properly.

```bash
cp .env.example .env
```
Update the values if necessary.

### 3. Install Dependencies and Run

```bash
pnpm install
pnpm dev
```

Once the server is up:
- **Website:** [http://localhost:3000](http://localhost:3000)
- **Admin Panel (Payload CMS):** Access it at [http://localhost:3000/admin](http://localhost:3000/admin).

## 🗃️ Admin Panel

Data entry can be done via the admin panel without needing technical knowledge:
-   **Events:** Add event news and announcements.
-   **Team:** Club team list, coordinators, etc.
-   **Certificates:** Club members and event participation certificates.
-   **Motivations** and **Feedbacks:** User feedback.
-   **Media:** Your pictures and documents.

## 📜 License & Usage Rights

This project is **CLOSED TO COMMERCIAL USE**. In case this repository or its codes are used by third parties, it is mandatory to provide a reference (attribution) to this repository. See the `LICENSE` file for details.
