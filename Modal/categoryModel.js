const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    }
});

const categories = mongoose.model("categories", categoriesSchema);

module.exports =categories;