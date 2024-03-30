const express = require('express')
const ItemController = require('../controllers/itemController')
const upload = require('../middleware/upload')
const router = express.Router()

router.route('/')
    .get(ItemController.getAllItems)
    .post(ItemController.createItem)

router.route('/:id')
    .get(ItemController.getItemById)
    .put(ItemController.updateItem)
    .delete(ItemController.deleteItem)

router.get('/category/:category', ItemController.getItemByCategory)

router.post('/image/:id', upload.single('image'), ItemController.uploadItemImage)

module.exports = router