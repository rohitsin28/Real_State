import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRoute from './routes/listing.route.js';
import cookieParser from "cookie-parser";
import path from 'path'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing",listingRoute)

app.use(express.static(path.join(_dirname,'/client/dist')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(_dirname,'client','dist','index.html'))
})

app.use((err,res)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
