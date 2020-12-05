const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    institution:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    studentorteacher:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const User=mongoose.model("User",UserSchema)//User Collection

module.exports=User