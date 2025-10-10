# 🎯 Doctor-Appointment-Booking-System-MERN-Stack

A beautiful and modern assistance app designed to connect patients with doctors, built with **React 19**, **Tailwind CSS** and **MongoDB**

---

## 🚀 Features

### 👩‍⚕️ Patient Features
- ✅ **User authentication & registration (JWT)**  
- ✅ **Profile Management** 
- ✅ **Book doctor appointments**  
- ✅ **View booking history**
- ✅ **Commenting System**  
- ✅ **Cancel or reschedule appointments**  

### 🩺 Doctor Features
- ✅ **Doctor registration & login**
- ✅ **Manage profile and availability**
- ✅ **Accept or reject appointments**
- ✅ **Dashboard with upcoming appointments**

### 🛠️Technical Highlights

- ✅ **React 19 with modern hooks & context API**

- ✅ **Tailwind CSS responsive UI**

- ✅ **Framer Motion animations for smooth UI transitions**

- ✅ **Express.js RESTful API**

- ✅ **MongoDB with Mongoose ODM**

- ✅ **JWT Authentication (role-based: patient/doctor)**

- ✅ **React Hook Form for validation**

- ✅ **Toast notifications for alerts & feedback**

---

## 🧰 Tech Stack

| Layer       | Technology                         |
|-------------|------------------------------------|
| Frontend    | React 19, Tailwind CSS             |
| Backend     | Node.js - Express                  |
| Database    | MongoDB, Mongoose                  |
| Auth        | JWT-based Authentication           |
| Animations  | Framer Motion, React Hook Form     |
| Forms       | React Hook Form                    |
| Alerts      | React Hot Toast                    |

---

## 🧑‍💻 Getting Started

### 🔧 Prerequisites

- Node.js `v22+`
- MongoDB instance (local or Atlas)

### 📦 Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd doctor-appointment-booking-system
```
# 2. Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```
# 3. Configure environment variables
# in backend/.env

```bash
MONGO_URI=your-mongo-db-uri
JWT_SECRET=your-secret-key
PORT=5000
```
# 4. Run backend
```bash
cd backend
npm run dev
```
# 5. Run frontend
```bash
cd frontend
npm run dev
```


### ✨ UI & UX

- Clean, modern design with TailwindCSS

- Fully responsive (desktop, tablet, mobile)

- Smooth transitions & micro-interactions

- Role-based dashboards (Patient / Doctor)


### 🔐 Security & Performance

- Password hashing with bcryptjs

- Secure authentication with JWT

- Input validation & sanitization

- Optimized MongoDB queries

- Efficient REST API structure

### 🚢 Deployment

- Backend can be deployed to Render / Railway / Heroku

- Frontend can be deployed to Vercel / Netlify

- MongoDB via MongoDB Atlas

