import mongoose from "mongoose";

const cartSchema=mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    items:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1,
            },
        }
    ]
},{timestamps:true})

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);