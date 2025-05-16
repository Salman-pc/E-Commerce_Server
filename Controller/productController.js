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

exports.getSearchbasedProductController = async (req,res)=>{
    console.log("inside the getSearchbasedProductController");
    
}