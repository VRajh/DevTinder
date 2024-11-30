const express = require("express")
const User = require("../models/user")
const currentTime = require("../config/date")
const {validateSignUpData} = require("../utils/validation")
const bcrypt = require('bcrypt');
const userAuth = require("../utils/userAuth");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const validator = require("validator")

const authRouter = express.Router()

authRouter.post("/signup",async (req,res,next)=>{

    //getting data from parameter
    console.log(req.body)

    try
    {
    //req.body validation
    validateSignUpData(req)

    //password encryption
    const hash = await bcrypt.hash(req.body.password, salt);

    //inserting data into DB
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password : hash,
        timeStamp : currentTime,
        gender: req.body.gender,
        skills: req.body.skills,
        photoUrl: req.body.photoUrl
    })
    await user.save()
    res.send("Data added successfully")
    }
    catch(err)
    {
        res.send(("some error occured : "+err.message))
    }


})

authRouter.post("/login",async(req,res)=>{
    try
    {
        //validate req.body fields
        const {email,password} = req.body
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        if (!validator.isEmail(email)) {
            throw new Error("Invalid email format");
        }
        const user = await User.findOne({email:email})
        console.log(user)
        //validate res,body
        //console.log(await user.validatePassword(password))
        if(user && await user.validatePassword(password))
        {
            //generate jwt token and send it in cookie
            // const token = await jwt.sign({ _id:user._id }, jwt_private_key, { algorithm: 'HS256', expiresIn: '7d'})
            const token = await user.getJWT()

            //sending jwt in cookie
            res.cookie("jwt_token",token,{expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
            res.status(200).send("login successful")
        }
        else{
        throw new Error("invalid credentials")
        }

    }
    catch(err)
    {
        res.status(400).send("some error occured : "+err.message)
    }

})

authRouter.post("/logout",userAuth,(req,res)=>{
    const {user} = req
    res.clearCookie('jwt_token').send(user.firstName+" "+user.lastName +' have been logged out');
})

module.exports = authRouter