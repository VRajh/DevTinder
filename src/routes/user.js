const express = require("express")
const userAuth = require("../utils/userAuth")
const User = require("../models/user")
const ConnectionRequest = require("../models/connectionRequest")
const userRouter = express.Router()

userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user
        //get feed from connection db
        const hideFeed = await ConnectionRequest.find({
          $or:[
            {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}
          ]
        }).select("fromUserId toUserId")

          const hideUsersFromFeed = new Set();
          hideFeed.forEach(row=>{
          hideUsersFromFeed.add(row.fromUserId.toString())
          hideUsersFromFeed.add(row.toUserId.toString())
        })

        const feedProfile = await User.find({
          $and:[{_id:{$nin:[...hideUsersFromFeed]}},{_id:{$ne:loggedInUser._id}}]}).select("firstName lastName")
        //const feedProfile = await User.findById({$nin:[...hideUsersFromFeed]})
        console.log(feedProfile) 

        res.status(200).json({feedProfile})

    } catch (error) {
        res.status(400).json({message:error.message})
    } 
})

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
   
    try {
        const loggedInUser = req.user
        const USER_SAFE_DATA = "firstName lastName age gender photoUrl skills"

        const connections = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"like"
        }).populate("fromUserId",USER_SAFE_DATA)

        const data = connections.map(row => row.fromUserId)

        res.status(200).json({data})

    } catch (error) {
          res.status(400).json({message:error.message})
    }
    

})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
   
    try {
        const loggedInUser = req.user
        const USER_SAFE_DATA = "firstName lastName age gender photoUrl skills"

        const connections = await ConnectionRequest.find({
            $or:[
            {toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id,status:"accepted"}
            ]}).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)

        const data = connections.map(row =>{
             if(row.fromUserId._id.equals(loggedInUser._id))
             {
                return row.toUserId
             }
             return row.fromUserId
        })
        res.status(200).json({data})

    } catch (error) {
          res.status(400).json({message:error.message})
    }
    

})

module.exports = userRouter