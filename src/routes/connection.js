const express = require("express")
const userAuth = require("../utils/userAuth")
const User = require("../models/user")
const Connectionrequest = require("../models/connectionRequest")
const connectionRequestRouter  = express.Router()

connectionRequestRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{
    try {
        const {status,userId} = req.params
        const allowedStatus = ["like","dislike"]
        const loggedInUser = req.user
        console.log(loggedInUser)
        //status validation
        if(!allowedStatus.includes(status))
        {
            throw new Error("request not valid")
        }
        //userId validation
        const isUserIdValid = await User.findById(userId)
        if(!isUserIdValid)
        {
            throw new Error("user does not exist")
        }
        //check if connection already exist
        const isValidConnection = await Connectionrequest.findOne({
            $or:[{fromUserId:loggedInUser._id,toUserId:userId},
                 {fromUserId:userId,toUserId:loggedInUser._id}]
        })
        if(isValidConnection)
            {
                throw new Error("connection request already exist between this user")
            }

        //save the connection into DB
        const connectionRequest = new Connectionrequest({
         fromUserId:loggedInUser._id,
         fromUserName:loggedInUser.firstName+" "+loggedInUser.lastName,
         toUserId:userId,
         toUserName:isUserIdValid.firstName+" "+isUserIdValid.lastName,
         status:status
        })
        const data = await connectionRequest.save()
        res.status(200).json({message:"connection sent successfully",data:data})

    } catch (error) {
        res.status(400).json({message:error.message})
    }
   
})

connectionRequestRouter.post("/request/review/:status/:userId",userAuth,async(req,res)=>{
    const loggedInUser = req.user
    const {status,userId} = req.params
   
    try 
    {
        //status validation
        const allowedStatus = ["accepted","rejected"]
        if(!allowedStatus.includes(status))
        {
           throw new Error("request not allowed")
        }

        //user validation
        const isUserIdValid = await User.findById(userId)
        if(!isUserIdValid)
        {
            throw new Error("user not found")
        }

        ////check if connection already exist
        const connectionRequest = await Connectionrequest.findOne(
            {fromUserId:userId,
             toUserId:loggedInUser._id,
             status:"like"           
            }
        )
        console.log(connectionRequest)
        if(!connectionRequest)
        {
            throw new Error("connection does not exist")
        }

        //save the connection into DB
        connectionRequest.status = status
        const data = await connectionRequest.save()
        res.status(200).json({message:"you have "+status+" "+isUserIdValid.firstName+" "+isUserIdValid.lastName+"'s connection",data:data})

    } catch (error) 
    {
       res.status(401).json({message:error.message})    
    }
    


})

module.exports = connectionRequestRouter