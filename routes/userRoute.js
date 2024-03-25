const express = require("express")
const router = express.Router()
const { userValidator } = require('../middleware/userValidate')
const userController = require("../controllers/userController")

router.get('/', userController.users)
router.post('/addUser', userValidator, userController.addUser)
router.put('/editUser', userValidator, userController.editUser)
router.delete('/delete/:username', userController.deleteUser)

module.exports = router