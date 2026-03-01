import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userAuth = async (req, res, next) => {
  try {
    let token;
    
    // Check Authorization header first
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } 
    // If not in header, check cookies
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }
    
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const isTokenValid = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = isTokenValid;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export { userAuth };
