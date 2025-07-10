// models/Player.js
class Player {
  constructor({ id, name, isHost = false }) {
    this.id = id;
    this.name = name;
    this.score = 0;
    this.hand = [];
    this.isHost = isHost;
    this.isJudge = false;
    this.hasSubmitted = false;
  }
}

module.exports = Player;
