const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require ("../models/userModel"); 
 
 // Register User
 // Post /api/users/register
 // access  Public

const registerUser = asyncHandler(async(req,res)=>{
    
     const {username, email, password} = req.body;

     if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
     }
     
     //Checking if user exists
     const userAvailable = await User.findOne({email});
     if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
     }

     // Hash password
     const hashedPassword = await bcrypt.hash(password, 10);
     console.log("🚀 hashedPassword:", hashedPassword)
    
     //Creating a new user
     const user = await User.create({username, email, password:hashedPassword});
     console.log(`User created ${user}`);
    
     //when new  user created send the status with info
     if (user){
        res.status(201).json ({_id : user.id, email: user.email});
     }
     else{
        res.status(400);
        throw new Error("User data us not valid"); 
     }

    res.json({message: "Register the user"})
});


 // Login User
 // Post /api/users/login
 // access  Public

 const loginUser = asyncHandler(async(req,res)=>{
    res.json({message: "login  user"})
});


// Current  User info
 // Post /api/users/current
 // access  Private

 const currentUser = asyncHandler(async(req,res)=>{
    res.json({message: "login  user"})
})













module.exports = {registerUser, loginUser, currentUser}