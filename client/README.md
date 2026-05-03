# Client (React + Vite)

## Overview

Single-page app for riders and captains. Uses React Router for navigation, Tailwind for styling, Axios for API calls, and Socket.IO for realtime events.

## Setup

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
echo VITE_BASE_URL=http://localhost:3000 > .env
```

Start the dev server:

```bash
npm run dev
```

## Environment Variables

- `VITE_BASE_URL`: Base URL of the API server. Used for REST endpoints and Socket.IO.

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Lint the project

## Routes

Public routes:

- `/` - Landing (Start)
- `/login` - User login
- `/signup` - User signup
- `/captain-login` - Captain login
- `/captain-signup` - Captain signup

User routes (protected):

- `/home` - User home
- `/riding` - User ride status
- `/user/logout` - User logout

Captain routes (protected):

- `/captain-home` - Captain home
- `/captain-riding` - Captain ride status
- `/captain/logout` - Captain logout

## Authentication Flow

- Login and signup store the JWT in `localStorage` under `token`.
- Protected routes use `UserProtectWrapper` or `CaptainProtectWrapper` to fetch `/api/users/profile` or `/api/captains/profile`.
- If the token is missing or invalid, the user is redirected to the respective login page.

## Realtime Events

Socket.IO connects to `VITE_BASE_URL` on load.

Common events emitted by the server:

- `new-ride` - Notify captains of a new ride
- `ride-confirmed` - Notify user when a ride is accepted
- `ride-started` - Notify user when a ride starts
- `ride-ended` - Notify user when a ride ends

## Folder Highlights

- `src/pages` - Route-level screens
- `src/components` - Reusable UI pieces (ride panels, tracking, popups)
- `src/context` - Global state (user, captain, socket)
