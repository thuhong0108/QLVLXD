import express from "express";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { getProductById } from "../services/Product.js";

const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category', ['name']);
        res.status(200).json({ 
            message: 'Lấy tất cả sản phẩm thành công', 
            data: products
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Lấy sản phẩm theo ID
router.get('/:id', async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        res.status(200).json({ 
            message: 'Lấy sản phẩm thành công',
            data: product 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Lấy sản phẩm theo category
router.get('/get/:categoryId', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.categoryId });
        res.status(200).json({ 
            message: 'Lấy sản phẩm thành công',
            data: products 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Tìm kiếm sản phẩm
router.get('/search/:value', async (req, res) => {
    try {
        const searchValue = req.params.value;
        const regex = new RegExp(searchValue, 'i');
        const products = await Product.find({ name: regex });

        res.status(200).json({ 
            message: 'Tìm kiếm sản phẩm thành công', 
            data: products
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Thêm sản phẩm
router.post('/create/:categoryId', async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        const data = { ...req.body, category };
        const newProduct = new Product(data);

        const savedProduct = await newProduct.save();
        await category.updateOne({ $push: { products: savedProduct._id } });

        res.status(200).json({
            message: 'Thêm sản phẩm thành công',
            product: savedProduct
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Sửa sản phẩm theo id
router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Product.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json({
            message: 'Sửa sản phẩm thành công'
         });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xóa sản phẩm
router.delete('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Xóa sản phẩm thành công' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;