import Category from "../models/Category.js";

// Hàm lấy sản phẩm theo ID
async function getCategoryById(categoryId) {
    try {
        const category = await Category.findById(categoryId).
            populate('products', ['displayName', 'name', 'description', 'price', 'image']);
        return category;
    } catch (error) {
        throw new Error(error.message);
    }
}

export { getCategoryById };