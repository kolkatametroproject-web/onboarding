# MRPSP Onboarding Examination Portal

A railway-style computer based examination portal designed for the MRPSP onboarding program.

## Included

- Candidate registration with unique enrollment number
- Firebase Realtime Database integration
- Firebase Storage photo upload
- Candidate dashboard
- Admit-card view
- CBT exam interface with question palette
- Server-backed result storage
- Tab-switch and fullscreen warning logging
- Webcam permission gate
- Admin authentication and dashboard
- Firebase-ready architecture

## GitHub Pages

This is a static frontend and can be hosted from GitHub Pages.

1. Upload all files to your GitHub repository.
2. Open Settings → Pages.
3. Select Deploy from a branch.
4. Select `main` and `/root`.
5. Save.

## Firebase setup

Enable:
- Authentication
- Realtime Database
- Storage

Create an administrator account in Firebase Authentication.

For production, replace the starter Realtime Database rules with restrictive rules tied to authenticated users and server-side validation. The included rules are a development starting point and should not be treated as production security.

## Important production security

The browser cannot be trusted for exam scoring, timer enforcement, identity decisions, or administrator authorization. For a real high-stakes exam, add a trusted backend or Firebase Cloud Functions to validate exam sessions, score submissions, enforce timing, protect the answer key, and manage privileged admin operations.

The UI is inspired by formal railway/CBT examination portals but is not an official TCS iON or Indian Railways interface.
