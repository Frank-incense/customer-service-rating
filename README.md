# Customer Service Rating App

## 📌 Overview

The **Customer Service Rating App** is a full-stack web application that allows users to review, rate, and explore customer experiences with different businesses across various sectors such as Banking, Food & Beverage, Retail, Healthcare, and more.

It provides:
- A platform for customers to give honest reviews.
- A dashboard for businesses to track reviews and ratings.
- Insight into customer satisfaction metrics to help businesses improve.

---

## 📚 Scope of the Project

This project implements the following core functionalities:

### 👤 User Side
- Register and log in using secure JWT-based authentication.
- Submit reviews for listed businesses.
- Browse and filter business reviews by category.
- View individual business review pages.
- Search for businesses and reviews.

### 🏢 Business Side
- Register as a business user.
- Access a personalized business dashboard.
- View average rating and review count.
- Edit business profile details.
- Respond to customer feedback (future enhancement).

### ⚙️ Admin (Future Scope)
- Moderate reviews.
- Manage users and businesses.
- Generate analytical reports.

---

## 🧠 Assumptions Made

- Only registered users can post reviews.
- Each review includes a rating, category, and optional comment.
- Business registration is distinct from standard user registration.

---

## 🚀 Future Enhancements

- Business reply to reviews.
- Email notifications for new reviews.
- Admin moderation dashboard.
- Advanced analytics and filtering.
- Mobile app version.
- Business onboarding and verification system.

---

## 🛠️ Technologies Used

### Frontend
- React (Vite)
- React Router
- Bootstrap & React Bootstrap
- Formik + Yup for form handling

### Backend
- Python
- Flask + Flask-RESTful
- Flask-JWT-Extended
- SQLAlchemy (ORM)
- PostgreSQL

### Deployment
- Gunicorn
- Render (or other deployment service)

---

## ⚙️ Getting Started

### Prerequisites

- React
- Python 3.8+
- PostgreSQL
- pip 
- venv

---

### 🧩 Setup Instructions

#### 1. Clone the repository:

```bash
git clone https://github.com/your-username/customer-service-rating-app.git
cd customer-service-rating-app
```
Setting up your environment
```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd server
```
Create a `.env` file:
```
FLASK_SQLALCHEMY_DATABASE_URI=database_url
FLASK_JWT_SECRET_KEY=secret_key
FLASK_ENV=development
FLASK_DEBUG=1
FLASK_JWT_TOKEN_LOCATION=cookies
FLASK_JWT_ACCESS_COOKIE_PATH=/
FLASK_JWT_COOKIE_SECURE=False
FLASK_JWT_COOKIE_CSRF_PROTECT=False
FLASK_APP=app.py
FLASK_RUN_PORT=5555

```
Instantiate your database:
```
flask db upgrade
```
Set up the frontend:
```
cd client
npm install
npm run dev         # For development
npm run build       # To create production-ready `dist/`
```
Run the back end with `flask run`.