# Smart Public Grievance System

A MERN-stack, AI-assisted public grievance redressal system inspired by `pgportal.gov.in`, with a modern, startup-style UI.

## Features

- Citizens can submit grievances with smart AI-based:
  - **Category detection** (Water, Electricity, Road, etc.)
  - **Priority detection** (High / Medium / Low)
- Admin-style dashboard:
  - Total, Pending, In-Progress, Resolved counts
  - Simple charts (Chart.js)
- Track grievance status via **tracking ID**
- Feedback and appeal endpoints
- Modern UI:
  - Tailwind CSS, responsive layout
  - Card-based lists, status badges, hover effects
  - Loading spinners and toast notifications
- Deployment-ready:
  - Backend: Render / any Node host
  - Frontend: Netlify / Vercel
  - Environment-based API URL

---

## 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/grievance_system
OPENAI_API_KEY=your_optional_openai_key_here
CLIENT_URL=http://localhost:3000
```

Run backend:

```bash
node server.js
# or
npm start
```

---

## 2. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` in `frontend`:

```env
REACT_APP_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm start
```

Build for deployment:

```bash
npm run build
```

---

## 3. MongoDB

You can use:

- **Local MongoDB** (default in example): `mongodb://localhost:27017/grievance_system`
- **MongoDB Atlas**: replace `MONGO_URI` in backend `.env` with your Atlas URI.

---

## 4. Deployment Notes

### Backend (Render or similar)

- Set environment variables:
  - `PORT` (Render usually sets this automatically)
  - `MONGO_URI`
  - `OPENAI_API_KEY` (optional)
  - `CLIENT_URL` (frontend URL for CORS)
- Start command: `node server.js`

### Frontend (Netlify or similar)

- Set env var:
  - `REACT_APP_API_URL=https://your-backend-url`
- Build command: `npm run build`
- Publish directory: `build/`

---
