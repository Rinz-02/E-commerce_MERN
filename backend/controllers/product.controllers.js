import mongoose from "mongoose";
import Product from "../models/product.model.js";
import express from "express"

export const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success : true, data : products})
    }catch(err){
        console.log("error in fetching data" , err.message);
        res.status(500).json({success : false, message : "Server Error"})
    }
}

export const createProducts = async(req,res) => {
    const product = req.body;
    
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success : false , message : "Please provide all fields"});
    }
    const newProduct = new Product(product);                   // create Product(DB) with the data from body(product)

    try{
        await newProduct.save();
        res.status(201).json({success : true , data : newProduct})
    }catch(error){
        console.log("Product can't create" , error.message);
    }
}

export const updateProducts = async(req,res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false , message : "Invalid Product id"})
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new : true});
        res.status(200).json({success : true, data : updatedProduct})
    }catch(err){
        console.log("Error in updating product" , err.message);
        res.status(500).json({success : false , message : "Internal Server Error"})
    }
}

export const deleteProducts = async(req,res) => {
    const {id} = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(500).json({success : false, message : "Product not found"})
     }

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success : true , message : "Product deleted"})
    }catch(error){
        console.log("Error in deleting product", error.message)
        res.status(500).json({success : false, message : "Internal Server Error"})
    }
}