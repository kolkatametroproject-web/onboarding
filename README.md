# MRPSP Onboarding Program

A comprehensive onboarding platform for MRPSP candidates with examination, admit card generation, interview scheduling, and admin dashboard.

## Features

### Candidate Features
- Registration & Authentication
- Login & Dashboard
- Admit Card Download
- Examination Portal with Anti-Cheat
- Webcam Verification
- Results & Performance
- Interview Schedule

### Admin Features
- Admin Dashboard
- Candidate Management
- Batch Allocation
- Question Bank Management
- Exam Management
- Results Analysis
- Interview Scheduling

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Hosting**: GitHub Pages
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Cloud Storage

## Firebase Configuration

Project ID: `onboarding-mrpsp`

Database URL: `https://onboarding-mrpsp-default-rtdb.firebaseio.com`

## Database Structure

```
mrpsp/
├── candidates/
├── questions/
├── exams/
├── results/
├── batches/
├── interviews/
└── settings/
```

## Getting Started

1. Clone this repository
2. Configure Firebase credentials in `js/firebase-config.js`
3. Enable GitHub Pages in repository settings
4. Access the site at `https://kolkatametroproject-web.github.io/onboarding/`

## File Structure

```
├── index.html              → Home Page
├── register.html           → Registration
├── login.html              → Login
├── dashboard.html          → Candidate Dashboard
├── admit-card.html         → Admit Card
├── exam.html               → Examination
├── result.html             → Results
├── interview.html          → Interview Schedule
├── admin/
│   ├── index.html          → Admin Login
│   ├── dashboard.html      → Admin Dashboard
│   ├── candidates.html     → Candidate Management
│   ├── batches.html        → Batch Management
│   ├── questions.html      → Question Bank
│   ├── exams.html          → Exam Management
│   ├── results.html        → Results
│   └── interviews.html     → Interview Management
├── js/
│   ├── firebase-config.js  → Firebase Setup
│   ├── auth.js             → Authentication Logic
│   ├── database.js         → Database Operations
│   └── utils.js            → Utility Functions
├── css/
│   ├── style.css           → Global Styles
│   └── admin.css           → Admin Styles
└── assets/
    └── images/             → Icons & Images
```

## Security Notes

- Firebase API Key is visible in client-side code but is NOT a secret
- Security is enforced through Firebase Authentication and Database Rules
- Production deployment should use Firebase Security Rules
- Enable App Check for additional protection

## License

MRPSP Onboarding Program © 2026
