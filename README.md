# Express Login with Session and MySQL

This project demonstrates basic login functionality using `express-session` and MySQL in a Node.js + Express environment.  
It shows how to create and destroy sessions, validate login credentials, and protect routes.

---

## 🔐 Features

- Login form with email + password
- Express middleware to validate credentials
- Session management with `express-session`
- Protected `/index` route available only to logged-in users
- Logout with session destroy
- Simple front-end page (HTML)

---

## 📁 Project Structure
express-session-login-mysql
├── app.js # Main server
├── config.js # MySQL config (not in repo)
├── public/
│ └── index.html # Page after login
├── routes/
│ └── getWorkersRout.js (optional)
├── package.json
└── README.md
## ⚙️ Setup & Run Instructions

### 1. 🗄️ Set up MySQL database

Run this in your MySQL console:

```sql
CREATE DATABASE dbusers;

USE dbusers;

CREATE TABLE listusers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  pass VARCHAR(255)
);

INSERT INTO listusers (email, pass) VALUES ('ihor@mail.com', '1234');
2. 🧩 Create config.js in the root folder
js
Копіювати
Редагувати
// config.js
module.exports = {
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'dbusers'
};
⚠️ Don't commit this file! It is listed in .gitignore.

3. 📦 Install dependencies
bash
Копіювати
Редагувати
npm install
4. 🚀 Run the server
bash
Копіювати
Редагувати
node app.js
5. 🧪 Test the app
Visit: http://localhost:4000/login — (if you have a login form)

Or manually send a POST request to /login using Postman:

http
Копіювати
Редагувати
POST http://localhost:4000/login
Content-Type: application/json

{
  "email": "ihor@mail.com",
  "password": "1234"
}
On success, you'll be redirected to /index

Visit http://localhost:4000/index to see the protected page

Visit http://localhost:4000/logout to log out

