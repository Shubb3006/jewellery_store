// models/order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name:{
        type:String,
        required:true
      },
      quantity: {
        type: Number,
        required: true,
      },
      priceAtOrder: {
        type: Number,
        required: true, // snapshot price
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ["COD", "ONLINE"],
    default: "COD",
  },

  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "FAILED"],
    default: "PENDING",
  },

  orderStatus: {
    type: String,
    enum: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PLACED",
  },

  address: {
    type: String,
    default:"Sdf"
  },

}, { timestamps: true });

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);
