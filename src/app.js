const express = require("express")
const {connectDB} = require("./config/database")
const app = express()
const User = require("./models/user")
const currentTime = require("./config/date")

app.use(express.json())

/* app.post("/signup",async (req,res,next)=>{

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

}) */

app.post("/signup",async (req,res,next)=>{

    //getting data from parameter
    console.log(req.body)
    const userObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password : req.body.password,
        timeStamp : currentTime,
        gender: req.body.gender,
        skills: req.body.skills
    }

    try
    {
    //inserting data into DB
    const user = new User(userObj)
    await user.save()
    res.send("Data added successfully")
    }
    catch(err)
    {
        res.send(("some error occured : "+err.message))
    }


})

app.get("/user/",async (req,res,next)=>{
    try{
    const data = await User.findOne({firstName:req.query.firstName})
    if(!data)
    {
        res.send("data not found")
    }
    else{
    res.send(data)
    }
}
catch(err){
   res.status(400).send("some error occured : "+err.message)
}
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

