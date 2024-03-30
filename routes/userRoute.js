const express = require("express")
const { userValidator } = require('../middleware/userValidate')
const userController = require("../controllers/userController")
const router = express.Router()

router.route('/')
    .get(userController.getUsers)
    .post(userValidator, userController.addUser)

router.route('/:userId')
    .put(userValidator, userController.editUser)
    .delete(userController.deleteUser)

module.exports = router