const express = require('express');
const { createProductController, getSingleProductController, getAllProductController, updateProductController, deleteProductController, productPhotoController, productCountController, categoryFilterController, searchController, relatedProductController, productCategoryController, paymentTokenController, paymentController, getOrdersController,getAdminOrdersController,updateOrderStatusController } = require('../controllers/productController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const formidable = require('express-formidable');
const router = express.Router();

//creating product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);
//get a single product route
router.get('/get-product/:slug', getSingleProductController);
//getting all products route
router.get('/get-products', getAllProductController);
//updating a product route
router.put('/update-product/:Pid', requireSignIn, isAdmin, updateProductController)
//deleting a product route
router.delete('/delete-product/:Pid', requireSignIn, isAdmin, deleteProductController);
//get photo
router.get('/get-photo/:Pid', productPhotoController)
//get the products count
router.get('/product-count', productCountController)
//category based filter
router.get('/category-filter/:Cid', categoryFilterController);
//search router
router.get('/search/:keyword', searchController)
//related products
router.get('/related-product/:pid/:cid', relatedProductController);
//product category route
router.get('/product-category/:slug', productCategoryController);
//get braintree payment token
router.get('/braintree/token', paymentTokenController);
//braintree payment router
router.post('/braintree/payment', requireSignIn, paymentController);
//get orders router
router.get('/orders', requireSignIn, getOrdersController);
//get admin orders router
router.get('/getAdminOrders',requireSignIn,isAdmin,getAdminOrdersController)
//update order status
router.put('/updateOrderStatus/:orderNumber',updateOrderStatusController)

module.exports = router;