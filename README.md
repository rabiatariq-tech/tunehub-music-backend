# 🎵 TuneHub — Music Backend API

TuneHub is a Spotify-inspired backend API built to practice backend development with **Node.js, Express.js, MongoDB, authentication, authorization, and cloud file storage**.

> **Note:** This is an educational project and is not intended to be production-ready.

---

## 🚀 Features

- User registration, login, and logout
- JWT-based authentication
- Role-Based Access Control (User / Artist)
- Password hashing with bcrypt
- Artist-only music uploads
- Album creation and retrieval
- MongoDB relationships using Mongoose
- Music file uploads using Multer
- Cloud storage using ImageKit
- API testing with Postman

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JWT**
- **bcryptjs**
- **Multer**
- **ImageKit**
- **Postman**

---

## 🏗️ Project Structure

```text
src/
├── controller/      # Request handling & business logic
├── db/              # MongoDB connection
├── middlewares/     # Authentication & authorization
├── model/           # Mongoose schemas
├── route/           # API routes
├── services/        # ImageKit file storage
└── app.js

server.js
.env.example
.gitignore
package.json
```

---

## 🔐 Authentication & Authorization

TuneHub uses **JWT authentication** with **Role-Based Access Control (RBAC)**.

### 👤 User

- View music
- View albums

### 🎤 Artist

- Upload music
- Create albums
- View music
- View albums

### Authentication Flow

```text
Request
   ↓
Route
   ↓
Authentication Middleware
   ↓
Controller
   ↓
Database / Cloud Storage
   ↓
Response
```

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login user |
| `POST` | `/api/auth/logout` | Logout user |

### 🎵 Music & Albums

| Method | Endpoint | Access |
|--------|----------|--------|
| `POST` | `/api/music/upload` | Artist |
| `POST` | `/api/music/album` | Artist |
| `GET` | `/api/music/` | Authenticated User |
| `GET` | `/api/music/album` | Authenticated User |
| `GET` | `/api/music/album/:albumId` | Authenticated User |

---

## ☁️ Music Upload Flow

Uploaded music files are processed using **Multer** and stored in **ImageKit**.

```text
Music File
    ↓
Multer
    ↓
Buffer
    ↓
ImageKit
    ↓
Cloud URL
    ↓
MongoDB
```

---

## ⚙️ Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rabiatariq-tech/tunehub-music-backend.git
cd tunehub-music-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env`

Create a `.env` file in the project root and use `.env.example` as a reference:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

> ⚠️ **Never commit your `.env` file or expose your private credentials.*

### 4. Start the Server

```bash
npm run dev
```

The server will run at:

```text
http://localhost:3000
```

---

## 🧪 API Testing

The APIs were tested using **Postman**, including:

- User registration and login
- JWT authentication
- Role-based authorization
- Music upload
- Album creation
- Music retrieval
- Album retrieval

---

## 🎯 What I Learned

This project helped me gain practical experience with:

- REST API development
- MVC-style backend architecture
- JWT authentication & Role-Based Access Control
- MongoDB & Mongoose relationships
- Express middleware
- File uploads and Buffer handling
- Cloud storage integration with ImageKit
- API testing with Postman

---

## 👩‍💻 Author

**Rabia Tariq**

[GitHub](https://github.com/rabiatariq-tech)
