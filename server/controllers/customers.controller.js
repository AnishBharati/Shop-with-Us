import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import propertyModel from "../mongodb/models/property.js";
import slugify from "slugify";
import orderModel from "../mongodb/models/orderModel.js";
import braintree from "braintree";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// get single product
export const getSingleProductController = async (req, res) => {
    try {
      const product = await propertyModel
        .findOne({ _id: req.params.id })
      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while gettting single product",
        error,
      });
    }
  };

export const searchProductController=async(req,res)=>{
    try{
      const {keyword} = req.params
      const result = await propertyModel.find({
        $or:[
          {title: {$regex :keyword, $options:"i"}},
          {description: {$regex :keyword, $options:"i"}}
        ]
      })
      res.json(result);
    }
    catch(error){
      console.log(error)
      req.status(400).send({
        success: false,
        message: 'Error in Searching',
        error
      })
    }
  }

export const PaymentController = async (req, res) => {
    try {
      const { cart, nonce } = req.body;
      let total = 0; 
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale({
        amount:total,
        paymentMethodNonce:nonce,
        options:{
          submitForSettlement:true
        },
      },
      function(error, result){
        if(result){
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
            price: total
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
      )
    } catch (error) {
      console.log(error);
    }
  };

export const totalrevenue = async(req,res)=>{
  try{
    const { total } = req.body;
    let newtotal = 0;
    newtotal+=total;    
    res.send(newtotal);
  }
  catch(error){
    console.log(error);
  }
}

export const braintreeTokenController=async(req,res)=>{
  try{
    gateway.clientToken.generate({}, function(err, response){
      if(err){
        res.status(500).send(err)
      }else{
        res.send(response);
      }
    })
  }
  catch(error){
    console.log(error);
  }
}

