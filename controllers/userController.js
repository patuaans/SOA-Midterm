const { validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const saltRounds = 10

module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ message: "Users fetched successfully", data: users })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error: error.message })
    }
}

module.exports.addUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
    }

    let { name, email, gender, dob, phone, address, role } = req.body

    try {
        const userExists = await User.findOne({ 'profile.email': email })
        if (userExists) {
            return res.status(409).json({ message: 'User with the provided email already exists' })
        }

        const username = email.split('@')[0]
        const hashedPassword = await bcrypt.hash(username, saltRounds);
        const newUser = new User({
            username,
            password: hashedPassword,
            role,
            active: false,
            lock: false,
            profile: { name, email, gender, dateOfBirth: dob, phone, address },
        })

        await newUser.save()
        res.status(201).json({ message: "User added successfully", data: newUser })
    } catch (error) {
        res.status(500).json({ message: "Failed to add user", error: error.message })
    }
}

module.exports.editUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
    }

    const {name, ...updateData} = req.body

    try {
        const updatedUser = await User.findOneAndUpdate(
            { 'profile.email': email },
            { $set: { 'profile': updateData } },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json({ message: "User updated successfully", data: updatedUser })
    } catch (error) {
        res.status(500).json({ message: "Failed to update user", error: error.message })
    }
}

module.exports.deleteUser = async (req, res) => {
    const { username } = req.params

    try {
        const result = await User.deleteOne({ username })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error: error.message })
    }
}