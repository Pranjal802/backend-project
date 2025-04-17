// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./db/index.js";
// // import {app} from "./App.js";
// const app = express();

// dotenv.config({ path: "./env" });

// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//       console.log(`\nServer is running on port: ${process.env.PORT || 8000}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error in connection:", error.message);
//     // process.exit(1);
//   });


import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./App.js"; // Import the app instance from App.js

dotenv.config({ path: "./env" }); // Load environment variables

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`\nServer is running on port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("Error in connection:", error.message);
    // Uncomment the next line if you want the process to exit on a database connection error
    // process.exit(1);
  });