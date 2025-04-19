const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../middleware/auth'); // Autorizacija

// 🎮 Žaidimo maršrutai
// Pradėti žaidimą
router.post('/start', auth, gameController.startGame);

// Spėti raidę
router.patch('/guess', auth, gameController.guessLetter);

// Išsaugoti žaidimą
router.put('/save', auth, gameController.saveGame);

// Ištrinti žaidimą pagal ID
router.delete('/:id', auth, gameController.deleteGame);

// Gauti žaidimus su galimu query parametru (pvz. difficulty)
router.get('/', auth, gameController.getGames); // optional - su query param

module.exports = router;
