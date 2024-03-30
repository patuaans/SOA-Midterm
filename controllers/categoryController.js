const Category = require('../models/Category')
const Item = require('../models/item')

const create = async (req, res) => {
    const { name } = req.body;
    try {
        const category = new Category({ name })
        await category.save()
        res.status(201).json({ message: "Category created:", category})
    } catch (error) {
        res.status(400).json({ message: "Error creating category", error: error.message });
    }
}

// get all categories
const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get a category by id
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// update a category by id
const updateById = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category does not exist' });
        }
        res.status(200).json(
            {
                message: 'Category updated successfully',
                category
            }
        );
    } catch (error) {
        res.status(404).json({ message: "category id or name is not valid" });
    }
}

// delete a category by id
const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// count distinct item in a category
const countDistinctItem = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category does not exist' });
        }
        const count = await Item.countDocuments({ categoryId: id });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
    countDistinctItem
}
