# Next.js Authentication System

A full-featured authentication system built with Next.js 14, TypeScript, MongoDB, and JWT. This project implements user authentication with email verification and password reset functionality.

## Features

- 🔐 User Authentication (Login/Signup)
- ✉️ Email Verification
- 🔑 Password Reset Flow
- 🍪 JWT-based Session Management
- 👤 User Profile Management
- 🎨 Responsive UI with Tailwind CSS
- 🔒 Secure Password Hashing
- 📱 Mobile-Friendly Design

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Email Service:** Custom email service integration
- **Styling:** Tailwind CSS with custom Geist font

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nextjs-auth-system.git
cd nextjs-auth-system
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_SERVICE_KEY=your_email_service_key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

### User Authentication

- `POST /api/users/signup` - Create new user account
- `POST /api/users/login` - User login
- `GET /api/users/logout` - User logout
- `GET /api/users/profile` - Get user profile

### Email Verification

- `POST /api/users/sendVerificationEmail` - Send verification email
- `POST /api/users/verifyEmail` - Verify email address

### Password Management

- `POST /api/users/sendForgetPasswordMail` - Send password reset email
- `POST /api/users/forgetPassword` - Reset password

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
