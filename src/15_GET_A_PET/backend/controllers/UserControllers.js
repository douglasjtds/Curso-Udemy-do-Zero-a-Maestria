const createUserToken = require('../helpers/create-user-token')
const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = class UserController {
    static async register(req, res) {
        const {name, email, phone, password, confirmpassword} = req.body

        //validations
        if (!name) {
            res.status(422).json({message: 'The name field is required!'})
            return
        }
        if (!email) {
            res.status(422).json({message: 'The email field is required!'})
            return
        }
        if (!phone) {
            res.status(422).json({message: 'The phone field is required!'})
            return
        }
        if (!password) {
            res.status(422).json({message: 'The password field is required!'})
            return
        }
        if (!confirmpassword) {
            res.status(422).json({message: 'The password confirmation field is required!'})
            return
        }
        if (password !== confirmpassword) {
            res.status(422).json({ message: 'The password field and the confirmation password field must be the same!'})
            return
        }
        // check if user exists
        const userExists = await User.findOne({email: email})
        if(userExists){
            res.status(422).json({
                message: 'This email is already in use, please use another one.'
            })
            return
        }

        //create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // CREATE user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            // res.status(201).json({message: 'User succesfully created!', newUser})
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}