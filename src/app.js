const express = require("express")
const {connectDB} = require("./config/database")
const app = express()
const User = require("./models/user")

app.post("/signup",async (req,res,next)=>{
  
    //inserting data into DB
    const userObj = {
        firstName: "Vimal",
        lastName: "Rajh",
        age: 28,
        email: "vimal@gmail.com",
        password : "password"
    }  

    const user = new User(userObj)
    await user.save()
    res.send("Data added successfully")

})

connectDB().then(()=>{
    console.log("DB connection established successfully")
    app.listen(3000,()=>{
        console.log("app started listening at port 3000")
    })
})
.catch(err=>{
     console.log("some error occured : ",err.message)
})

