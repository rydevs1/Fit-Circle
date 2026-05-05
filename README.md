# FitCircle

## Overview

FitCircle is a social fitness application that allows users to create or join workout circles, track their workouts, and compare progress with others through a shared scoreboard.

This project was developed using React for the frontend and Node.js/Express with MongoDB for the backend.

---

## Features

* Create a fitness circle and generate an invite link
* Join a circle using an invite link/code
* View a circle scoreboard ranked by workout activity
* Log workouts (type, duration, intensity)
* View personal progress (total workouts, minutes, recent activity)

---

## Tech Stack

* **Frontend:** React.js, React Router, Axios, Custom CSS Styling
* **Backend:** Node.js, Express.js, Mongoose, Bcrypt, JSON Web Token
* **Database:** MongoDB Atlas, Mongoose schemas for Users, Circles, Memberships, Workouts, Invite Codes
* **Tools:** VS Code, GitHub, Postman for API testing

---

## How to Run the Project

### 1. Clone the repo

```bash
git clone https://github.com/rydevs1/Fit-Circle.git
cd Fit Circle/Fit Circle
```

---

### 2. Backend

```bash
cd fitcircle-backend
npm install
```

Create .env:

```env
MONGO_URI=connection_string
PORT=5000
```

Run:

```bash
node server.js
```

### 3. Frontend (new terminal)

```bash
cd "Fit Circle"
npm install
npm start
```

App runs at:

```
http://localhost:3000
```

---

## Contributors

* Devin Randoll
* Nilay Roy
* Ryan Deveraux
* Md Mutassim Fuad
* Faisal Rashid
