import express from "express";

import dotenv from "dotenv" 
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
import path from 'path'
import cloudinary from "cloudinary"
import cors from 'cors'

import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import messageRouter from "./router/messageRouter.js"
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";


const app = express();

// config({path: "/.env"})
dotenv.config();

dbConnection();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    cors({
    origin: [process.env.FRONTEND_URL, 'https://mern-apollo24.onrender.com'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    sameSite: 'none',
    secure: true
}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

const __dirname = path.resolve();

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
})


app.use(errorMiddleware);

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


app.listen(4000, () => {
    console.log(`Server running on port ${4000}`);
});

export default app;