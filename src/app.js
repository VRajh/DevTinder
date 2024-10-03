const express = require("express")
const { useAuth } = require("./useAuth")
const app = express()

app.use("/admin",useAuth)

app.get("/admin/user",(req,res,next)=>{
    res.send("welcome to admin dashboard ")
})

app.get("/admin/getalldata",(req,res,next)=>{
    res.send("all data sent ")
})

app.get("/admin/deletedata",(req,res,next)=>{
    res.send("data deleted")
})


app.listen(3000,()=>{
    console.log("app started listening at port 3000")
})