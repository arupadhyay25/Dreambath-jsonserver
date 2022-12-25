const express = require("express");

const orderRouter = express.Router();

orderRouter.get('/',(req,res)=>{
    res.send({
        "message":"orders is in development."
    })
})
module.exports = orderRouter;