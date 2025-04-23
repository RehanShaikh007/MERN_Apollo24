import express from "express";

import dotenv from "dotenv" 
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '../Frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
})

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();

app.use(errorMiddleware);

export default app;