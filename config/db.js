require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// const MONGO_URL = process.env.MONGO_URL;
const connect = mongoose.connect(`mongodb+srv://mad:cloud@cluster0.eygsg9e.mongodb.net/dreamBath`);

module.exports={connect};
