// routes/rooms.js
const express = require('express');
const router = express.Router();
const { createRoom, addPlayerToRoom, rooms } = require('../controllers/roomController');

// Criar sala
router.post('/create', (req, res) => {
  const { playerName } = req.body;
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const room = createRoom(roomCode, null, playerName);
  res.json({ roomCode, room });
});

// Entrar em sala
router.post('/join', (req, res) => {
  const { roomCode, playerName } = req.body;
  const player = addPlayerToRoom(roomCode, null, playerName);
  if (!player) return res.status(400).json({ error: 'Sala cheia ou não encontrada' });
  res.json({ player });
});

// Listar salas
router.get('/', (req, res) => {
  res.json(Array.from(rooms.values()));
});

module.exports = router;
