import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`\nServer is running on port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("Error in connection:", error.message);
    // process.exit(1);
  });
