const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name should be at least 3 characters'], 
        maxlength: [50, 'Name should be less than 50 characters']
    },
    lastName :{
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name should be at least 3 characters'], 
        maxlength: [50, 'Name should be less than 50 characters']
    },
    age :{
        type: Number,
        min: [18, 'Minimum age is 18'],  // 'min' validation
        max: [60, 'Maximum age is 60']   // 'max' validation
    },
    gender:{
      type: String,
      required: true,
      //enum: ["male","female","other"],
      validate(value){
        if(!["male","female","other"].includes(value))
        {
            throw new Error(" enter correct gender")
        }
      } 
    },
    email :{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
       // match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
       validate(value){
        if(!validator.isEmail(value)  )
        {
            throw new Error(" enter correct email")
        }
      } 
    },
    password : { 
        type: String,
        required: [true, 'Password is required'],
        /* minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [128, 'Password should not exceed 128 characters'],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ] */
        validate(value){
            if(!validator.isStrongPassword(value,{ minLength: 2, minLowercase:0 }))
            {
                throw new Error("enter valid password")
            }
          }
    },
    skills :
    {
        type: [String],
        default:["cricket","art","gaming"]
    },
    photoUrl :
    {
        type: String,
        default:"https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid",
        validate(value){
            if(!validator.isURL(value) || !validator.isLowercase(value) )
            {
                throw new Error(" enter correct url")
            }
          } 
    }
},{
    timestamps:true
})

module.exports =  mongoose.model("User",userSchema)
