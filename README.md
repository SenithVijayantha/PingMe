# Chat App

This is a full-stack real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io.

## Features

-   User authentication (login/signup)
-   Real-time messaging with Socket.io
-   Online user status
-   User profiles and profile updates
-   Image uploads with Cloudinary

## Technologies Used

**Frontend:**

-   React
-   Socket.io-client
-   Axios
-   React Router
-   Tailwind CSS

**Backend:**

-   Node.js
-   Express
-   MongoDB
-   Socket.io
-   JWT for authentication
-   Cloudinary for image storage

## Getting Started

### Prerequisites

-   Node.js (v14 or later)
-   npm
-   MongoDB Atlas account or local MongoDB installation

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/chat-app.git
    cd chat-app
    ```

2.  **Install server dependencies:**

    ```bash
    cd server
    npm install
    ```

3.  **Install client dependencies:**

    ```bash
    cd ../client
    npm install
    ```

### Configuration

#### Server

Create a `.env` file in the `server` directory and add the following environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Client

Create a `.env` file in the `client` directory and add the following environment variable:

```
VITE_BACKEND_URL=http://localhost:5000
```

### Running the Application

1.  **Start the server:**

    ```bash
    cd server
    npm start
    ```

2.  **Start the client:**

    ```bash
    cd ../client
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

