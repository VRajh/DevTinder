const mongoose = require("mongoose")

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
        max: [65, 'Maximum age is 65']   // 'max' validation
    },
    gender:{
      type: String,
      required: true,
      enum: ["male","female","other"]
    },
    email :{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password : { 
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [128, 'Password should not exceed 128 characters'],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ]
    },
    skills :
    {
        type: [String]
    },
    photoUrl :
    {
        type: String
    }
},{
    timestamps:true
})

module.exports =  mongoose.model("User",userSchema)
