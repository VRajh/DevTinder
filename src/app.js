const express = require("express")
const app = express()


app.get("/",(req,res)=>{
    res.send("hello from homepage")
})

app.get("/vimal",(req,res)=>{
    res.send("hello vimal")
})

app.get("/test",(req,res)=>{
    res.send("hello test")
})



app.listen(3000,()=>{
    console.log("app started listening at port 3000")
})