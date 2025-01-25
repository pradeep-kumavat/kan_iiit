//const express = require('express');  //method1
import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

//const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:'https://chatterchat-v8sn-ankaqolhn-kanishka-sakets-projects.vercel.app',
    credentials:true
};
app.use(cors(corsOption)); 
//app.use(cors());
// app.use(cors({
//   origin: 'https://chatterchat-v8sn-ankaqolhn-kanishka-sakets-projects.vercel.app'
// }));

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// app.listen(PORT, ()=>{
//     connectDB();
//    console.log(`Server Running at port ${PORT}`);
// });


app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});
