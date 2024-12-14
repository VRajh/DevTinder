const express = require("express")
const {connectDB} = require("./config/database")
const app = express()
const User = require("./models/user")
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const connectionRequestRouter = require("./routes/connection")
const userRouter = require("./routes/user")

app.use(express.json())
app.use(cookieParser())

app.use("/",authRouter,profileRouter,connectionRequestRouter,userRouter)

connectDB().then(()=>{
    console.log("DB connection established successfully")
    app.listen(3000,()=>{
        console.log("app started listening at port 3000")
    })
})
.catch(err=>{
     console.log("some error occured : ",err.message)
})

