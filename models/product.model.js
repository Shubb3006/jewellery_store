import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        default:"",
    },
    images:[
        {
            type:String,
            reqauired:true
        }
    ],
    category:{
        type:String,
        default:"jewellery"
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true, // admin can disable product
    },
    
},{timestamps:true})

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);