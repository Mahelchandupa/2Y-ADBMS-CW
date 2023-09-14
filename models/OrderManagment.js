const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer", // Reference to the "Customer" model to associate orders with customers
  },
  order_date: {
    type: Date,
    required: true,
  },
  order_details: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product", // Reference to the "Product" model to associate product details with orders
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
},
{timestamps: true});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
