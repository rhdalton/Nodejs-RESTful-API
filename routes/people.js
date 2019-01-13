const { Person, validate } = require('../models/person'); 
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

// Get All People, public access
router.get('/', async (req, res) => {
  const people = await Person.find().sort('name');
  res.send(people);
});

// Add new Person, is Authenticated and is Admin
router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let person = new Person({ 
    name: req.body.name,
    profession: req.body.profession
  });
  person = await person.save();
  
  res.send(person);
});

// Update Person, is Authenticated and is Admin
router.put('/:id', [auth, admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const person = await Person.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        profession: req.body.profession
    }, { new: true });

  if (!person) return res.status(404).send('The person with the given ID was not found.');
  
  res.send(person);
});

// Delete Person, is Authenticated and is Admin
router.delete('/:id', [auth, admin], async (req, res) => {
  const person = await Person.findByIdAndRemove(req.params.id);

  if (!person) return res.status(404).send('The person with the given ID was not found.');

  res.send(person);
});

module.exports = router; 