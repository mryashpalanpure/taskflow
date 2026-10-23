# 🚀 TaskFlow - 3-Tier Architecture MERN Stack Project

A clean, modular, and production-structured **MERN (MongoDB, Express, React, Node.js)** application designed with **3-Tier Architecture**.

---

## 🏛️ 3-Tier Architecture Breakdown

```
+--------------------------------------------------------------+
|             TIER 1: PRESENTATION LAYER (Client)              |
|   React (Vite) + Component Hierarchy + Modern UI Styling    |
|   Runs on: http://localhost:5173                             |
+------------------------------+-------------------------------+
                               |
                        HTTP / REST API
                               |
+------------------------------v-------------------------------+
|             TIER 2: APPLICATION LAYER (Server)               |
|   Node.js + Express.js API                                   |
|   Controllers, Business Logic, Middleware, Route Handlers    |
|   Runs on: http://localhost:5000                             |
+------------------------------+-------------------------------+
                               |
                        Mongoose Driver
                               |
+------------------------------v-------------------------------+
|                TIER 3: DATA LAYER (Database)                 |
|   MongoDB Database (Port 27017)                              |
|   Data Persistence, Schemas, Validation & Storage            |
+--------------------------------------------------------------+
```

### 1. **Tier 1: Presentation Tier (`/client`)**
- Built with **React 18** and **Vite** for lightning-fast bundling.
- Visual **3-Tier Live Health Monitor** checking connectivity with Tier 2 and Tier 3.
- Features: Task creation, full CRUD operations, priority tags (`low`, `medium`, `high`), status filtering (`pending`, `in-progress`, `completed`), and search.
- Clean responsive layout styled with modern CSS variables.

### 2. **Tier 2: Application / Logic Tier (`/server`)**
- Built with **Node.js** and **Express.js**.
- Structured with separation of concerns:
  - `src/controllers/`: Handles HTTP request/response business logic.
  - `src/models/`: Defines Mongoose data schemas.
  - `src/routes/`: Route definitions for endpoints.
  - `src/middlewares/`: Centralized error handler and 404 handler.
  - `src/config/`: Database connection and connection state check.
  - `src/app.js`: Express app instance separated for seamless unit testing.
  - `src/server.js`: Server startup and graceful process shutdown.
- **Health Check Endpoint (`/api/health`)**: Real-time server health, uptime, memory, and database status.
- **Unit & Integration Tests**: Ready-to-run test suite using **Jest** and **Supertest**.

### 3. **Tier 3: Data Tier (`MongoDB`)**
- MongoDB instance holding the `taskflow_db` database.
- Managed via Mongoose ODM with schema validations and automatic timestamps.

---

## 📂 Project Directory Structure

```text
Jenkins/
├── client/                     # [TIER 1: PRESENTATION]
│   ├── public/
│   ├── src/
│   │   ├── api/                # Axios API service
│   │   │   └── api.js
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ArchitectureTiers.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskFilter.jsx
│   │   │   └── TaskModal.jsx
│   │   ├── App.jsx             # Main state coordinator
│   │   ├── index.css           # Modern design system
│   │   └── main.jsx            # React root
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js          # API proxy configuration
│   └── .env.example
│
├── server/                     # [TIER 2: APPLICATION]
│   ├── src/
│   │   ├── config/             # DB connection config
│   │   │   └── db.js
│   │   ├── controllers/        # Request handling logic
│   │   │   └── taskController.js
│   │   ├── middlewares/        # Global error & 404 handlers
│   │   │   └── errorHandler.js
│   │   ├── models/             # Mongoose schemas
│   │   │   └── Task.js
│   │   ├── routes/             # REST endpoints
│   │   │   ├── healthRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── app.js              # Express app definition
│   │   └── server.js           # Server listen & shutdown
│   ├── tests/                  # Test suite
│   │   └── api.test.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── package.json                # Root helper scripts
└── README.md
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** running locally on default port `27017` (or MongoDB Atlas connection string)

### 2. Install Dependencies
Run from the root directory:
```bash
npm run install:all
```
*Or install individually:*
```bash
cd server && npm install
cd ../client && npm install
```

### 3. Environment Setup
Check `server/.env` (already created with defaults):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/taskflow_db
CLIENT_URL=http://localhost:5173
```

Check `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Running the Application

Open two terminal windows:

#### Terminal 1: Run Backend (Tier 2)
```bash
cd server
npm run dev
```
*Backend runs on `http://localhost:5000`*

#### Terminal 2: Run Frontend (Tier 1)
```bash
cd client
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🧪 Running Tests

The backend includes automated tests using **Jest** and **Supertest**:
```bash
cd server
npm test
```
Or from the root directory:
```bash
npm test
```

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check (Uptime, Memory, DB status) |
| `GET` | `/api/tasks` | Get all tasks (supports `?search=`, `?status=`, `?priority=`) |
| `GET` | `/api/tasks/:id` | Get single task details |
| `POST` | `/api/tasks` | Create new task (`title`, `description`, `status`, `priority`) |
| `PUT` | `/api/tasks/:id` | Update existing task |
| `DELETE` | `/api/tasks/:id` | Delete a task |
