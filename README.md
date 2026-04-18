# Jobby App

Jobby App is a job searching web application built using React.js. It allows users to log in, explore job listings, apply filters, and view detailed job information. This project focuses on building a real-world frontend application using React concepts.

---

## About the Project

This project is developed as part of learning React and frontend development. The main objective is to understand how a job portal works, including authentication, routing, API integration, and UI rendering.

The application interacts with external APIs to fetch job data, but the entire frontend, including UI design, routing, and logic handling, is implemented using React.js.

---

## Features

* User Authentication using JWT token
* Protected Routes (only logged-in users can access jobs pages)
* Home page with navigation
* Search functionality to find jobs
* Filters:

  * Employment Type (Full-time, Part-time, etc.)
  * Salary Range
* Job Details page with:

  * Company details
  * Job description
  * Required skills
  * Life at company section
* Retry option on API failure
* Similar jobs suggestion
* Static profile section
* Loading indicators for better user experience

---

## Technologies Used

* React.js
* JavaScript (ES6+)
* React Router DOM (v5)
* CSS
* js-cookie
* react-icons
* react-loader-spinner
* Fetch API

---

## Folder Structure

```id="7pxq4s"
src/
  components/
    Header/
    Home/
    Jobs/
    JobItem/
    JobDetails/
    SimilarJobItem/
    Profile/
    LoginForm/
    ProtectedRoute/
  App.js
  index.js
```

---

## Application Flow

1. User opens the application
2. If not logged in → redirected to Login page
3. After successful login → JWT token is stored in cookies
4. User can navigate to Home and Jobs pages
5. Jobs page fetches job data and allows search & filtering
6. Clicking a job opens the Job Details page
7. Job Details shows full job info and similar jobs
8. Logout clears token and redirects to login

---

## Login Details

```id="8q2z5n"
Username: sri@gmail.com  
Password: sri@2026  
```

---

## How to Run the Project

1. Clone the repository

```id="v6n2kf"
git clone <your-repository-link>
```

2. Open the project folder

```id="n1y5tw"
cd jobby-app
```

3. Install dependencies

```id="h3p8mz"
npm install
```

4. Start the application

```id="d4x7qs"
npm start
```

5. Open browser and go to

```id="p9c2lv"
http://localhost:3000
```

---

## Important Note

* The APIs used in this project are not developed by me
* They are taken from NxtWave practice APIs for learning purposes
* This project mainly focuses on building the frontend using React.js

---

## What I Learned

* Building reusable components in React
* Managing state and props
* Handling API calls and async operations
* Implementing authentication and protected routes
* Structuring a React project

---

## Conclusion

This project helped me understand how a real-world job portal works and improved my frontend development skills using React.

---

## Author

Matta Sri Ammayya

mattasriammayya@gmail.com

---
