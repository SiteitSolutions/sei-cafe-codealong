# sei-cafe-codealong

MERN stack starter for the SiteIT Solutions SEI MERN codealong (W11D3).

## Stack

- MongoDB (Atlas)
- Express 4
- React 17
- Node.js
- JWT authentication (jsonwebtoken + bcrypt)

## Prerequisites

- Node.js (installed via SEI Installfest)
- MongoDB Atlas account (free tier)
- A code editor (VS Code)

## Setup

```bash
git clone https://github.com/SiteitSolutions/sei-cafe-codealong.git
cd sei-cafe-codealong
npm install
cp .env.example .env
# Edit .env — add your MongoDB Atlas connection string and a JWT secret

# Start the Express API server (port 3001):
node server.js

# In a second terminal, start the React dev server (port 3000):
npm start
```

## Environment Variables

`DATABASE_URL` — Your MongoDB Atlas connection string
`SECRET` — A random string used to sign JWT tokens

## Architecture

This is a MERN monorepo. Express serves the API from `server.js` under `/api/`.
React (Create React App) lives in `src/` and communicates with the API via the
proxy setting in `package.json` (`http://localhost:3001` during development).
