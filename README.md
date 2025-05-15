**Technology Choices – Summary**

Frontend: Built with React and Material UI for a responsive, modular UI. Axios handles API requests, and React Router manages navigation.

Backend: Node.js with Express provides a lightweight REST API. JWT secures authentication, and bcrypt ensures password safety.

Database: SQL Server offers robust relational data handling and supports transactions for reliable order processing.

Validation & UX: Form inputs are validated both client-side and server-side. Error messages and field-specific feedback improve usability.

This stack was chosen for its balance of performance, scalability, and developer efficiency.


**Instructions to Run the Solution:**

1. Install Dependencies:
Ensure all required packages are installed.

Run the following command from the root of your project:
**npm install**
This will install all dependencies listed in your package.json.

2.Backend Setup:

Ensure your backend API (Node.js + Express) is running and connected to your database.

Make sure the endpoints like /cart/getcartdetails, /cart/updateQuantity, /cart/deletecart, and /api/create-order are properly implemented and working.

Ensure your connection string in server.js or config.js is correct. Start the server:
npm run server

3.Frontend Setup:

In the React frontend, make sure the environment variables like REACT_APP_API_URL are set correctly in .env file.

Start the React frontend:
npm start
This will open the application on http://localhost:3000 by default.

4. Database:

Make sure your database is running and accessible. For SQL Server, verify the connection string in your backend.
Run the script to create Database Schema and Data which is available in the Git repository.


