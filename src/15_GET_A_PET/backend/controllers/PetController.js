const Pet = require('../models/Pet');

// helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController {
  // create a pet
  static async create(req, res) {
    const { name, age, weight, color } = req.body;
    const available = true;

    // images upload

    // validations
    if (!name) {
      res.status(422).json({ message: 'The name field is required!' });
      return;
    }

    if (!age) {
      res.status(422).json({ message: 'The age field is required!' });
      return;
    }

    if (!weight) {
      res.status(422).json({ message: 'The weight field is required!' });
      return;
    }

    if (!color) {
      res.status(422).json({ message: 'The color field is required!' });
      return;
    }

    // get pet owner
    const token = getToken(req)
    const user = await getUserByToken(token)

    //create a pet
    const pet = new Pet({
        name, age, weight, color, images : [],
        user: {
            _id: user._id,
            name: user.name,
            image: user.image,
            phone: user.phone
        }
    })

    try {
        const newPet = await pet.save()
        res.status(201).json({
            message: 'Pet successfully registered!',
            newPet
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
  }
};
