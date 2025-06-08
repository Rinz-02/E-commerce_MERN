import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();
const app = express();
app.use(express.json());                //Allow to accept json data in body 

export const PORT = process.env.PORT || 8080;

app.use("/api/products" , productRoutes);

console.log(process.env.MONGO_URI);

app.listen(PORT,() => {
    connectDB();
    console.log("Sever started at localhost:" + PORT)
})
// 