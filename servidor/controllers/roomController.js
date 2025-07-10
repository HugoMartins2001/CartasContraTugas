const Room = require('../models/Room');
const Player = require('../models/Player');
const { blackCards, whiteCards } = require('../data/cards');

const rooms = new Map();

function createRoom(roomCode, hostId, hostName) {
  const room = new Room({ id: roomCode, hostId, hostName, blackCards, whiteCards });
  const host = new Player({ id: hostId, name: hostName, isHost: true });
  room.players.set(hostId, host);
  rooms.set(roomCode, room);
  return room;
}

function addPlayerToRoom(roomCode, playerId, playerName) {
  const room = rooms.get(roomCode);
  if (!room) return null;
  if (room.players.size >= 8) return null;
  const player = new Player({ id: playerId, name: playerName });
  room.players.set(playerId, player);
  return player;
}

module.exports = {
  rooms,
  createRoom,
  addPlayerToRoom
};
