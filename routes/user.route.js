require('dotenv').config();
const express = require("express");

const {UserModel}=require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET_KEY = process.env.SECRET_KEY;
const userRouter = express.Router();


userRouter.get('/all',async(req,res)=>{
    try{
        const users = await UserModel.find();
        res.send({
            "data":users
        })
    }catch(e){
        console.log("Error : ",e);
        res.status(500).send({
            "Erorr":"Something went wrong."
        })
    }
})
userRouter.get('/',async(req,res)=>{
    try{
        const query=req.query;
        const users = await UserModel.find(query);
        res.send({
            "data":users
        })
    }catch(e){
        console.log("Error : ",e);
        res.status(500).send({
            "Erorr":"Something went wrong."
        })
    }
})
userRouter.post('/signup',async(req,res)=>{
    try{
        const data = req.body;
        data.password=await bcrypt.hash(req.body.password,10);
        await UserModel.create(data);
        res.send({
            "message":"user registered successfully."
        })
    }catch(e){
        console.log("Error : ",e);
        res.status(500).send({
            "Erorr":"Something went wrong."
        })
    }
})
userRouter.post('/login',async(req,res)=>{
    try{
        const {email}=req.body;
        
        const user = await UserModel.find({email:email});
        let pass=await bcrypt.compare(req.body.password,user[0].password);
        
        if(pass){
            const token =jwt.sign({userId:user[0]._id},`${SECRET_KEY}`,{expiresIn:'1h'});
            res.send({
                "message":"login successfully.",
                "token":token,
                "role":user[0].role
            })
        }else{
            res.status(404).send({
                "message":"check your credentials or go for signup."
            })
        }
    }catch(e){
        console.log("Error : ",e);
        res.status(500).send({
            "Erorr":"Something went wrong."
        })
    }
})
userRouter.patch('/edit/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        await UserModel.findByIdAndUpdate(id,{$set:data});
        res.send({
            "message":"user update successfully."
        })
    }catch(e){
        console.log("Error : ",e);
        res.status(500).send({
            "Erorr":"Something went wrong."
        })
    }
})
userRouter.delete('/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        await UserModel.findByIdAndDelete(id);
        res.send({
            "message":"user deleted successfully."
        })
    }catch(e){
        console.log("Error : ",e);
        res.status(500).send({
            "Error":"Something went wrong."
        })
    }
})


module.exports=userRouter;