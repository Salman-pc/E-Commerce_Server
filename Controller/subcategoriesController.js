
const subcategories = require('../Modal/subcategoryModel');


exports.addsubcategoriesController = async (req, res) => {
  console.log("Inside addsubcategoriesController");

  const { categoryName, subCategoryName } = req.body;

  if (!categoryName || !subCategoryName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for duplicate under same category
    const existing = await subcategories.findOne({ categoryName, subCategoryName });
    if (existing) {
      return res.status(409).json({ message: "Subcategory already exists under this category" });
    }

    const newSubCategory = new subcategories({ categoryName, subCategoryName });
    await newSubCategory.save();

    res.status(201).json({
      message: "Subcategory added successfully",
      data: newSubCategory
    });
  } catch (error) {
    console.error("Error adding subcategory:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getsubcategoriesController = async (req, res) => {
  console.log("Inside getsubcategoriesController");

  try {
    const allSubCategories = await subcategories.find();

    res.status(200).json({
      message: "Subcategories fetched successfully",
      data: allSubCategories
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
