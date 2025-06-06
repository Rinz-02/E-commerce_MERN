import mongoose from 'mongoose';

export const connectDB = async() => {
 try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connected`)
 }catch(err){
        console.log(`Erre ${err.message}`);
        process.exit(1);
 }
}