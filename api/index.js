import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Serror error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
