const User = require("../models/user");
const { jwt_private_key } = require("./constants")
const jwt = require('jsonwebtoken');

const userAuth = async(req,res,next)=>{

    try 
    {
        const {jwt_token} = req.cookies
        if(!jwt_token)
        {
            throw new Error("Invalid token")
        }
            
        const decoded_value = await jwt.verify(jwt_token, jwt_private_key) 
        //verify jwt token
        const loggedInUser = await User.findById(decoded_value._id)

        if(!loggedInUser)
            {
                throw new Error("Invalid user")
            }
        req.user = loggedInUser
        next()

    } catch (err) {
         res.status(400).send("some error occured : "+err.message)
    }
    
}

module.exports = userAuth