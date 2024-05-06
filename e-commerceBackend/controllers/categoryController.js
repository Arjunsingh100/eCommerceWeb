const slugify = require('slugify');
const categoryModel = require('../models/CategoryModel');

module.exports.createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(404).send({
                message: "Name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: 'Category Already Exits'
            })
        }
        const category = await new categoryModel({
            name: name,
            slug: slugify(name)
        }).save();
        res.status(201).send({
            success: true,
            message: 'Category created successfully',
            category
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Category',
            error
        })
    }
}

module.exports.updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const update = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            update
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Updating"
        })
    }
}

//singlecategory controller
module.exports.singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({ slug: req.params.slug });
        res.status(201).send({
            success: true,
            message: 'Get single category successfully',
            category
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while getting single category',
            error
        })
    }
}

//get all categories
module.exports.getAllCategories = async (req, res) => {
    try {
        const allCategories = await categoryModel.find()
        res.status(201).send({
            success: true,
            message: 'Get all users Successfully',
            allCategories
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting all categories',
            error,
        })
    }
}

//delete category controller
module.exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(201).send({
            success: true,
            message: 'Category deleted successfully'
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while deleting Category',
            error
        })
    }
}