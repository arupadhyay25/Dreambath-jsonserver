const mongoose =require('mongoose');

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    titledesp:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    reviewCount:{
        type:Number
    },
    rating:{
        type:Number
    }

})

const ProductModel = mongoose.model('product',productSchema);

module.exports = {ProductModel};