const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId :{   
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref:"User"
    },
    fromUserName : {
        type:String,
        required:true
    },
    toUserId :{   
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
     },
     toUserName : {
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["accepted","rejected","like","dislike"]
    }
},
{
    timestamps:true
})

connectionRequestSchema.index({fromUserId:1,toUserId:1})

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {
        throw new Error("Cannot send connection request to yourself!")
    }
    next()
})

module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema)