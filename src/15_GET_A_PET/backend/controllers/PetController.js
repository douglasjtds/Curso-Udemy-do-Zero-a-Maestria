const Pet = require('../models/Pet');

// helpers
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PetController {
  // create a pet
  static async create(req, res) {
    const { name, age, weight, color } = req.body;
    const images = req.files;
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

    console.log(images);
    if (typeof images !== 'undefined' && images.length === 0) {
      res.status(422).json({ message: 'The image field is required!' });
      return;
    }

    // get pet owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    //create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({
        message: 'Pet successfully registered!',
        newPet,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const pets = await Pet.find().sort('-createdAt');

    res.status(200).json({
      pets: pets,
    });
  }

  static async getAllUserPets(req, res) {
    // get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt');

    res.status(200).json({
      pets,
    });
  }

  static async getAllUserAdoptions(req, res) {
    // get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt');

    res.status(200).json({
      pets,
    });
  }

  static async getPetById(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid Id!' });
      return;
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: 'Pet not found!' });
    }

    res.status(200).json({
      pet: pet,
    });
  }

  static async removePetById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid Id!' });
      return;
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: 'Pet not found!' });
      return
    }

    // check if logged in user registered the pet
    const token = getToken(req)
    const user = await getUserByToken(token)
    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({message: "There was an error processing your request, please try again later!"})
      console.log("Logged user cannot delete this pet!")
      return
    }

    await Pet.findByIdAndRemove(id)

    res.status(200).json({message: "Pet successfully removed!"})
  }

  static async updatePet(req, res) {
    const id = req.params.id
    const { name, age, weight, color, available } = req.body
    const images = req.files
    const updatedData = {}

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: 'Pet not found!' });
      return
    }

    // check if logged in user registered the pet
    const token = getToken(req)
    const user = await getUserByToken(token)
    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({message: "There was an error processing your request, please try again later!"})
      console.log("Logged user cannot update this pet!")
      return
    }


    // validations
    if (!name) {
      res.status(422).json({ message: 'The name field is required!' });
      return;
    } else {
      updatedData.name = name
    }

    if (!age) {
      res.status(422).json({ message: 'The age field is required!' });
      return;
    } else {
      updatedData.age = age
    }

    if (!weight) {
      res.status(422).json({ message: 'The weight field is required!' });
      return;
    } else {
      updatedData.weight = weight
    }

    if (!color) {
      res.status(422).json({ message: 'The color field is required!' });
      return;
    } else {
      updatedData.color = color
    }

    if (typeof images !== 'undefined' && images.length === 0) {
      res.status(422).json({ message: 'The image field is required!' });
      return;
    } else {
      updatedData.images = []
      images.map((image) => {
        updatedData.images.push(image.filename)
      })
    }

    await Pet.findByIdAndUpdate(id, updatedData)

    res.status(200).json({message: 'Pet successfully updated!'})
  }

  static async schedule(req, res) {
    const id = req.params.id

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: 'Pet not found!' });
      return
    }

    // check if logged in user registered the pet
    const token = getToken(req)
    const user = await getUserByToken(token)
    if (pet.user._id.equals(user._id)) {
      res.status(422).json({message: "You can't schedule a visit for your own pet!"})
      return
    }

    // check if user has already scheduled a visit
    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: "You've already scheduled a visit to this pet!"
        })
        return
      }
    }

    // add user to pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image
    }
    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({message: `Visit succesfully scheduled, contact ${pet.user.name} by his phone ${pet.user.phone}`})
  }


  static async concludeAdoption(req, res) {
    const id = req.params.id

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: 'Pet not found!' });
      return
    }

    // check if logged in user registered the pet
    const token = getToken(req)
    const user = await getUserByToken(token)
    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({message: "There was an error processing your request, please try again later!"})
      console.log("Logged user cannot update this pet!")
      return
    }
    
    pet.available = false
    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({pet: pet, message: 'Congrats! The adoption cycle has concluded succesfully!'})
  }
};
