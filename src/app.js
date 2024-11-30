const express = require("express")
const {connectDB} = require("./config/database")
const app = express()
const User = require("./models/user")
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const connectionRequestRouter = require("./routes/connection")

app.use(express.json())
app.use(cookieParser())

app.use("/",authRouter,profileRouter,connectionRequestRouter)


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

