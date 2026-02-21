# 🚀 Subscription Management API

A scalable backend API for managing **Users, Plans, and Subscriptions** built using:

* Node.js
* Express.js
* Sequelize ORM
* MySQL / PostgreSQL

This project demonstrates clean architecture, proper model associations, and production-ready backend structure.

---

## 📌 Features

* 👤 User management
* 📦 Plan management
* 🧾 Subscription system
* 💳 Payment status tracking
* ⏳ Expiry & status management
* 🔁 Automatic relationship handling using Sequelize associations

---

## 🏗️ Database Design

### Entities:

* User
* Plan
* Subscription

### Relationships:

* A User can have multiple Subscriptions
* A Plan can have multiple Subscriptions
* A Subscription belongs to one User and one Plan

---

## 📂 Project Structure

```
src/
│
├── controllers/
│   └── subscription.controller.js
│
├── models/
│   ├── user.model.js
│   ├── plan.model.js
│   ├── subscription.model.js
│   ├── associations.js
│   └── index.js
│
├── routes/
│   └── subscription.route.js
│
├── db/
│   └── db.js
│
└── server.js
```

---

## 🧩 Subscription Model

```js
Subscription {
  id: INTEGER (PK)
  user_id: INTEGER (FK)
  plan_id: INTEGER (FK)
  start_date: DATE
  expiry_date: DATE
  status: ENUM("ACTIVE", "EXPIRED", "CANCELLED")
  payment_status: ENUM("PENDING", "SUCCESS", "FAILED")
}
```

---

## 🔗 Associations

* User hasMany Subscription
* Plan hasMany Subscription
* Subscription belongsTo User
* Subscription belongsTo Plan

Associations are maintained in a separate file for better scalability and to avoid circular dependency issues.

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd project-name
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file:

```
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=test_2
```

### 4️⃣ Run the Server

```bash
npm run test
```

Server will start at:

```
http://localhost:8080
```

---

## 📮 API Endpoints

### ➤ Subscribe User

```
POST /api/subscription/subscribe
```

Body:

```json
{
  "user_id": 1,
  "plan_id": 2
}
```

---

### ➤ Get User Subscriptions

```
GET /api/subscription/user/:id
```

---

### ➤ Cancel Subscription

```
PUT /api/subscription/cancel/:id
```

---

## 🔥 Business Logic

* Subscription status automatically updates based on expiry_date.
* Payment status determines whether subscription becomes ACTIVE.
* Supports force logout logic after subscription expiry (scalable for high traffic).

---

## 🧠 Scalability Considerations

* Associations centralized to avoid circular dependencies
* Clean MVC structure
* Optimized queries using Sequelize relationships
* Can be extended with:

  * Redis caching
  * Cron jobs for expiry update
  * Payment gateway integration
  * JWT authentication

---

## 🛠️ Future Improvements

* Add authentication (JWT)
* Add role-based authorization
* Add cron job for automatic expiry updates
* Add Admin dashboard APIs

---

## 👨‍💻 Author

Ayush Porwal

---

## 📄 License

This project is open-source and available for learning purposes.
