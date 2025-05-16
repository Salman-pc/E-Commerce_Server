
const categories = require("../Modal/categoryModel");

exports.addCategoryController = async (req, res) => {
    console.log("Inside addCategoryController");

    const { categoryName } = req.body;


    try {

        if (!categoryName) {
            return res.status(400).json({ message: "Category name is required" });
        }
        // Check if category already exists
        const existing = await categories.findOne({ categoryName });
        if (existing) {
            return res.status(409).json({ message: "Category already exists" });
        }

        const newCategory = new categories({ categoryName });
        await newCategory.save();

        return res.status(201).json({ message: "Category added successfully", category: newCategory });
    } catch (error) {
        console.error("Error in addCategoryController:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getCategoryController = async (req, res) => {
  console.log("Inside getCategoryController");

  try {
    const allCategories = await categories.find(); // Get all categories
    return res.status(200).json({ categories: allCategories });
  } catch (error) {
    console.error("Error in getCategoryController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
