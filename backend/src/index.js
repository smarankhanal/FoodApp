import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({ path: "./env" });

// Connect DB immediately
await connectDB();

// ❌ REMOVE app.listen
// ✅ Just export the app
export default app;
