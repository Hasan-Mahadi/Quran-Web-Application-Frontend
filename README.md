<div align="center">
  <h1 align="center">Quran Web Application</h1>
  <p align="center">
    <strong>A modern, full-stack Quran reading platform with beautiful Arabic calligraphy, advanced search, and customizable reading experience</strong>
  </p>
  <p align="center">
    <a href="https://quran-web-apps.netlify.app/" target="_blank">Live Demo</a> •
    <a href="https://github.com/Hasan-Mahadi/Quran-Web-Application-Frontend" target="_blank">Frontend Repo</a> •
    <a href="https://github.com/Hasan-Mahadi/Quran-Web-Application-Backend" target="_blank">Backend Repo</a>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.3.3-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Express.js-4.18.2-000000?style=flat-square&logo=express" alt="Express.js" />
    <img src="https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Deployed-Netlify%20%7C%20Render-00C7B7?style=flat-square" alt="Deployed" />
  </p>
</div>

---



## ✨ Features

### Core Features
- 🕌 **114 Surahs** - Complete Quran with Arabic text and English translations
- 🔍 **Advanced Search** - Search verses by translation with keyword highlighting
- 🎨 **Beautiful UI** - Modern design with glass morphism effects and smooth animations
- 🌙 **Dark Mode** - Eye-friendly dark theme for night reading
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop
- ⚡ **Blazing Fast** - Static Site Generation (SSG) for optimal performance

### Reading Experience
- ✨ **3 Arabic Font Styles** - Uthmanic, Indo-Pak, and Classical calligraphy
- 📏 **Customizable Font Sizes** - Adjust Arabic and translation text sizes independently
- 💾 **Persistent Settings** - Your preferences saved in localStorage
- 🎨 **Beautiful Animations** - Smooth transitions with Framer Motion
- 📖 **Verse Highlighting** - Search terms highlighted in results

### Backend Features
- 🚀 **High Performance** - In-memory caching for lightning-fast responses
- 🔒 **Security** - Helmet.js security headers + rate limiting
- 📊 **Data Caching** - Node-cache for optimized repeated requests
- 🎯 **Type Safe** - Full TypeScript implementation
- 📝 **RESTful API** - Clean, intuitive endpoint structure

---

# 🏗️ System Architecture
┌─────────────────────────────────────────────────────────────┐
│ Client Browser │
│ (User Interface) │
└─────────────────┬───────────────────────────────────────────┘
│
│ HTTPS / API Calls
▼
┌─────────────────────────────────────────────────────────────┐
│ Next.js Frontend (Netlify) │
│ ┌──────────────┬──────────────┬──────────────────────┐ │
│ │ Surah List │ Surah Page │ Search Page │ │
│ │ (SSG) │ (SSG) │ (Client-side) │ │
│ └──────────────┴──────────────┴──────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ React Components + Framer Motion │ │
│ └──────────────────────────────────────────────────────┘ │
└─────────────────┬───────────────────────────────────────────┘
│
│ REST API Calls
▼
┌─────────────────────────────────────────────────────────────┐
│ Express.js Backend (Render/Vercel) │
│ ┌──────────────┬──────────────┬──────────────────────┐ │
│ │ /api/surahs │ /api/surahs/ │ /api/search │ │
│ │ (GET) │ :id (GET) │ (GET) │ │
│ └──────────────┴──────────────┴──────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ In-Memory Cache + Rate Limiting │ │
│ └──────────────────────────────────────────────────────┘ │
└─────────────────┬───────────────────────────────────────────┘
│
│ File System Read
▼
┌─────────────────────────────────────────────────────────────┐
│ JSON Data Files │
│ ┌────────────┬────────────┬──────────────────────────┐ │
│ │ quran.json │ quran_en. │ chapters/index.json │ │
│ │ (Arabic) │ json (Eng) │ (Metadata) │ │
│ └────────────┴────────────┴──────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘


# 📚 API Documentation

### Base URL
Development: http://localhost:5000/api
Production: https://quran-web-apps.netlify.app/


# 🚀 Getting Started
Prerequisites
Node.js 18+

# Installation
1. Clone both repositories
bash
## Frontend
git clone https://github.com/Hasan-Mahadi/Quran-Web-Application-Frontend.git
cd Quran-Web-Application-Frontend

## Backend (in separate directory)
cd ..
git clone https://github.com/Hasan-Mahadi/Quran-Web-Application-Backend.git
cd Quran-Web-Application-Backend
2. Install Backend Dependencies
bash
cd Quran-Web-Application-Backend
npm install
3. Setup Backend Environment
Create .env file in backend directory:

env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
4. Add Quran Data Files
Place your JSON files in backend/src/data/:

quran.json - Arabic text

quran_en.json - English translation

chapters/index.json - Surah metadata

5. Start Backend Server
bash
npm run dev
# Server runs on http://localhost:5000
6. Install Frontend Dependencies
Open a new terminal:

bash
cd Quran-Web-Application-Frontend
npm install
7. Setup Frontend Environment
Create .env.local file in frontend directory:

env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
8. Start Frontend Development Server
bash
npm run dev
## App runs on http://localhost:3000
9. Open Your Browser
Visit http://localhost:3000 to see the application.

#🔐 Environment Variables
Frontend (.env.local)
env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# Production:
# NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
Backend (.env)
env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
# Production:
# NODE_ENV=production
# FRONTEND_URL=https://your-frontend-url.netlify.app


## 📄 License
This project is open source and available under the MIT License.

## 📞 Support
For issues, questions, or contributions:

GitHub Issues: [Create an issue](https://github.com/Hasan-Mahadi/Quran-Web-Application-Frontend/issues)

Live Demo: https://quran-web-apps.netlify.app/

## 👨‍💻 Developer
Hasan Mahadi

GitHub: [@Hasan-Mahadi](https://github.com/Hasan-Mahadi)

Frontend Repo: [Quran-Web-Application-Frontend](https://github.com/Hasan-Mahadi/Quran-Web-Application-Frontend.git)

Backend Repo: [Quran-Web-Application-Backend](https://github.com/Hasan-Mahadi/Quran-Web-Application-Backend.git)

Live App: https://quran-web-apps.netlify.app/

<div align="center"> <sub>Built with ❤️ for the Ummah</sub> </div> ```
