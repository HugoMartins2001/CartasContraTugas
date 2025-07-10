import React, { useState } from 'react';
import '../styles/HomePage.css';

const HomePage = ({ 
  playerName, 
  setPlayerName, 
  roomCode, 
  setRoomCode, 
  onCreateRoom, 
  onJoinRoom, 
  error 
}) => {
  const [maxRounds, setMaxRounds] = useState(10);

  const handleCreateRoom = () => {
    console.log('handleCreateRoom chamado');
    console.log('playerName:', playerName);
    console.log('maxRounds:', maxRounds);
    console.log('onCreateRoom:', typeof onCreateRoom);
    
    if (!playerName.trim()) {
      alert('Por favor, insere o teu nome!');
      return;
    }
    
    try {
      console.log('Tentando chamar onCreateRoom...');
      onCreateRoom(maxRounds);
      console.log('onCreateRoom chamado com sucesso');
    } catch (error) {
      console.error('Erro ao chamar onCreateRoom:', error);
      alert('Erro ao criar sala: ' + error.message);
    }
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      alert('Por favor, insere o teu nome!');
      return;
    }
    if (!roomCode.trim()) {
      alert('Por favor, insere o código da sala!');
      return;
    }
    onJoinRoom();
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="emoji">🃏</span> Cartas Contra Tugas
          </h1>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Cartas Hilariantes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Diversão Garantida</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">18+</span>
              <span className="stat-label">Só para Adultos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="game-setup">
        <div className="setup-card">
          <h2>🎮 Começar a Jogar</h2>
          
          {error && (
            <div className="error-message animate-shake">
              ⚠️ {error}
            </div>
          )}

          <div className="input-group">
            <label htmlFor="playerName">👤 Nome do jogador:</label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Digite o teu nome..."
              className="player-input"
              maxLength={20}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateRoom()}
            />
            {!playerName.trim() && (
              <div className="warning-message">
                <span className="warning-icon">⚠️</span>
                <span>Nome é obrigatório para jogar</span>
              </div>
            )}
          </div>

          <div className="game-options">
            <div className="option-section">
              <h3>🆕 Criar Nova Sala</h3>
              <div className="input-group">
                <label htmlFor="maxRounds">🏆 Número de rondas:</label>
                <select
                  id="maxRounds"
                  value={maxRounds}
                  onChange={(e) => setMaxRounds(parseInt(e.target.value))}
                  className="rounds-select"
                >
                  <option value={5}>5 rondas (Rápido)</option>
                  <option value={10}>10 rondas (Normal)</option>
                  <option value={15}>15 rondas (Épico)</option>
                  <option value={20}>20 rondas (Maratona)</option>
                </select>
              </div>
              <div className="action-buttons">
                <button 
                  onClick={handleCreateRoom}
                  className="btn-primary"
                  disabled={!playerName.trim()}
                >
                  🚀 Criar Sala
                </button>
              </div>
            </div>

            <div className="divider">
              <span>OU</span>
            </div>

            <div className="option-section">
              <h3>🔗 Juntar-se a Sala</h3>
              <div className="input-group">
                <label htmlFor="roomCode">🎯 Código da sala:</label>
                <input
                  id="roomCode"
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="ABCD1234"
                  className="room-input"
                  maxLength={8}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
                />
              </div>
              <div className="action-buttons">
                <button 
                  onClick={handleJoinRoom}
                  className="btn-secondary"
                  disabled={!playerName.trim() || !roomCode.trim()}
                >
                  🎪 Entrar na Sala
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>✨ Funcionalidades Incríveis</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🌐</span>
            <h3 className="feature-title">Multijogador Online</h3>
            <p className="feature-description">Joga com amigos em tempo real</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💬</span>
            <h3 className="feature-title">Chat Integrado</h3>
            <p className="feature-description">Conversa durante o jogo</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🏆</span>
            <h3 className="feature-title">Sistema de Pontuação</h3>
            <p className="feature-description">Rankings e estatísticas</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎨</span>
            <h3 className="feature-title">Design Moderno</h3>
            <p className="feature-description">Interface bonita e intuitiva</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3 className="feature-title">Responsivo</h3>
            <p className="feature-description">Funciona em qualquer dispositivo</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🇵🇹</span>
            <h3 className="feature-title">100% Português</h3>
            <p className="feature-description">Cartas e humor à tuga</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
