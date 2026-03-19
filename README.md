# 🧪 Virtual Chemistry Lab

An interactive, gamified, and AI-powered Virtual Chemistry Laboratory built with the MERN stack. Conduct realistic experiments, earn points, and learn chemistry through a premium, immersive web experience.

![Virtual Lab Dashboard](https://raw.githubusercontent.com/Abhishek-IEM/Virtual-Chemistry-Lab-/main/client/src/assets/hero.png)

## 🚀 Features

- **6 Interactive Simulations**:
  - **Acid-Base Titration**: Neutralize HCl with NaOH using phenolphthalein.
  - **pH Testing**: Observe color changes with universal indicators across different pH levels.
  - **Precipitation Reaction**: Mix AgNO₃ and NaCl to form a white AgCl precipitate.
  - **Neutralization Reaction**: Achieve perfect pH 7 balance between acids and bases.
  - **Filtration**: Separate solids from liquids using specialized lab equipment.
  - **Chemical Mixing**: Witness displacement reactions (Zn + CuSO₄) with real-time color shifts.
- **Gamified Progress**: Earn points for every successful experiment and track your completion stats on a sleek dashboard.
- **Secure Authentication**: Custom Email/Password signup/login system powered by JWT and secure HTTP-only cookies.
- **Password Recovery**: Integrated SMTP email service for secure password reset workflows.
- **Premium UI/UX**: Responsive glassmorphic design featuring smooth animations with Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Framer Motion, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JWT, BcryptJS, Cookie-Parser.
- **Email**: Nodemailer (SMTP).

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB Atlas account or local MongoDB instance.
- Gmail account (for SMTP email features).

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Abhishek-IEM/Virtual-Chemistry-Lab-.git
cd Virtual-Chemistry-Lab-
```

### 2. Backend Configuration
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder with the following:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:5173

# Email SMTP (Gmail recommended)
MAIL_FROM=your-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Frontend Configuration
Navigate to the `client` directory and install dependencies:
```bash
cd ../client
npm install
```

### 4. Seed Experiments data
Populate the database with the initial experiment definitions:
```bash
cd ../server
npm run seed
```

## 🏃 Running the Application

### Start the Backend
```bash
cd server
npm start
```
*Server runs at `http://localhost:5000`*

### Start the Frontend
```bash
cd client
npm run dev
```
*App runs at `http://localhost:5173`*

## 🧪 Experiments Overview

| Experiment | Difficulty | Points | Description |
|------------|------------|--------|-------------|
| Acid-Base Titration | Intermediate | 60 | HCl vs NaOH with Phenolphthalein |
| pH Testing | Beginner | 50 | Indicator color scale analysis |
| Precipitation | Beginner | 55 | Forming AgCl white precipitate |
| Neutralization | Beginner | 50 | Achieving pH 7 equilibrium |
| Filtration | Intermediate | 55 | Physical separation techniques |
| Chemical Mixing | Intermediate | 50 | Displacement reactions & redox |

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Developed with ❤️ by [Abhishek](https://github.com/Abhishek-IEM)
