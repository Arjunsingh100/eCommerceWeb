const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createCategoryController,
    updateCategoryController,
    singleCategoryController,
    getAllCategories, 
    deleteCategory} = require('../controllers/categoryController');
const router = express();

router.post('/create-category', requireSignIn, isAdmin, createCategoryController);
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//get singleCategory
router.get('/single-category/:slug', singleCategoryController);

//get all category
router.get('/get-categories', getAllCategories)

//delete single category
router.delete('/delete-category/:id',deleteCategory)

module.exports = router;