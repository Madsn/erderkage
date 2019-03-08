const express = require('express');
const router = express.Router();
const cakes = require('../controllers/cakes');

router.post('/cakes', cakes.createCake);
router.post('/cakes/like', cakes.likeCake);
router.get('/cakes', cakes.readCakes);
router.put('/cakes', cakes.updateCake);
router.delete('/cakes/:id', cakes.deleteCake);
router.get('/highscores', cakes.getHighscores);
router.get('/upcoming', cakes.getUpcoming);

router.all('/*', function (req, res) {
  res.status(404).json({message: 'Not Found!'})
});

module.exports = router;
