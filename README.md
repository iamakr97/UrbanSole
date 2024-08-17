# Live-Link : https://urbansole.vercel.app/

# Urban Sole - Online Shoe Store

Urban Sole is a modern and dynamic online shoe store developed using the MERN stack. This application allows users to browse, search, and purchase shoes seamlessly, with features for user authentication, product management, and a shopping cart. The app is deployed with the backend on Render and the frontend on Vercel.
![urbanSole](https://github.com/user-attachments/assets/39a74ae9-896e-42ba-9839-fc6c01a1a093)
![Screenshot 2024-08-17 130757](https://github.com/user-attachments/assets/4a2e21e0-4961-4fcd-91c4-6a798227feb9)
![Screenshot 2024-05-26 171411](https://github.com/user-attachments/assets/69be7b1f-5bee-4ac8-a993-76edf136965d)
![Screenshot 2024-05-22 145758](https://github.com/user-attachments/assets/28afd0cb-4a82-4fa0-8c33-e7e16603a84e)
![Screenshot 2024-05-22 145748](https://github.com/user-attachments/assets/ae38e452-9675-447d-8f23-5d3006ecd199)



## Features

- **User Authentication:** Secure signup and login with JWT for session management.
- **Product Listings:** Display detailed information about available shoes, including images, prices, and descriptions.
- **Product Search:** Quickly find specific shoes using the search functionality.
- **Shopping Cart:** Add products to the cart, view cart details, and proceed to checkout.
- **Admin Panel:** Manage products and orders with an admin interface.
- **Rating and Review System (Planned):** Allow users to rate and review products.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **State Management:** Redux (if used)
- **Deployment:**
  - **Backend:** Render
  - **Frontend:** Vercel
- **Encryption and Security:** (Include specifics if used, e.g., bcrypt for password hashing)

## Live Demo

- **Frontend:** [Urban Sole Live App](https://urbansole.vercel.app/)
- **GitHub Repository:** [Urban Sole on GitHub](https://github.com/iamakr97/UrbanSole)

## Getting Started

### Prerequisites

- **Node.js** (version 14 or later)
- **MongoDB** (local or cloud instance)
- **Git** (for version control)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/iamakr97/UrbanSole.git
   cd UrbanSole

2. **Backend Setup:**

    - Navigate to the backend directory:

      ```bash
      cd backend
      ```

- Install the necessary dependencies:

      ```bash
      npm install
      ```

    - Configure your database settings in the `application.properties` file.

    - Run the backend:

Configure your environment variables, such as database connection string, in the .env file.
Run the backend server:
```bash
npm start
```
Frontend Setup:

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install the necessary dependencies:

```bash
npm install
```

Run the React application:

```bash
npm start
```
## API Testing
You can test the backend API using Postman or any other API testing tool. Ensure that the backend server is running before performing API tests.

## Environment Variables
Set up the necessary environment variables in the .env file for both backend and frontend, including JWT secrets and database credentials.

## Usage
Access the Live App: Navigate to Urban Sole Live App to explore the features.
Create an Account or Log In: Use the authentication features to create an account or log in.
Manage Your Notes: Browse products, add them to your cart, and proceed to checkout.
Admin Features: Access the admin panel to manage products and orders.
Contribution
We welcome contributions to enhance the Urban Sole project! To contribute:

## Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them.
Push your branch and create a pull request.
