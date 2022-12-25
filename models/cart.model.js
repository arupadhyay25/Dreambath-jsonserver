const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    items:[{
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'product'
        },
        name:String,
        quantity:{
            type:Number,
            required:true,
            min:1,
            default:1
        },
        price:Number
    }],
    bill:{
        type:Number,required:true,default:0
    }
},{timestamps:true})

const CartModel = mongoose.model('cart',cartSchema);

module.exports = {CartModel};