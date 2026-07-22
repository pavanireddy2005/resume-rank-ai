# ResumeRank AI

ResumeRank AI is an AI-powered resume analysis platform that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS). Users can upload resumes, receive an ATS compatibility score, identify missing keywords, and get AI-powered suggestions to improve their chances of landing interviews.

---

## Features

- AI-powered Resume Analysis
- ATS Compatibility Score
- Resume Upload
- Keyword Matching
- AI Suggestions
- User Authentication
- Profile Management
- Responsive Dashboard
- Secure API Integration

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/resume-rank-ai.git
```

Go to the project directory:

```bash
cd resume-rank-ai
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend:

```
http://localhost:3000
```

Backend:

```
http://localhost:5000
```

---

## Environment Variables

Create a `.env.local` file for the frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Create a `.env` file for the backend:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Project Structure

```
src
├── app
├── components
│   ├── landing
│   ├── layout
│   ├── auth
│   ├── resume
│   └── ui
├── context
├── lib
└── ...
```

---

## Future Improvements

- Resume PDF Preview
- AI Resume Generation
- Multiple Resume Versions
- Dark Mode
- Email Notifications
- Interview Preparation

---

## License

This project is developed for educational and portfolio purposes.