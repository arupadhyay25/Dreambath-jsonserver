const express = require('express');

const {ProductModel}= require("../models/product.model");
const productRouter = express.Router();


productRouter.get('/',async(req,res)=>{
    try{
        const products = await ProductModel.find();
        res.send(products);
    }catch(e){
        res.status(500).send({
            "error":"something went wrong"
        })
    }
})
productRouter.get('/category',async(req,res)=>{
    const category =req.query.category;
    const sort = req.query._sort || "";
    const order = req.query._order || "";
    const titledesp = req.query.titledesp || "";
    try{
        if(sort!==""&&order!==""&&titledesp!==""){
            let obj={};
            obj[sort]=order==="asc"?1:-1;
            const products = await ProductModel.find({category:category,titledesp:titledesp}).sort(obj)
            res.send(products)
        }else if(sort!==""&&order!==""){
            let obj={};
            obj[sort]=order==="asc"?1:-1;
            const products = await ProductModel.find({category:category}).sort(obj)
            res.send(products)
        }else if(titledesp!==""){
            const products = await ProductModel.find({category:category,titledesp:titledesp});
            res.send(products);
        }
        else{
            const products = await ProductModel.find({category:category});
            res.send(products);
        }
    }catch(e){
        res.status(500).send({
            "error":"something went wrong"
        })
    }
})
productRouter.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const product = await ProductModel.findById(id);
        res.send(product);
    }catch(e){
        res.status(500).send({
            "error":"something went wrong"
        })
    }
})
productRouter.post('/',async(req,res)=>{
    try{
        const data=req.body;
        await ProductModel.create(data);
        res.send({
            "message":"product added successfully."
        })
    }catch(e){
        res.status(500).send({
            "error":"something went wrong"
        })
    }
})
productRouter.patch('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        await ProductModel.findByIdAndUpdate(id,{$set:data});
        res.send({
            "message":"product updated successfully."
        })
    }catch(e){
        res.status(500).send({
            "error":"something went wrong"
        })
    }
})
productRouter.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        await ProductModel.findByIdAndDelete(id);
        res.send({
            "message":"product deleted successfully."
        })
    }catch(e){
        res.status(500).send({
            "error":"something went wrong"
        })
    }
})

module.exports = productRouter;