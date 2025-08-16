# Learnify

![Next.js](https://img.shields.io/badge/Next.js-14.0.0-blue?style=flat-square&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue?style=flat-square&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.0-blue?style=flat-square&logo=tailwind-css) ![Clerk](https://img.shields.io/badge/Clerk-Authentication-blue?style=flat-square&logo=clerk) ![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green?style=flat-square&logo=node.js) ![Vercel](https://img.shields.io/badge/Vercel-Hosting-black?style=flat-square&logo=vercel) ![React](https://img.shields.io/badge/React-18.0.0-blue?style=flat-square&logo=react) ![PostCSS](https://img.shields.io/badge/PostCSS-CSS%20Processing-red?style=flat-square&logo=postcss) ![Serverless](https://img.shields.io/badge/Serverless-Functions-orange?style=flat-square&logo=serverless)

A professional-grade Learning Management System (LMS) built with modern web technologies. Learnify is designed to provide a seamless and secure learning experience for users, featuring robust authentication, interactive course management, and comprehensive progress tracking.

### Live URL

[https://learnify-new-1.vercel.app/dashboard](https://learnify-new-1.vercel.app/dashboard)

---

## Website Pages

### Landing Page
<div align="center">
  <img src="assets/images/img-landing.png" alt="Landing Page" width="600" />
</div>
<p>The main entry point to Learnify, showcasing its features and inviting users to sign up or log in.</p>

### Sign-Up Page
<div align="center">
  <img src="assets/images/img-sign-up.png" alt="Sign-Up Page" width="600" />
</div>
<p>Allows new users to create an account and start their learning journey.</p>

### Dashboard
<div align="center">
  <img src="assets/images/img-dashboard.png" alt="Dashboard" width="600" />
</div>
<p>Provides an overview of the user's enrolled courses, progress, and quick access to resume learning.</p>

### Browse Courses
<div align="center">
  <img src="assets/images/img-browse-courses.png" alt="Browse Courses" width="600" />
</div>
<p>Displays a catalog of available courses, allowing users to explore and enroll in new learning opportunities.</p>

### Community Page
<div align="center">
  <img src="assets/images/img-community.png" alt="Community Page" width="600" />
</div>
<p>Engage with other learners through discussions, Q&A, and resource sharing.</p>

### Courses Page
<div align="center">
  <img src="assets/images/img-courses.png" alt="Courses Page" width="600" />
</div>
<p>Detailed information about individual courses, including curriculum and learning objectives.</p>

### Progress Page
<div align="center">
  <img src="assets/images/img-progress.png" alt="Progress Page" width="600" />
</div>
<p>Track your learning progress with visual indicators and detailed analytics.</p>

---

## Features

### Authentication
- **Email/Password Login**: Secure credential-based sign-in.
- **Google Authentication**: Easy login with Google accounts.
- **Password Reset**: Secure password recovery via email.
- **Session Management**: Track and manage active sessions across devices.
- **Two-Factor Authentication (2FA)**: Enhanced account security.

### Dashboard
- **Course Overview**: View enrolled courses and progress.
- **Progress Tracking**: Visual indicators for course completion.
- **Quick Access**: Resume learning from where you left off.

### Course Management
- **Course Catalog**: Browse and filter available courses.
- **Dynamic Course Pages**: Detailed course information and curriculum.
- **Learning Paths**: Structured learning sequences.

### Community Features
- **Discussion Forums**: Engage with other learners.
- **Q&A**: Ask and answer questions.
- **Resource Sharing**: Share learning materials.

### Security
- **Protected Routes**: Middleware ensures only authenticated users access sensitive pages.
- **IP and Device Tracking**: Monitor login activity for suspicious behavior.
- **Content Security Policies**: Prevent unauthorized access and attacks.

---

## How It Works

Learnify is a full-stack web application leveraging the following technologies:
- **Next.js**: For server-side rendering and file-based routing.
- **TypeScript**: Ensures type safety and better developer experience.
- **Tailwind CSS**: Provides utility-first styling for rapid UI development.
- **Clerk**: Handles authentication and user management.
- **Node.js**: Backend runtime for server-side logic.

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jjacobsonn/lms-framework.git
   cd lms-framework
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Copy the example environment file:
     ```bash
     cp .env.example .env.local
     ```
   - Update `.env.local` with your Clerk API keys and other required configurations.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

---

## Deployment

Learnify is deployed on Vercel, a platform optimized for Next.js applications. Vercel provides seamless integration with GitHub, automatic deployments, and serverless functions.

### Live Demo

You can access the live application here:

[Learnify Dashboard](https://learnify-new-1.vercel.app/dashboard){:target="_blank"}

### Hosting Details

- **Platform**: Vercel
- **Domain**: [https://learnify-new-1.vercel.app/dashboard](https://learnify-new-1.vercel.app/dashboard)
- **Features**:
  - Automatic deployments from GitHub
  - Serverless functions for backend logic
  - Free SSL certificates
  - Global CDN for fast content delivery

---

## Libraries and Tools Used for Hosting

- **Vercel**: For hosting and deployment
- **GitHub**: Version control and CI/CD integration
- **Next.js**: Framework for server-side rendering and static site generation
- **Clerk**: Authentication and user management
- **Tailwind CSS**: Styling framework
- **Node.js**: Backend runtime

---

## Disclaimer

This project is provided "as is" without any warranty. Use at your own risk. The authors are not responsible for any issues or damages arising from the use of this software.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
