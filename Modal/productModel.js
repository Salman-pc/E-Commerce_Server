const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    variants: [
        {
            ram: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            qty: {
                type: Number,
                default: 1,
            },
        },
    ],
    images: {
        type: [String], 
        required: true
    },
}, {
    timestamps: true
});

const products = mongoose.model("products", ProductSchema);

module.exports = products;
