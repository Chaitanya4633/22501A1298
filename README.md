#  URL Shortener Web App using React & Node.js

This project is a **full-stack URL Shortener** application that allows users to shrink long URLs into short, easily shareable links. It is built using **React** for the frontend and **Node.js + Express + MongoDB** for the backend. Additionally, it supports **custom shortcodes**, **expiry durations**, and **token-based API authentication** for secure access.

---

##  Key Features

-  **URL Shortening** – Convert long URLs into short links.
-  **Custom Shortcodes** – Let users create their own shortcode (like `chaitu123`).
- ⏱ **Expiry Duration** – Specify how long a shortened URL stays active (in minutes).
-  **Validations** – Ensures the entered URL is in a correct format.
- 🗃 **MongoDB Storage** – Stores all URLs with expiry and shortcode.
-  **Secure Backend API** – Uses token-based authorization to validate requests.

---

##  Output

###  Frontend

![Screenshot 2025-06-28 124136](https://github.com/user-attachments/assets/4d6245f0-ef90-4a0d-ac7c-331659375fca)

![Screenshot 2025-06-28 165747](https://github.com/user-attachments/assets/6ef26180-2997-4ede-8abd-5a6bf1b0339c)

![Screenshot 2025-06-28 165753](https://github.com/user-attachments/assets/990d2687-f55c-40ac-9249-6b2d3fea9b48)

###  Backend

![Screenshot 2025-06-28 124130](https://github.com/user-attachments/assets/e75bb17d-59b5-4f6d-b683-8d5bf81c5ba7)

---

## 🛠 Tech Stack

| Part      | Technology               |
|-----------|--------------------------|
| Frontend  | React, Material UI, Axios|
| Backend   | Node.js, Express         |
| Database  | MongoDB + Mongoose       |
| Auth      | Postman Token-based API  |

---

##  Sample Usage

1. **Input URL**: `https://www.instagram.com`
2. **Custom Shortcode**: `insta_chaitu`
3. **Validity**: `10 minutes`
4. **Shortened URL**: `http://localhost:5000/insta_chaitu`  
5. After expiry, the link becomes invalid.

---

> Made with ❤️ by Pyla Chaitanya – `22501A1298`

