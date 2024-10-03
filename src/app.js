const express = require("express")
const { useAuth } = require("./useAuth")
const app = express()

//app.use("/admin",useAuth)
app.use("/",(err,req,res,next)=>{
    console.log("came inside middleware")
    if(err){
        res.send("err from middleware")   
    }
    
})

app.get("/admin/user",(req,res,next)=>{
    try
    {
        throw new Error("testing error")
        res.send("welcome to admin dashboard ")
    }
   catch(err)
   {
       res.send("err from try catch")
   }
   
})



app.listen(3000,()=>{
    console.log("app started listening at port 3000")
})