const validator = require("validator")

const validateSignUpData = (req) => {
    const { firstName, lastName, age, email, password } = req.body
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }  
    else if(!validator.isEmail(email)){
        throw new Error("email is not valid")
    }
    else if(age<18 || age>60)
    {
        throw new Error("you are not allowed to tinder 😂😂😂")
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("enter a strong password")
    }

}

const validateEditProfileData = (req)=>{
    const { firstName, lastName, age, email, gender } = req.body
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }  
    else if(!validator.isEmail(email)){
        throw new Error("email is not valid")
    }
    else if(age<18 || age>60)
    {
        throw new Error("you are not allowed to tinder 😂😂😂")
    }
    else if(!["male","female","others"].includes(gender))
    {
        throw new Error("enter a valid gender")
    }

}

module.exports = {
    validateSignUpData,validateEditProfileData
}