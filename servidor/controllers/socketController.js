const { createRoom, addPlayerToRoom, rooms } = require("./roomController");
const Player = require("../models/Player");
const { startNewRound, dealCardsToPlayer } = require("./gameController");

// Estado do jogo global
const gameState = global.gameState;

function registerSocketEvents(io) {
  io.on("connection", (socket) => {
    console.log("Novo jogador conectado:", socket.id);

    gameState.players.set(socket.id, {
      id: socket.id,
      name: null,
      currentRoom: null,
    });

    // Criar sala
    socket.on("create_room", (data) => {
      const { playerName, maxRounds } = data;
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      try {
        const room = createRoom(roomCode, socket.id, playerName);

        // Configurar número de rondas
        if (maxRounds && maxRounds > 0) {
          room.maxRounds = maxRounds;
        }

        // Atualizar jogador
        const player = gameState.players.get(socket.id);
        player.name = playerName;
        player.currentRoom = roomCode;

        socket.join(roomCode);

        socket.emit("room_created", {
          success: true,
          room: {
            id: roomCode,
            code: roomCode,
            name: `Sala de ${playerName}`,
            players: Array.from(room.players.values()),
            gameState: room.gameState,
            maxRounds: room.maxRounds,
          },
        });

        console.log(`Sala ${roomCode} criada por ${playerName}`);
        console.log("Room object enviado:", {
          id: roomCode,
          code: roomCode,
          name: `Sala de ${playerName}`,
          maxRounds: room.maxRounds,
        });
      } catch (error) {
        socket.emit("room_created", { success: false, error: error.message });
      }
    });

    // Entrar numa sala
    socket.on("join_room", (data) => {
      const { roomCode, playerName } = data;
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("room_joined", {
          success: false,
          error: "Sala não encontrada",
        });
        return;
      }

      if (room.gameState !== "waiting") {
        socket.emit("room_joined", {
          success: false,
          error: "Jogo já em andamento",
        });
        return;
      }

      const player = addPlayerToRoom(roomCode, socket.id, playerName);

      if (!player) {
        socket.emit("room_joined", {
          success: false,
          error: "Sala cheia ou erro interno",
        });
        return;
      }

      // Atualizar jogador
      const playerState = gameState.players.get(socket.id);
      playerState.name = playerName;
      playerState.currentRoom = roomCode;

      socket.join(roomCode);

      socket.emit("room_joined", {
        success: true,
        room: {
          id: roomCode,
          code: roomCode,
          name: `Sala de ${
            Array.from(room.players.values()).find((p) => p.isHost)?.name ||
            "Host"
          }`,
          players: Array.from(room.players.values()),
          gameState: room.gameState,
          maxRounds: room.maxRounds,
        },
        player: player,
      });

      // Notificar outros jogadores
      socket.to(roomCode).emit("player_joined", {
        player: player,
        players: Array.from(room.players.values()),
      });

      console.log(`${playerName} entrou na sala ${roomCode}`);
    });

    // Reentrar numa sala (após F5 ou reconnect)
    socket.on("rejoin_room", (data) => {
      const { playerName, roomCode } = data;
      console.log(`Tentativa de reconexão: ${playerName} na sala ${roomCode}`);

      const room = rooms.get(roomCode);
      if (!room) {
        console.log("Sala não encontrada para reconexão");
        socket.emit("room_joined", {
          success: false,
          error: "Sala não encontrada",
        });
        return;
      }

      // Verificar se o jogador já estava na sala
      let existingPlayer = null;
      for (const [playerId, player] of room.players) {
        if (player.name === playerName) {
          existingPlayer = { id: playerId, ...player };
          break;
        }
      }

      if (existingPlayer) {
        console.log("Jogador encontrado, reconectando...");

        // Remover o jogador antigo e adicionar com novo socket id
        room.players.delete(existingPlayer.id);

        // Manter as propriedades originais, especialmente isHost
        const player = new Player({
          id: socket.id,
          name: playerName,
          isHost: existingPlayer.isHost || false,
        });

        room.players.set(socket.id, player);

        // Atualizar gameState
        gameState.players.set(socket.id, {
          id: socket.id,
          name: playerName,
          currentRoom: roomCode,
        });

        socket.join(roomCode);

        socket.emit("room_joined", {
          success: true,
          room: {
            id: roomCode,
            code: roomCode,
            name: `Sala de ${
              Array.from(room.players.values()).find((p) => p.isHost)?.name ||
              "Host"
            }`,
            players: Array.from(room.players.values()),
            gameState: room.gameState,
            maxRounds: room.maxRounds,
          },
          player: player,
        });

        // Notificar outros jogadores sobre a reconexão
        socket.to(roomCode).emit("player_joined", {
          player: player,
          players: Array.from(room.players.values()),
        });

        console.log(
          `${playerName} reconectou à sala ${roomCode} - isHost: ${player.isHost}`
        );
      } else {
        console.log(
          "Jogador não estava na sala, redirecionando para join normal"
        );
        // Se não estava na sala, falhar
        socket.emit("room_joined", {
          success: false,
          error: "Você não estava nesta sala",
        });
      }
    });

    // Iniciar jogo
    socket.on("start_game", (data) => {
      console.log("start_game recebido:", data);
      const { roomCode } = data;

      const player = gameState.players.get(socket.id);
      console.log("Player encontrado:", player);

      if (!player || !player.currentRoom) {
        console.log("Player não encontrado ou sem sala");
        return;
      }

      const room = rooms.get(player.currentRoom);
      console.log("Room encontrada:", room ? "sim" : "não");

      if (!room) {
        console.log("Sala não encontrada");
        return;
      }

      const roomPlayer = room.players.get(socket.id);
      console.log("Room player encontrado:", roomPlayer);
      console.log("É host?", roomPlayer?.isHost);

      if (!roomPlayer || !roomPlayer.isHost) {
        console.log("Não é host ou player não encontrado na sala");
        socket.emit("error", { error: "Apenas o host pode iniciar o jogo" });
        return;
      }

      if (room.players.size < 3) {
        console.log("Menos de 3 jogadores");
        socket.emit("error", { error: "Mínimo 3 jogadores necessários" });
        return;
      }

      startNewRound(room);

      io.to(player.currentRoom).emit("game_started", {
        gameState: room.gameState,
        currentRound: room.currentRound,
        maxRounds: room.maxRounds,
        currentJudge: room.currentJudge,
        currentBlackCard: room.currentBlackCard,
        players: Array.from(room.players.values()),
      });

      // Enviar cartas para cada jogador
      room.players.forEach((roomPlayer, playerId) => {
        io.to(playerId).emit("hand_updated", { hand: roomPlayer.hand });
      });

      console.log(`Jogo iniciado na sala ${player.currentRoom}`);
    });

    // Submeter carta
    socket.on("submit_card", (data) => {
      const { cardIndex } = data;
      const player = gameState.players.get(socket.id);
      if (!player || !player.currentRoom) return;

      const room = rooms.get(player.currentRoom);
      if (!room || room.gameState !== "playing") return;

      const roomPlayer = room.players.get(socket.id);
      if (!roomPlayer || roomPlayer.isJudge || roomPlayer.hasSubmitted) return;

      if (cardIndex < 0 || cardIndex >= roomPlayer.hand.length) return;

      const submittedCard = roomPlayer.hand.splice(cardIndex, 1)[0];
      console.log(
        "🎯 Carta submetida pelo jogador",
        roomPlayer.name + ":",
        submittedCard
      );

      room.submissions.set(socket.id, {
        playerId: socket.id,
        playerName: roomPlayer.name,
        card: submittedCard,
      });

      roomPlayer.hasSubmitted = true;

      // Dar nova carta ao jogador
      dealCardsToPlayer(room, socket.id);

      socket.emit("hand_updated", { hand: roomPlayer.hand });
      socket.emit("card_submitted", { success: true });

      // Verificar se todos submeteram
      const nonJudgePlayers = Array.from(room.players.values()).filter(
        (p) => !p.isJudge
      );
      const allSubmitted = nonJudgePlayers.every((p) => p.hasSubmitted);

      if (allSubmitted) {
        room.gameState = "judging";

        // Enviar cartas submetidas para o juiz
        const submissions = Array.from(room.submissions.values()).map((s) => ({
          id: s.playerId,
          playerName: s.playerName,
          card: s.card,
          text: s.card, // Para compatibilidade com a renderização
        }));

        console.log("🎯 Submissions enviadas para o juiz:", submissions);

        io.to(player.currentRoom).emit("judging_phase", {
          gameState: room.gameState,
          submissions: submissions,
          judge: room.currentJudge,
        });
      } else {
        // Atualizar contagem de submissões
        io.to(player.currentRoom).emit("submissions_updated", {
          submitted: room.submissions.size,
          total: nonJudgePlayers.length,
        });
      }
    });

    // Escolher vencedor da rodada
    socket.on("judge_winner", (data) => {
      const { winnerId } = data;
      const player = gameState.players.get(socket.id);
      if (!player || !player.currentRoom) return;

      const room = rooms.get(player.currentRoom);
      if (!room || room.gameState !== "judging") return;

      const roomPlayer = room.players.get(socket.id);
      if (!roomPlayer || !roomPlayer.isJudge) return;

      const winner = room.players.get(winnerId);
      if (!winner) return;

      winner.score++;
      room.roundWinner = winnerId;
      room.gameState = "round_end";

      const winningSubmission = room.submissions.get(winnerId);

      io.to(player.currentRoom).emit("round_ended", {
        winner: {
          id: winnerId,
          name: winner.name,
          newScore: winner.score,
        },
        winningCard: winningSubmission.card,
        blackCard: room.currentBlackCard,
        players: Array.from(room.players.values()),
      });

      // Verificar fim do jogo
      if (winner.score >= 5 || room.currentRound >= room.maxRounds) {
        setTimeout(() => {
          room.gameState = "game_end";
          const finalScores = Array.from(room.players.values()).sort(
            (a, b) => b.score - a.score
          );

          io.to(player.currentRoom).emit("game_ended", {
            finalScores: finalScores,
            winner: finalScores[0],
          });
        }, 5000);
      } else {
        // Próxima rodada em 5 segundos
        setTimeout(() => {
          startNewRound(room);

          io.to(player.currentRoom).emit("new_round", {
            gameState: room.gameState,
            currentRound: room.currentRound,
            currentJudge: room.currentJudge,
            currentBlackCard: room.currentBlackCard,
            players: Array.from(room.players.values()),
          });

          // Enviar cartas atualizadas
          room.players.forEach((roomPlayer, playerId) => {
            io.to(playerId).emit("hand_updated", { hand: roomPlayer.hand });
          });
        }, 5000);
      }
    });

    // Chat
    socket.on("send_message", (data) => {
      const { message } = data;
      console.log(`Mensagem recebida de ${socket.id}: ${message}`);

      const player = gameState.players.get(socket.id);
      console.log("Player encontrado:", player);

      if (!player || !player.currentRoom || !player.name) {
        console.log("Player inválido para chat");
        return;
      }

      const chatMessage = {
        id: uuidv4(),
        playerId: socket.id,
        playerName: player.name,
        message: message,
        timestamp: new Date(),
      };

      console.log("Enviando mensagem para sala:", player.currentRoom);
      io.to(player.currentRoom).emit("chat_message", chatMessage);
    });

    // Desconexão
    socket.on("disconnect", () => {
      console.log("Jogador desconectado:", socket.id);

      const player = gameState.players.get(socket.id);
      if (player && player.currentRoom) {
        const room = rooms.get(player.currentRoom);
        if (room) {
          room.players.delete(socket.id);

          // Se era o host, transferir para outro jogador
          if (room.players.size > 0) {
            const remainingPlayers = Array.from(room.players.values());
            if (!remainingPlayers.some((p) => p.isHost)) {
              remainingPlayers[0].isHost = true;
              room.hostId = remainingPlayers[0].id;
            }

            socket.to(player.currentRoom).emit("player_left", {
              playerId: socket.id,
              players: Array.from(room.players.values()),
            });
          } else {
            // Sala vazia, remover
            rooms.delete(player.currentRoom);
          }
        }
      }

      gameState.players.delete(socket.id);
    });
  });
}

module.exports = { registerSocketEvents };
