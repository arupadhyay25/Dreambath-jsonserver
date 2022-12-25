const express = require("express");

const cartRouter = express.Router();
const {CartModel} = require("../models/cart.model");
const {ProductModel} = require("../models/product.model");
const {Auth} = require("../middlewares/Auth.middleware");
const e = require("express");

cartRouter.get("/cart", Auth, async (req, res) => {
  const user = req.body.userId;

  try {
    const cart = await CartModel.findOne({ user });
    if (cart && cart.items.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send([]);
    }
  } catch (error) {
    res.status(500).send();
  }
});


cartRouter.post("/cart", Auth, async (req, res) => {
  const user = req.body.userId;
  const { itemId, quantity } = req.body;

  try {
    const cart = await CartModel.findOne({ user });
    const item = await ProductModel.findOne({ _id: itemId });

    if (!item) {
      res.status(404).send({ message: "item not found" });
      return;
    }
    const price = item.price;
    const name = item.name;
    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);


      if (itemIndex > -1) {
        let calc = req.query.q || "add";
        let product = cart.items[itemIndex];
        if(calc==='add'){

          product.quantity += quantity;
        }else{
          product.quantity -= quantity;
        }

        cart.bill = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
        },0)
        
        cart.items[itemIndex] = product;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.items.push({ itemId, name, quantity, price });
        cart.bill = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
        },0)

        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      const newCart = await CartModel.create({
        user,
        items: [{ itemId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});


cartRouter.delete("/cart/", Auth, async (req, res) => {
  const user = req.body.userId;
 const itemId = req.query.itemId;
  try {
    let cart = await CartModel.findOne({ user });

    const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
    
    if (itemIndex > -1) {
      let item = cart.items[itemIndex];
      cart.bill -= item.quantity * item.price;
      if(cart.bill < 0) {
          cart.bill = 0
      } 
      cart.items.splice(itemIndex, 1);
      cart.bill = cart.items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
    },0)
      cart = await cart.save();

      res.status(200).send(cart);
    } else {
    res.status(404).send("item not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});



module.exports = cartRouter;