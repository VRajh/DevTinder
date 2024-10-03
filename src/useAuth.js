const useAuth = (req,res,next)=>{
    const token = "abc"
    const isAuthenticated = token === "abc"
    if(!isAuthenticated)
    {
       console.log("error occured")
       res.status(400).send("not able to authenticate")
    }
    console.log("welcome admin")
    next()
}

module.exports = {
useAuth
}