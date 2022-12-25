require("dotenv").config();
const express = require("express");
const {connect} = require("./config/db");
const cors = require('cors');
const PORT = process.env.PORT || 5003;
const userRouter = require('./routes/user.route');
const productRouter = require('./routes/product.route');
const cartRouter = require('./routes/cart.route');
const orderRouter = require('./routes/order.route');


const app = express();

app.use(express.json());
app.use(cors());

app.use('/users',userRouter);
app.use('/products',productRouter);
app.use('/carts',cartRouter);
app.use('/orders',orderRouter);


app.get('/',(req,res)=>{
    res.send({
        "message":"Hello World!"
    })
})

app.listen(PORT,async()=>{
    try{
        await connect;
        console.log('database connection established.');
    }catch(e){
        console.log('database connection failed.');
        console.log(e);
    }
    console.log(`server listening at PORT No. ${PORT}`);
})
