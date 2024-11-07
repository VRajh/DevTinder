const express = require("express")
const {connectDB} = require("./config/database")
const app = express()
const User = require("./models/user")
const currentTime = require("./config/date")
const {validateSignUpData} = require("./utils/validation")

app.use(express.json())

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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

app.post("/login",async(req,res)=>{
    try
    {
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        console.log(user)
        //validate res,body
        if(user && await bcrypt.compare(password, user.password))
        {
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

connectDB().then(()=>{
    console.log("DB connection established successfully")
    app.listen(3000,()=>{
        console.log("app started listening at port 3000")
    })
})
.catch(err=>{
     console.log("some error occured : ",err.message)
})

