const Product = require('../Modal/productModel');

exports.addProductController = async (req, res) => {
  console.log("Inside the addProductController");

  const { title, description, subCategory, variants } = req.body;
  const files = req.files;

  if (!title || !description || !subCategory || !variants) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!files || files.length < 3) {
    return res.status(400).json({ message: 'At least 3 images are required' });
  }

  try {
    const imagePaths = files.map(file => `${file.filename}`);
    const parsedVariants = JSON.parse(variants);

    const newProduct = new Product({
      title,
      description,
      subCategory,
      variants: parsedVariants,
      images: imagePaths
    });

    await newProduct.save();

    res.status(201).json({ message: "Product created successfully", product: newProduct });

  } catch (error) {
    console.error("Error in addProductController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProductController = async (req, res) => {
  console.log("inside the getProductController");

  try {
    
    const allProducts = await Product.find({});
    
    
    res.status(200).json(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSingleProductController = async (req, res) => {
  const {id}= req.params
  console.log("inside the getSingleProductController");

  try {
    
    const singleProducts = await Product.findById({_id:id});
    
    
    res.status(200).json(singleProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSearchbasedProductController = async (req, res) => {
  console.log("Inside getSearchbasedProductController");

  const { keyword } = req.query;

  try {
    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({ success: false, message: "Search keyword is required" });
    }

  
    const products = await Product.find({
      title: { $regex: keyword, $options: 'i' }
    });

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.EditProductController = async (req, res) => {
  const productId = req.params.id;
  const { title, description, subCategory, variants } = req.body;
  const files = req.files;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (subCategory) updateData.subCategory = subCategory;
    if (variants) updateData.variants = JSON.parse(variants);
    if (files && files.length > 0) {
      updateData.images = files.map(file => file.filename);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
