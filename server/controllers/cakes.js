const Cake = require('../models/Cake');

const timeout = process.env.API_DELAY;

function createCake (req, res) {
  setTimeout(() => {
    const cake = new Cake(req.body);
    cake.save()
      .then((cake) => res.status(201).json(cake))
      .catch((err) => res.status(400).send())

  }, timeout)

}

function readCakes (req, res) {
  setTimeout(() => {
    cake.find({})
      .then((cakes) => res.status(200).json(cakes))
      .catch((err) => res.status(404).send())

  }, timeout)
}

function updateCake (req, res) {
  setTimeout(() => {
    cake.findByIdAndUpdate(req.body._id, req.body)
      .then((cake) => res.status(200).json(cake))
      .catch((err) => res.status(404).send())

  }, timeout)
}

function deleteCake (req, res) {
  setTimeout(() => {
    cake.findByIdAndRemove(req.params.id)
      .then((cake) => res.status(200).json(cake))
      .catch((err) => res.status(404).send())

  }, timeout)
}

module.exports = {
  createCake,
  readCakes,
  updateCake,
  deleteCake
};
