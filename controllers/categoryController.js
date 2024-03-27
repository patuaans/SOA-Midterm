const CategorySchema = require('../models/Category');
const ItemSchema = require('../models/item');

// create a new category
const create = async (req, res) => {
    const { name } = req.body;
    const category = new CategorySchema({ name });
    try {
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// get all categories
const getAll = async (req, res) => {
    try {
        const categories = await CategorySchema.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get a category by id
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await CategorySchema.findById(id);
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
        const category = await CategorySchema.findByIdAndUpdate(id, { name }, { new: true });
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
        await CategorySchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// count distinct item in a category
const countDistinctItem = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await CategorySchema.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category does not exist' });
        }
        const count = await ItemSchema.countDocuments({ categoryId: id });
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
