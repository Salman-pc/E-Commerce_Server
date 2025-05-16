const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    
  },
  subCategoryName: {
    type: String,
    required: true,
    lowercase: true
  }
});

//  Make combination unique instead
subCategorySchema.index({ categoryName: 1, subCategoryName: 1 }, { unique: true });


const subcategories = mongoose.model("subcategories", subCategorySchema);

module.exports =subcategories;