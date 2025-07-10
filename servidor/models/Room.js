// models/Room.js
class Room {
  constructor({ id, hostId, hostName, blackCards, whiteCards }) {
    this.id = id;
    this.code = id; // Adicionar code como alias para id
    this.hostId = hostId;
    this.players = new Map();
    this.gameState = 'waiting';
    this.currentRound = 0;
    this.maxRounds = 10;
    this.currentJudge = null;
    this.currentBlackCard = null;
    this.submissions = new Map();
    this.roundWinner = null;
    this.blackCardDeck = [...blackCards];
    this.whiteCardDeck = [...whiteCards];
    this.usedBlackCards = [];
    this.usedWhiteCards = [];
    this.createdAt = new Date();
  }
}

module.exports = Room;
