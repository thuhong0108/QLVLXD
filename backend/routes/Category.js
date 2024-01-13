import express from "express";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { getCategoryById } from "../services/category.js";

const router = express.Router();

// Lấy tất cả danh mục sản phẩm
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ 
            message: 'Lấy tất cả danh mục sản phẩm thành công', 
            data: categories
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Lấy danh mục sản phẩm theo ID
router.get('/:id', async (req, res) => {
    try {
        const category = await getCategoryById(req.params.id);
        res.status(200).json({ 
            message: 'Lấy danh mục sản phẩm thành công',
            data: category 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Thêm danh mục sản phẩm
router.post('/create', async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        const savedCategory = await newCategory.save();
        res.status(200).json({
            message: 'Thêm danh mục  sản phẩm thành công',
            product: savedCategory
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

// Xóa danh mục sản phẩm
router.delete('/delete/:id', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Xóa danh mục sản phẩm thành công' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router