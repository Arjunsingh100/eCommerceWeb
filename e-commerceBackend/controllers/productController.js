const productModel = require("../models/productModel");
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const slugify = require('slugify');
const categoryModel = require("../models/CategoryModel");
const orderModel = require('../models/orderModel');
const braintree = require('braintree');


//braintree payment gateway
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


//create products controller
module.exports.createProductController = async (req, res) => {
    try {
        const { name, category, price, description, quantity, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !category:
                return res.status(500).send({ error: 'Category is required' });
            case !price:
                return res.status(500).send({ error: 'Price is required' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Photo is required and should be less that 1mb' })
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product created successfully'
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while creating products'
        })
    }
}

//get single product controller
module.exports.getSingleProductController = async (req, res) => {
    try {
        const singleProduct = await productModel.findOne({ slug: req.params.slug }).select('-photo').populate('category');
        res.status(201).send({
            success: true,
            message: 'Product get successfully',
            singleProduct
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting product'
        })
    }
}

//gettting all products
module.exports.getAllProductController = async (req, res) => {
    try {
        const allProducts = await productModel.find().select('-photo').limit(12).populate('category').sort({ createdAt: -1 });
        res.status(201).send({
            success: true,
            message: 'All products getted successfully',
            allProducts
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting all products',
        })
    }
}

//getting photo
module.exports.productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.Pid).select('photo');
        if (product.photo.data) {
            res.set('contentType', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
        else {
            return res.status(200).send({ Error: 'Photo is Null' })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: true,
            message: 'Error while getting photo'
        })
    }
}

//delete a single product
module.exports.deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.Pid).select('-photo')
        res.status(201).send({
            success: true,
            message: 'Product deleted successfully',
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Product deleted successfully'
        })
    }
}

//update a product 
module.exports.updateProductController = async (req, res) => {
    try {
        const { name, description, category, price, quantity, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({ Error: 'Name is required' })
            case !description:
                return res.status(500).send({ Error: 'Description is required' })
            case !category:
                return res.status(500).send({ Error: 'Category is required' })
            case !price:
                return res.status(500).send({ Error: 'Price is required' });
            case !quantity:
                return res.status(500).send({ Error: 'Quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ Error: 'Photo is required and size should less that 1mb' });
        }
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.Pid,
            { ...req.fields, slug: slugify(name) },
            { new: true });
        if (photo) {
            updatedProduct.photo.data = fs.readFileSync(photo.path);
            updatedProduct.photo.contentType = photo.type;
        }
        updatedProduct.save();
        res.status(500).send({
            success: true,
            message: 'Product updated successfully',
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating product Backend'
        })
    }
}

module.exports.productCountController = async (req, res) => {
    try {
        const count = await productModel.find({}).estimatedDocumentCount();
        res.status(201).send({
            success: true,
            message: 'Count got Successfully',
            count
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error while finding total count'
        })
    }
}

module.exports.categoryFilterController = async (req, res) => {
    try {
        const filterProducts = await productModel.find({ category: req.params.Cid });
        res.status(201).send({
            success: true,
            message: 'Filter performs successfully',
            filterProducts
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while performing category based filter'
        })
    }

}

//search controller 
module.exports.searchController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const products = await productModel.find(
            {
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } }
                ]
            }
        ).select('-photo');
        res.status(201).send({
            success: true,
            products
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while searching products'
        })
    }
}

//getting related products 
module.exports.relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const relatedProduct = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select('-photo').limit(3).populate('category');
        res.status(201).send({
            success: true,
            message: 'Related products getted successfully',
            relatedProduct
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while fetching related products'
        })
    }
}

module.exports.productCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.find({ slug: slug });
        const products = await productModel.find({ category }).select('-photo').populate('category');
        res.status(201).send({
            success: true,
            message: 'Category Product Successfully',
            products
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while get Category based Product'
        })
    }
}

//payment token controller
module.exports.paymentTokenController = async (req, res) => {
    try {
        const token = gateway.clientToken.generate({}, function (error, resp) {
            if (error) {
                res.send(error)
            }
            else {
                res.send(resp)
            }
        })
    }
    catch (error) {
        res.status(500).send(error)
    }
}
//payment controller
module.exports.paymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let productsQuantity = []
        cart.map((product,i)=>{
            productsQuantity.push(!product.userQuantity ? '1' : product.userQuantity);
        })
        console.log("this is payment Controller")
        let total = 0;
        cart.map((i) => {
            total = total + (!i.userQuantity ? 1 : i.userQuantity)*i.price;
        })
        gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        productsQuantity: productsQuantity,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true })
                }
                else {
                    res.status(500).send(error)
                }
            })

    }
    catch (error) {
        res.status(500).send(error);
    }
}
//get orders Controller

module.exports.getOrdersController = async (req, res) => {
    try {

        const orders = await orderModel.find({ buyer: req.user._id }).populate('products', '-photo').populate('buyer');
        res.status(200).json({ orders: orders })

    }
    catch (error) {
        res.status(500).send(error);
    }
}

//get admin orders
module.exports.getAdminOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find().populate("products", "-photo").populate("buyer");
        res.status(200).send({
            success: true,
            orders: orders
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
}

//update order status controller
module.exports.updateOrderStatusController = async (req, res) => {
    try {
        const  orderNumber  = req.params.orderNumber;
        const { status } = req.body;
        
        //  res.status(200).send({orderNumber,status})
        const orders = await orderModel.findByIdAndUpdate({ _id: orderNumber }, { status: status },{new:true});
        res.status(200).send({success: true,orders})
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
}