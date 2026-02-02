import mongoose from "mongoose";
const UserSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercaase:true,
        trim:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin: { type: Boolean, default: false },
},{timestamps:true})


export default mongoose.models.User ||
  mongoose.model("User", UserSchema);