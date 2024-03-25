const {validationResult} = require("express-validator")
const bcrypt = require('bcrypt')
const User = require('../models/user')

const saltRounds = 10

module.exports.users = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ success: true, data: users})
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: 'Internal server error' })
    }
}

module.exports.addUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0].msg
        return res.status(404).json({ success: false, error: firstError })
    }

    let { name, email, gender, dob, phone, address, role } = req.body

    try {
        const existingUsers = await User.find({ 'profile.email': email })
        if (existingUsers.length) {
            return res.status(404).json({ success: false, error: 'User with the provided email already exists' })
        }

        const username = email.split('@')[0]
        const hashedPassword = await bcrypt.hash(username, saltRounds)
        const newUser = new User({
            username,
            password: hashedPassword,
            role,
            active: false,
            lock: false,
            profile: { name: name, email, gender, dateOfBirth: dob, phone, address },
        })

        await newUser.save()
        return res.status(200).json({ success: true, data: newUser})
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
}

module.exports.editUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const firstError =errors.array()[0].msg
        return res.status(404).json({ success: false, error: firstError })
    }

    let {name, email, gender, dob, phone, address, role} = req.body

    try {
        const result = await User.findOneAndUpdate(
            { 'profile.email': email },
            {
                $set: {
                    role: role,
                    'profile.name': name,
                    'profile.email': email,
                    'profile.gender': gender,
                    'profile.dob': dob,
                    'profile.phone': phone,
                    'profile.address': address,
                },
            },
            { new: true }
        );

        if (result) {
            return res.json({ success: true });
        } else {
            return res.status(404).json({
                success: false,
                error: 'An error occurred while updating the employee',
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
}

module.exports.deleteUser = async (req, res) => {
    const { username } = req.params;

    try {
        const result = await User.deleteOne({ username })

        if (result.deletedCount > 0) {
            return res.status(200).json({ success: true, message: 'User has been deleted'})
        } else {
            return res.status(404).json({
                success: false,
                error: 'User not found or an error occurred while deleting the employee',
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
}