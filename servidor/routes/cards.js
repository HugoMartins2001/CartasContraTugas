// routes/cards.js
const express = require('express');
const router = express.Router();
const { blackCards, whiteCards } = require('../data/cards');
const Baralho = require('../models/Baralho');

//trocar para ir buscar a base de dados em vez de ir ao data/cards.js

router.get('/black', (req, res) => {
  res.json(blackCards);
});

router.get('/white', (req, res) => {
  res.json(whiteCards);
});

module.exports = router;
