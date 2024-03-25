const fs = require("fs");
const baseUrl = require("../middleware/helper/basePathHelper");
const path = require("path");

const Item = require("../models/Item");
const domain =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://food-delivery-api-v1.herokuapp.com";


// Get all items
const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get single item by ID
const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create a new item
const createItem = async (req, res) => {

    console.log(req.body);
    try {
        const newItem = new Item({
            name: req.body.name,
            categoryId: req.body.categoryId,
            active: req.body.active ,
            price: req.body.price,
            description: req.body.description,
            imageUrl: "",
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit/Upload item image
const uploadItemImage = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        if (req.file) {
            const protocol = req.protocol;
            const host = req.get("host");
            const baseUrl = `${protocol}://${host}`;

            const imageUrl = `${baseUrl}\\${req.file.path}`;
            if (item.imageUrl) {
                deleteOldImage(item.imageUrl);
            }

            item.imageUrl = imageUrl;
        }
        console.log(item);
        const savedItem = await item.save();
        res.json(savedItem);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteOldImage = async (imagePath) => {
    try {
        const imgBaseUrl = baseUrl(imagePath);
        imagePath = imagePath.replace(imgBaseUrl, "");
        console.log("image path" , imagePath);
        const filePath = path.join(__dirname, "..", imagePath);
        await fs.promises.unlink(filePath);
    } catch (error) {
        console.error("Error deleting image file:", error);
    }
};

// Update an existing item
const updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete an item
const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Export controller actions
module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    uploadItemImage,
    deleteItem,
};
