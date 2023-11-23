const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // validations
    if (!name) {
      res.status(422).json({ message: 'The name field is required!' });
      return;
    }
    if (!email) {
      res.status(422).json({ message: 'The email field is required!' });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: 'The phone field is required!' });
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'The password field is required!' });
      return;
    }
    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: 'The password confirmation field is required!' });
      return;
    }
    if (password !== confirmpassword) {
      res.status(422).json({
        message:
          'The password field and the confirmation password field must be the same!',
      });
      return;
    }
    // check if user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json({
        message: 'This email is already in use, please use another one.',
      });
      return;
    }

    //create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // CREATE user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      // res.status(201).json({message: 'User succesfully created!', newUser})
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: 'The email field is required!' });
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'The password field is required!' });
      return;
    }

    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({
        message: `There's no user registered with this e-mail.`,
      });
      return;
    }

    // check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(422).json({
        message: `Invalid password.`,
      });
      return;
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, 'mysecret');

      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;
    const user = await User.findById(id).select('-password');

    if (!user) {
      res.status(422).json({ message: 'User not found.' });
      return;
    }
    res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const id = req.params.id;

    // check if user exists
    const token = getToken(req);
    const user = await getUserByToken(token);

    const { name, email, phone, password, confirmpassword } = req.body;
    let image = '';

    // validations
    if (!name) {
      res.status(422).json({ message: 'The name field is required!' });
      return;
    }
    user.name = name;

    if (!email) {
      res.status(422).json({ message: 'The email field is required!' });
      return;
    }
    const userExists = await User.findOne({ email: email });
    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Please, user another email!' });
      return;
    }
    user.email = email;

    if (!phone) {
      res.status(422).json({ message: 'The phone field is required!' });
      return;
    }
    user.phone = phone;

    if (password !== confirmpassword) {
      res.status(422).json({
        message:
          'The password field and the confirmation password field must be the same!',
      });
      return;
    } else if (password === confirmpassword && password != null) {
      // creating password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      // returns user updated data
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );
      res.status(200).json({message: 'User successfully updated!'})
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  }
};
