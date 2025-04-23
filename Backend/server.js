import app from "./app.js";
import cloudinary from "cloudinary"
import cors from "cors"


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(
    cors({
    origin: [process.env.FRONTEND_URL, 'https://mern-apollo24.onrender.com'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    sameSite: 'none',
    secure: true
}));
app.listen(4000, () => {
    console.log(`Server running on port ${4000}`);
});