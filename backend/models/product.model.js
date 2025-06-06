import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    price:{
        type : Number,
        require : true
    },
    image:{
        type : String,
        require : true
    }
},{
    timestamps : true //Update or Create at field of doucuments
})

const Product = mongoose.model('Product',productSchema);

export default Product;