// Função para iniciar uma nova rodada
function startNewRound(room) {
  console.log('Iniciando nova rodada...');
  
  // Limpar submissions da rodada anterior
  room.submissions.clear();
  
  // Incrementar rodada
  room.currentRound++;
  console.log(`Rodada ${room.currentRound}/${room.maxRounds}`);
  
  // Escolher nova carta preta
  if (room.blackCardDeck.length === 0) {
    // Resetar deck se acabar
    room.blackCardDeck = [...room.usedBlackCards];
    room.usedBlackCards = [];
  }
  
  const blackCardIndex = Math.floor(Math.random() * room.blackCardDeck.length);
  room.currentBlackCard = room.blackCardDeck.splice(blackCardIndex, 1)[0];
  room.usedBlackCards.push(room.currentBlackCard);
  
  console.log('🃏 Nova carta preta selecionada:', room.currentBlackCard);
  console.log('🃏 Tipo da carta preta:', typeof room.currentBlackCard);
  
  // Escolher próximo juiz
  const players = Array.from(room.players.values());
  let nextJudgeIndex = 0;
  
  if (room.currentJudge) {
    const currentJudgeIndex = players.findIndex(p => p.id === room.currentJudge);
    nextJudgeIndex = (currentJudgeIndex + 1) % players.length;
  }
  
  // Limpar flags de juiz anterior
  players.forEach(p => p.isJudge = false);
  
  // Definir novo juiz
  players[nextJudgeIndex].isJudge = true;
  room.currentJudge = players[nextJudgeIndex].id;
  console.log(`Novo juiz: ${players[nextJudgeIndex].name}`);
  
  // Dar cartas aos jogadores (exceto o juiz)
  players.forEach(player => {
    dealCardsToPlayer(room, player.id);
    player.hasSubmitted = false;
  });
  
  room.gameState = 'playing';
  console.log('Nova rodada iniciada com sucesso');
}

// Função para dar cartas a um jogador específico
function dealCardsToPlayer(room, playerId) {
  const player = room.players.get(playerId);
  if (!player || player.isJudge) return;
  
  // Completar mão até 10 cartas
  while (player.hand.length < 10 && room.whiteCardDeck.length > 0) {
    const cardIndex = Math.floor(Math.random() * room.whiteCardDeck.length);
    const card = room.whiteCardDeck.splice(cardIndex, 1)[0];
    room.usedWhiteCards.push(card);
    player.hand.push(card);
    console.log('🃏 Nova carta adicionada ao jogador', player.name + ':', card);
  }
  
  // Se o deck acabar, reembaralhar cartas usadas (implementar se necessário)
  if (room.whiteCardDeck.length === 0) {
    console.log('⚠️ Deck de cartas brancas vazio para o jogador', player.name);
    console.log('Reembaralhando cartas usadas...');
    room.whiteCardDeck = [...room.usedWhiteCards];
    room.usedWhiteCards = [];
  }
}

// Função para adicionar baralhos a room

module.exports = {
  startNewRound,
  dealCardsToPlayer
};