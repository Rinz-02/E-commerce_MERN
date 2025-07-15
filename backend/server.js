import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js'
import path from 'path';
import cors from 'cors';


dotenv.config();
const app = express();
app.use(express.json());  
app.use(cors());           //Allow to accept json data in body 

export const PORT = process.env.PORT || 8080;

app.use("/api/products" , productRoutes);
app.use("/auth" , authRoutes);

const __dirname = path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*" , (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend" , "dist" , "index.html"))
    })
}

app.listen(PORT,() => {
    connectDB();
    console.log("Sever started at localhost:" + PORT)
})
// 