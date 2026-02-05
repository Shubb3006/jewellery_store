import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    name: { type: String }, // Home / Office
    recipientName: { type: String },
    phone: { type: String }, // better to store as string for leading 0s
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
    isDefault: { type: Boolean, default: false },
});

const UserSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
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
    addresses:[AddressSchema],
    isAdmin: { type: Boolean, default: false },
},{timestamps:true})


export default mongoose.models.User ||
  mongoose.model("User", UserSchema);