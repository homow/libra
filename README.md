# 📚 Libra - Light Library Management API

**Libra** is a lightweight, modular API for managing a library.
Built with **TypeScript + Express + MongoDB + Zod**, focusing on simplicity, scalability, and clean architecture.

---

## 🚀 Features

* CRUD operations for books: Create, Read, Update, Delete
* Modular folder structure
* Type-safe with TypeScript
* Validation with Zod
* Ready for JWT auth and middleware integration

---

## 📦 Packages

| Name            | Version | Description                               |
|-----------------|---------|-------------------------------------------|
| ⚡ `express`     | ^5.2.1  | Main Node.js framework for building APIs  |
| 🗄️ `mongoose`  | ^9.1.1  | ODM for MongoDB, database management      |
| 🌿 `dotenv`     | ^17.2.3 | Environment variable management           |
| 🔒 `zod`        | ^4.3.4  | Type-safe data validation                 |
| 💎 `typescript` | ^5.9.3  | Type-safe language for the project        |
| 🚀 `ts-node`    | ^10.9.2 | Run TypeScript files without compiling    |
| 👀 `tsx`        | ^4.21.0 | Fast TypeScript execution with watch mode |

---

## 🏁 Quick Start

1. Clone the project:

    ```bash
    git clone https://github.com/username/libra.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create `.env` file:

    ```env
   MONGO_URI=mongodb://localhost:27017/libra
   PORT=3000
    ```

4. Run the project:

    ```bash
    npm run dev
    ```

---

## 🔮 Future Plans

* JWT Authentication for users
* Role-based access control
* Search, filtering, and pagination for books
* Lightweight React or Next.js frontend
