import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './App.css';

// Importar componentes
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import HowToPlayPage from './components/HowToPlayPage';
import DecksPage from './components/DecksPage';
import AboutPage from './components/AboutPage';
import ReportBugPage from './components/ReportBugPage';
import WaitingRoom from './components/WaitingRoom';
import GameArea from './components/GameArea';
import GameEnd from './components/GameEnd';

const socket = io("http://localhost:3001"); // endereço do back-end

function App() {
  // Estados de navegação
  const [currentPage, setCurrentPage] = useState('home'); // home, how-to-play, decks, about, report
  const [gameState, setGameState] = useState('menu'); // menu, waiting, playing, judging, game_end
  
  // Estados do jogo
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState([]);
  const [hand, setHand] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentBlackCard, setCurrentBlackCard] = useState(null);
  const [isJudge, setIsJudge] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [maxRounds, setMaxRounds] = useState(10);
  const [roundWinner, setRoundWinner] = useState(null);
  const [gameWinner, setGameWinner] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [error, setError] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissionsCount, setSubmissionsCount] = useState({ submitted: 0, total: 0 });
  
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    // Restaurar estado da sala se existir
    const savedGameState = localStorage.getItem('gameState');
    const savedRoom = localStorage.getItem('room');
    const savedPlayerName = localStorage.getItem('playerName');
    const savedIsHost = localStorage.getItem('isHost');
    
    if (savedGameState && savedRoom && savedPlayerName) {
      console.log('Restaurando estado da sala...');
      setGameState(savedGameState);
      setRoom(JSON.parse(savedRoom));
      setPlayerName(savedPlayerName);
      setIsHost(savedIsHost === 'true');
      
      // Tentar reconectar à sala
      const roomData = JSON.parse(savedRoom);
      if (roomData.code || roomData.id) {
        socket.emit('rejoin_room', { 
          playerName: savedPlayerName,
          roomCode: roomData.code || roomData.id 
        });
      }
    }
  }, []); // Deixar vazio pois só queremos executar uma vez no mount

  useEffect(() => {
    // Scroll automático do chat
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor!');
    });

    socket.on('room_created', (data) => {
      console.log('room_created recebido:', data);
      if (data.success) {
        console.log('Room data:', data.room);
        setRoom(data.room);
        setGameState('waiting');
        setIsHost(true);
        setPlayers(data.room.players);
        
        // Salvar estado no localStorage - usar nome do player atual
        localStorage.setItem('gameState', 'waiting');
        localStorage.setItem('room', JSON.stringify(data.room));
        localStorage.setItem('playerName', data.room.players.find(p => p.isHost)?.name || 'Host');
        localStorage.setItem('isHost', 'true');
      } else {
        setError(data.error);
      }
    });

    socket.on('room_joined', (data) => {
      console.log('room_joined recebido:', data);
      if (data.success) {
        console.log('Room data:', data.room);
        setRoom(data.room);
        setGameState('waiting');
        setPlayers(data.room.players);
        setIsHost(data.player.isHost);
        
        // Salvar estado no localStorage - usar nome do player atual
        localStorage.setItem('gameState', 'waiting');
        localStorage.setItem('room', JSON.stringify(data.room));
        localStorage.setItem('playerName', data.player?.name || playerName);
        localStorage.setItem('isHost', data.player?.isHost ? 'true' : 'false');
      } else {
        setError(data.error);
      }
    });

    socket.on('player_joined', (data) => {
      setPlayers(data.players);
    });

    socket.on('player_left', (data) => {
      setPlayers(data.players);
    });

    socket.on('game_started', (data) => {
      setGameState('playing');
      setCurrentRound(data.currentRound);
      setMaxRounds(data.maxRounds);
      setCurrentBlackCard(data.currentBlackCard);
      setPlayers(data.players);
      setIsJudge(data.players.find(p => p.id === socket.id)?.isJudge || false);
      setHasSubmitted(false);
      setSubmissions([]);
      setSelectedCard(null);
    });

    socket.on('hand_updated', (data) => {
      setHand(data.hand);
    });

    socket.on('card_submitted', () => {
      setHasSubmitted(true);
      setSelectedCard(null);
    });

    socket.on('submissions_updated', (data) => {
      setSubmissionsCount(data);
    });

    socket.on('judging_phase', (data) => {
      setSubmissions(data.submissions);
      setGameState('judging');
    });

    socket.on('round_ended', (data) => {
      setRoundWinner(data.winner);
      setPlayers(data.players);
      setTimeout(() => {
        setRoundWinner(null);
      }, 3000);
    });

    socket.on('new_round', (data) => {
      setGameState('playing');
      setCurrentRound(data.currentRound);
      setCurrentBlackCard(data.currentBlackCard);
      setPlayers(data.players);
      setIsJudge(data.players.find(p => p.id === socket.id)?.isJudge || false);
      setHasSubmitted(false);
      setSubmissions([]);
      setSelectedCard(null);
    });

    socket.on('game_ended', (data) => {
      setGameState('game_end');
      setGameWinner(data.winner);
      setPlayers(data.players);
    });

    socket.on('chat_message', (data) => {
      console.log('Mensagem de chat recebida:', data);
      setChatMessages(prev => [...prev, {
        author: data.playerName,
        message: data.message,
        timestamp: new Date(data.timestamp).toLocaleTimeString(),
        type: 'user'
      }]);
    });

    socket.on('error', (data) => {
      setError(data.error);
    });

    return () => {
      socket.off('connect');
      socket.off('room_created');
      socket.off('room_joined');
      socket.off('player_joined');
      socket.off('player_left');
      socket.off('game_started');
      socket.off('hand_updated');
      socket.off('card_submitted');
      socket.off('submissions_updated');
      socket.off('judging_phase');
      socket.off('round_ended');
      socket.off('new_round');
      socket.off('game_ended');
      socket.off('chat_message');
      socket.off('error');
    };
  }, [playerName]);

  // Funções do jogo
  const submitCard = () => {
    console.log('🎯 submitCard chamado, selectedCard:', selectedCard);
    if (selectedCard !== null) {
      console.log('🎯 Enviando submit_card com cardIndex:', selectedCard);
      socket.emit('submit_card', { cardIndex: selectedCard });
    }
  };

  const judgeWinner = (winnerId) => {
    socket.emit('judge_winner', { winnerId });
  };

  const sendChatMessage = () => {
    console.log('sendChatMessage chamado, chatInput:', chatInput);
    if (chatInput.trim()) {
      console.log('Enviando mensagem:', chatInput.trim());
      socket.emit('send_message', { message: chatInput.trim() });
      setChatInput('');
    } else {
      console.log('Chat input vazio');
    }
  };

  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentPage('home');
    setPlayerName('');
    setRoomCode('');
    setRoom(null);
    setPlayers([]);
    setHand([]);
    setSelectedCard(null);
    setCurrentBlackCard(null);
    setIsJudge(false);
    setSubmissions([]);
    setCurrentRound(0);
    setRoundWinner(null);
    setGameWinner(null);
    setChatMessages([]);
    setError('');
    setIsHost(false);
    setHasSubmitted(false);
    
    // Limpar localStorage
    localStorage.removeItem('gameState');
    localStorage.removeItem('room');
    localStorage.removeItem('playerName');
    localStorage.removeItem('isHost');
    
    socket.disconnect();
    socket.connect();
  };

  // Funções de navegação
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Funções para criar e entrar em salas
  const handleCreateRoom = (maxRounds) => {
    console.log('App.handleCreateRoom chamado com maxRounds:', maxRounds);
    console.log('playerName atual:', playerName);
    
    if (!playerName.trim()) {
      console.log('Nome vazio, mostrando erro');
      setError('Nome é obrigatório para criar uma sala');
      return;
    }
    
    console.log('Emitindo create_room para o socket...');
    try {
      socket.emit('create_room', { 
        playerName: playerName.trim(), 
        maxRounds: maxRounds || 10 
      });
      console.log('create_room emitido com sucesso');
    } catch (error) {
      console.error('Erro ao emitir create_room:', error);
      setError('Erro ao conectar com o servidor: ' + error.message);
    }
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      setError('Nome é obrigatório para entrar numa sala');
      return;
    }
    if (!roomCode.trim()) {
      setError('Código da sala é obrigatório');
      return;
    }
    socket.emit('join_room', { 
      playerName: playerName.trim(), 
      roomCode: roomCode.trim() 
    });
  };

  // Renderização das páginas do menu
  const renderMenuContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            playerName={playerName}
            setPlayerName={setPlayerName}
            roomCode={roomCode}
            setRoomCode={setRoomCode}
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
            error={error}
          />
        );
      case 'how-to-play':
        return <HowToPlayPage />;
      case 'decks':
        return <DecksPage />;
      case 'about':
        return <AboutPage />;
      case 'report':
        return <ReportBugPage />;
      default:
        return (
          <HomePage
            playerName={playerName}
            setPlayerName={setPlayerName}
            roomCode={roomCode}
            setRoomCode={setRoomCode}
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
            error={error}
          />
        );
    }
  };

  // Renderização principal
  return (
    <div className="app">
      {/* Mensagem de erro global */}
      {error && (
        <div className="global-error">
          <div className="error-message">
            <span className="error-icon">🚨</span>
            <span>{error}</span>
            <button 
              className="close-error"
              onClick={() => setError('')}
              aria-label="Fechar erro"
            >
              ❌
            </button>
          </div>
        </div>
      )}

      {/* Navegação - mostrada apenas no menu */}
      {gameState === 'menu' && (
        <Navigation 
          currentPage={currentPage} 
          onPageChange={handlePageChange} 
          gameState={gameState} 
        />
      )}

      {/* Conteúdo principal baseado no estado do jogo */}
      {gameState === 'menu' && renderMenuContent()}
      
      {gameState === 'waiting' && (
        <WaitingRoom
          room={room}
          players={players}
          isHost={isHost}
          onStartGame={() => {
            const code = room?.code || room?.id;
            console.log('Tentando iniciar jogo...');
            console.log('Room atual:', room);
            console.log('Código da sala:', code);
            console.log('É host?', isHost);
            console.log('Número de jogadores:', players.length);
            
            if (!code) {
              console.error('Código da sala não encontrado');
              setError('Erro: código da sala não encontrado');
              return;
            }
            
            if (!isHost) {
              console.error('Não é host');
              setError('Apenas o host pode iniciar o jogo');
              return;
            }
            
            if (players.length < 3) {
              console.error('Poucos jogadores');
              setError('Mínimo 3 jogadores necessários');
              return;
            }
            
            console.log('Emitindo start_game...');
            socket.emit('start_game', { roomCode: code });
          }}
          onLeaveRoom={resetGame}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          onSendMessage={sendChatMessage}
          handleChatKeyPress={handleChatKeyPress}
        />
      )}

      {(gameState === 'playing' || gameState === 'judging') && (
        <GameArea
          gameState={gameState}
          currentBlackCard={currentBlackCard}
          hand={hand}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          onSubmitCard={submitCard}
          submissions={submissions}
          onSelectWinner={judgeWinner}
          isJudge={isJudge}
          hasSubmitted={hasSubmitted}
          players={players}
          currentRound={currentRound}
          maxRounds={maxRounds}
          roundWinner={roundWinner}
          submissionsCount={submissionsCount}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          onSendMessage={sendChatMessage}
          handleChatKeyPress={handleChatKeyPress}
          socket={socket}
          room={room}
        />
      )}

      {gameState === 'game_end' && (
        <GameEnd
          gameWinner={gameWinner}
          players={players}
          onPlayAgain={resetGame}
        />
      )}
    </div>
  );
}

export default App;
