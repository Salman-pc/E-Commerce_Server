const express =  require('express')

const userController = require('../Controller/userController')
const categoryController =require('../Controller/catogoryController')
const subcategoryController=require('../Controller/subcategoriesController')
const productController=require('../Controller/productController')
const multermiddileware = require('../Middilware/MulterMiddileware')
const wishlistcontroller = require('../Controller/wishlistController')

const router = express.Router()

// authntication
router.post('/usersignup',userController.userSignupController)
router.post('/userlogin',userController.userLoginController)

// category
router.post("/addcategory", categoryController.addCategoryController);
router.get("/getcategories",categoryController.getCategoryController);

// subcategories
router.post("/addsubcategory",subcategoryController.addsubcategoriesController)
router.get("/getsubcategory",subcategoryController.getsubcategoriesController)

//productCategories
router.post("/addproduct",multermiddileware.array('images',3),productController.addProductController)
router.get("/getproduct",productController.getProductController)
router.get("/getsingleproduct/:id",productController.getSingleProductController)

// wishlist
router.post("/addtowishlist",wishlistcontroller.addproducttowishlistController)
router.get("/gettowishlist/:userid",wishlistcontroller.getWishlistController)
router.delete("/deletefromwishlist/:id",wishlistcontroller.deleteWishlistItemController)


module.exports=router