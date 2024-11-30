const express = require("express")
const userAuth = require("../utils/userAuth")
const profileRouter = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const validator = require("validator")

profileRouter.get("/profile",userAuth,async(req,res)=>{  
    try
    {
       const {user} = req
       console.log("inside profile api",user)
       //res.status(200).send("cookies received "+JSON.stringify(req.cookies))
       res.status(200).send("welcome "+user.firstName+" "+user.lastName)

    }
    catch(err)
    {
        res.status(400).send("some error occured : "+err.message)
    }
})

profileRouter.patch("/edit",userAuth,async(req,res)=>{
    const loggedInUser = req.user
    const allowedUpdates = ["firstName","lastName","gender","email","age"]
    const isAllowedUpdates = Object.keys(req.body).every(key=>allowedUpdates.includes(key))

    try {
         //editing and saving the modified data into DB
       /*
       const {firstName,lastName,photoUrl} = req.body 
       const user = await User.findOneAndUpdate({email:req.user.email}, 
       { 
        firstName: firstName,
        lastName: lastName,
        photoUrl: photoUrl 
       }, {returnDocument:'after'}) */
       if(!isAllowedUpdates){
        throw new Error("invalid update mate")
       }

       //req.body data validation
       //validateEditProfileData(req)

       Object.keys(req.body).forEach(key => loggedInUser[key]=req.body[key]);
       await loggedInUser.save()
       res.send({ message: "Changes saved successfully", user: loggedInUser });
        
    } catch (err) {
        res.status(400).send(("some error occured : "+err.message))
    }

})

profileRouter.patch("/forgotPassword",userAuth,async(req,res)=>{
    try 
    {
        if(!validator.isStrongPassword(req.body.password))
            {
                throw new Error("Invalid Password, Please enter a valid password")
            }

       //password encryption
       const loggedInUser = req.user
       const hash = await bcrypt.hash(req.body.password, salt);
       loggedInUser.password=hash
       loggedInUser.save()
       res.status(200).send("Password has been changed successfully")

    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = profileRouter