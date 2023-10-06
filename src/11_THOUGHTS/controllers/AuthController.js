const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login (req, res) {
        res.render('auth/login')
    }

    static register (req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        // password match validation
        if(password != confirmpassword) {
            req.flash('message', `Passwords don't match, please try again. `)
            res.render('auth/register')

            return
        }

        // check if user exists
        const checkIfUserExists = await User.findOne({ where: {email : email}})
        if(checkIfUserExists){
            req.flash('message', 'E-mail is already in use.')
            res.render('auth/register')
            return
        }

        // create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user = { name, email, password: hashedPassword }
        try {
            await User.create(user)
            req.flash('message', 'Registration completed successfully')
            res.redirect('/')
        } catch (err){console.log(err)}


    }
}
