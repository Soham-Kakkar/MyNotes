# MyNotes: Full-Stack Notes Application

MyNotes is a fullstack application designed to help you create, organize, and manage your notes efficiently. Built with modern web technologies, it offers a seamless and responsive user experience for both desktop and mobile users.

## Key Features

- **User Authentication**: Secure login and registration system.
- **Note Management**: Create, edit, and delete notes easily.
- **Responsive Design**: Optimized for use on both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Live Site

You can access the live version of MyNotes here: [MyNotes Live Site](https://mynotes-94s8.onrender.com)

## Installation and Usage

To set up the application locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/MyNotes.git
    ```

2. Navigate to the project directory:

    ```bash
    cd MyNotes
    ```

3. Set up environment variables:

    - Create a `.env` file in the `client` directory:

      ```bash
      REACT_APP_API_URL='http://localhost:5000/api'
      ```

    - Create a `.env` file in the `server` directory:

      ```bash
      MONGO_URI=YOUR_MONGODB_CONNECTION_URI
      PORT=5000
      frontendURI='http://localhost:3000'
      JWT_SECRET='YOUR_JWT_SECRET'
      ```

4. Install dependencies and start the server and client:

   Open two terminal tabs/windows:

   - In the first terminal tab, navigate to the `server` directory:

     ```bash
     cd server
     npm install  # Install backend dependencies
     npm run dev  # Start the development server
     ```

   - In the second terminal tab, navigate to the `client` directory:

     ```bash
     cd client
     npm install       # Install frontend dependencies
     npm run start     # Start the React app
     ```

5. Open the app in your browser at http://localhost:3000.

6. Register or log in to your account.

7. Start creating and managing your notes!

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the app.

## License

This project is licensed under the [MIT License](LICENSE).