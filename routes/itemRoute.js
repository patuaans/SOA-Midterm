const express = require('express');
const ItemController = require('../controllers/itemController');
const router = express.Router();
const upload = require('../middleware/upload');

// Get all items
router.get('/', ItemController.getAllItems);
router.get('/:id', ItemController.getItemById);
router.get('/category/:category', ItemController.getItemByCategory)
router.post('/', ItemController.createItem);

router.post('/image/:id', upload.single('image'), ItemController.uploadItemImage);
router.put('/:id', ItemController.updateItem);
router.delete('/:id', ItemController.deleteItem);
module.exports = router;