const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.ObjectId,
            ref: 'products',
        },
    ],
    productsQuantity: {
        type: Array,
    },
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        default: "Not process",
        enum: ["Not process", "Processing", "Shipped", "delivered", "Cancelled"]
    },
},
    { timestamps: true }
)

const orderModel = mongoose.model('orders',orderSchema);
module.exports=orderModel;