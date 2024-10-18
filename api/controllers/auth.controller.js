import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username,aadharCard,phoneNumber,address,dateOfBirth,gender,occupation,farmSize,cropsGrown,buyerType,gstNumber,bankAccNumber,ifscNumber} = req.body;
 
  let farmerDetails=null;
  let buyerDetails=null;

  if(occupation === 'Farmer')
  {
    if(!farmSize || !cropsGrown)
    {
      return next(errorHandler(400,"Farmer details missing"));
    }
    
    farmerDetails = {farmSize,cropsGrown};
  }

  else if(occupation === 'Buyer')
  {
    if(!buyerType || !gstNumber)
    {
      return next(errorHandler(400,"Buyer details missing"));
    }
    buyerDetails = {buyerType,gstNumber};
  }

  // const hashedaadharcard = bcryptjs.hashSync(aadharCard, 10);

  const newUser = new User({ username, aadharCard,phoneNumber,address,dateOfBirth,gender,occupation,farmerDetails,buyerDetails,bankAccNumber,ifscNumber});
  try {
    await newUser.save();
    res.status(201).json({ message: "user Created successsfully" });
  } catch (error) {
    next(errorHandler(500,error.message));
  }
};


