import React, { useState } from 'react';
import '../styles/WaitingRoom.css';

const WaitingRoom = ({ 
  room, 
  players, 
  isHost, 
  onStartGame, 
  onLeaveRoom,
  chatMessages,
  chatInput,
  setChatInput,
  onSendMessage,
  handleChatKeyPress
}) => {
  const [showChat, setShowChat] = useState(true);

  console.log('WaitingRoom recebeu room:', room);
  console.log('Room code:', room?.code);
  console.log('Room id:', room?.id);

  const handleSendMessage = () => {
    console.log('handleSendMessage chamado, chatInput:', chatInput);
    if (chatInput.trim()) {
      console.log('Enviando mensagem:', chatInput.trim());
      onSendMessage();
    } else {
      console.log('Mensagem vazia, não enviando');
    }
  };

  const copyRoomCode = () => {
    const code = room?.code || room?.id;
    if (room && code) {
      navigator.clipboard.writeText(code);
      // TODO: Add toast notification
      console.log('Código copiado:', code);
    } else {
      console.error('Código da sala não disponível', { room, code });
    }
  };

  return (
    <div className="waiting-room">
      <div className="room-header">
        <div className="room-info">
          <h2>🏠 Sala: {room?.name || 'Carregando...'}</h2>
          <div className="room-code" onClick={copyRoomCode}>
            <span>📋 Código: <strong>{room?.code || room?.id || 'N/A'}</strong></span>
            <small>Clica para copiar</small>
          </div>
        </div>
        
        <div className="room-settings">
          <div className="setting-item">
            <span className="setting-icon">🏆</span>
            <span>Rondas: {room?.maxRounds || 10}</span>
          </div>
          <div className="setting-item">
            <span className="setting-icon">👥</span>
            <span>Jogadores: {players.length}/8</span>
          </div>
        </div>
      </div>

      <div className="waiting-content">
        <div className="players-section">
          <h3>👥 Jogadores ({players.length})</h3>
          <div className="players-grid">
            {players.map((player, index) => (
              <div key={player.id} className={`player-card ${player.isHost ? 'host' : ''}`}>
                <div className="player-avatar">
                  {player.isHost ? '👑' : '🎭'}
                </div>
                <div className="player-info">
                  <span className="player-name">{player.name}</span>
                  {player.isHost && <span className="host-badge">HOST</span>}
                </div>
                <div className="player-status">
                  <span className="status-dot online"></span>
                </div>
              </div>
            ))}
            
            {/* Slots vazios */}
            {Array.from({ length: 8 - players.length }, (_, i) => (
              <div key={`empty-${i}`} className="player-card empty">
                <div className="player-avatar">👤</div>
                <div className="player-info">
                  <span className="player-name">Aguardando...</span>
                </div>
              </div>
            ))}
          </div>

          <div className="waiting-actions">
            {isHost ? (
              <div className="host-actions">
                <button 
                  onClick={onStartGame}
                  className="start-game-button"
                  disabled={players.length < 3}
                >
                  🚀 {players.length < 3 
                    ? `Precisas de pelo menos 3 jogadores (${3 - players.length} em falta)`
                    : 'Começar Jogo!'
                  }
                </button>
                {players.length < 8 && (
                  <p className="status-message info">
                    💡 Tip: O jogo fica mais divertido com 4-6 jogadores!
                  </p>
                )}
              </div>
            ) : (
              <div className="player-actions">
                <div className="status-message">
                  ⏳ Aguardando que o host inicie o jogo...
                </div>
              </div>
            )}
            
            <button onClick={onLeaveRoom} className="leave-room-button">
              🚪 Sair da Sala
            </button>
          </div>
        </div>

        <div className="sidebar">
          <div className="chat-section">
            <div className="chat-header">
              <h4>💬 Chat da Sala</h4>
              <button className="chat-toggle" onClick={() => setShowChat(!showChat)}>
                {showChat ? '🔽' : '🔼'}
              </button>
            </div>
            
            {showChat && (
              <>
                <div className="chat-messages">
                  {chatMessages.length === 0 ? (
                    <div className="chat-empty">
                      <div className="chat-empty-icon">💬</div>
                      <span>Ainda não há mensagens... Sê o primeiro a quebrar o gelo!</span>
                    </div>
                  ) : (
                    chatMessages.map((msg, index) => (
                      <div key={index} className="chat-message">
                        {msg.type === 'system' ? (
                          <span>🎮 {msg.message}</span>
                        ) : (
                          <span><strong>{msg.author}:</strong> {msg.message}</span>
                        )}
                      </div>
                    ))
                  )}
                </div>
                
                <div className="chat-input-container">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleChatKeyPress}
                    placeholder="Escreve uma mensagem..."
                    className="chat-input"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="send-chat-button"
                  >
                    📤
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="game-controls">
            <h4>⚙️ Controlos</h4>
            <div className="status-message">
              {isHost ? (
                "Tu és o host desta sala. Podes iniciar o jogo quando estiveres pronto!"
              ) : (
                "Aguarda que o host inicie o jogo ou convida mais amigos!"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
