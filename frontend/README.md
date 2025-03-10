# XpenseTrack

# XpenseTrack

XpenseTrack is a modern and user-friendly expense tracking web application that helps users manage their finances effectively. Track your daily expenses, set budgets, and analyze spending trends with ease.

## 🚀 Features

- 📊 **Dashboard Overview** – Get a quick summary of your financial status.
- 📝 **Expense Logging** – Add, and delete expenses effortlessly.
- 📅 **Category-Based Tracking** – Organize expenses under different categories.
- 📈 **Spending Analytics** – Visualize spending patterns with charts.
- 💰 **Budget Management** – Set limits and track your financial goals.
- 🔐 **Secure Authentication** – Firebase Authentication for user login and registration.
- 🌍 **Multi-Device Support** – Works on desktop, tablet, and mobile.

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** Firebase Authentication
- **State Management:** Redux (Optional)
- **Deployment:** Vercel / Netlify (Frontend), Render / Heroku (Backend)

## 📦 Installation & Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Abhi-2765/XpenseTrack.git
   cd XpenseTrack
   ```

2. **Backend Setup**
   ```sh
   cd backend
   npm install
   cp .env.example .env  
   npm run dev
   ```

3. **Frontend Setup**
   ```sh
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Environment Variables**
   Configure your `.env` file for the backend:
   ```ini
   PORT=5000
   DATABASE_URL=mongodb+srv://your-db-url
   JWT_SECRET=your-secret-key
   FIREBASE_API_KEY=your-firebase-api-key
   FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   FIREBASE_PROJECT_ID=your-firebase-project-id
   ```

   For the frontend (`.env` in the root of `frontend`):
   ```ini
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   ```

## 🚀 Deployment

### **Frontend (Netlify/Vercel)**
- Deploy using Vercel: `vercel`
- Deploy using Netlify: Connect repo and set build command: `npm run build`, publish `dist/`

### **Backend (Render/Heroku)**
- Render: Set environment variables and deploy
- Heroku: Use `heroku create` and push the backend repo

## 🛠️ Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## 📜 License

MIT License © 2024 XpenseTrack

---

🎉 **Happy Budgeting!** 🚀


