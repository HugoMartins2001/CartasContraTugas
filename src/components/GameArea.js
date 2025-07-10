import React, { useState, useRef, useEffect } from 'react';
import '../styles/GameArea.css';

const GameArea = ({
  room,
  players,
  hand,
  selectedCard,
  setSelectedCard,
  currentBlackCard,
  isJudge,
  submissions,
  currentRound,
  maxRounds,
  roundWinner,
  hasSubmitted,
  submissionsCount,
  onSubmitCard,
  onSelectWinner,
  chatMessages,
  chatInput,
  setChatInput,
  onSendMessage,
  onLeaveRoom
}) => {
  const [showChat, setShowChat] = useState(false);
  const [showHand, setShowHand] = useState(true);
  const chatMessagesRef = useRef(null);

  // Debug logs para verificar dados
  console.log('🎮 GameArea Debug:');
  console.log('currentBlackCard:', currentBlackCard);
  console.log('currentBlackCard type:', typeof currentBlackCard);
  console.log('currentBlackCard.text:', currentBlackCard?.text);
  console.log('hand:', hand);
  console.log('hand types:', hand?.map(card => typeof card));
  console.log('hand[0]?.text:', hand?.[0]?.text);
  console.log('submissions:', submissions);
  console.log('submissions types:', submissions?.map(submission => typeof submission));
  console.log('submissions[0]?.text:', submissions?.[0]?.text);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleCardSelect = (card) => {
    if (!isJudge && !hasSubmitted) {
      const cardIndex = hand.findIndex(handCard => handCard === card);
      setSelectedCard(selectedCard === cardIndex ? null : cardIndex);
    }
  };

  const handleSubmitCard = () => {
    if (selectedCard !== null && !hasSubmitted) {
      console.log('🎯 Submetendo carta com índice:', selectedCard);
      console.log('🎯 Carta selecionada:', hand[selectedCard]);
      onSubmitCard(selectedCard);
    }
  };

  const handleSelectWinner = (submission) => {
    if (isJudge) {
      console.log('🎯 Juiz selecionou vencedor:', submission);
      onSelectWinner(submission.id);
    }
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      onSendMessage();
    }
  };

  const getCurrentJudge = () => {
    return players.find(p => p.isJudge);
  };



  return (
    <div className="game-area">
      <div className="game-header">
        <div className="game-info">
          <h2>🎮 Ronda {currentRound + 1}/{maxRounds}</h2>
          <div className="judge-info">
            <span className="judge-icon">⚖️</span>
            <span>Juiz: <strong>{getCurrentJudge()?.name || 'A escolher...'}</strong></span>
          </div>
        </div>
        
        <div className="game-controls">
          <button 
            onClick={() => setShowChat(!showChat)}
            className={`chat-toggle-btn ${showChat ? 'active' : ''}`}
          >
            💬 Chat {chatMessages.length > 0 && !showChat && <span className="notification-dot"></span>}
          </button>
          <button onClick={onLeaveRoom} className="leave-game-btn">
            🚪 Sair
          </button>
        </div>
      </div>

      <div className={`game-content ${showChat ? 'with-chat' : ''}`}>
        <div className="main-game-area">
          {/* Status e avisos do jogo */}
          <div className="game-status">
            {!isJudge && !hasSubmitted && selectedCard === null && (
              <div className="warning-message">
                <span className="warning-icon">⚠️</span>
                <span>Escolhe uma carta da tua mão para submeter!</span>
              </div>
            )}
            
            {!isJudge && selectedCard !== null && !hasSubmitted && (
              <div className="info-message">
                <span className="info-icon">💡</span>
                <span>Carta selecionada! Clica em "Submeter" para enviar.</span>
              </div>
            )}
            
            {!isJudge && hasSubmitted && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                <span>Carta submetida! A aguardar outros jogadores...</span>
              </div>
            )}
            
            {isJudge && submissions.length > 0 && !roundWinner && (
              <div className="warning-message">
                <span className="warning-icon">⚖️</span>
                <span>Tu és o juiz! Escolhe a carta mais engraçada.</span>
              </div>
            )}
            
            {submissionsCount.submitted < submissionsCount.total && !roundWinner && (
              <div className="info-message">
                <span className="info-icon">⏳</span>
                <span>A aguardar submissions: {submissionsCount.submitted}/{submissionsCount.total}</span>
              </div>
            )}
          </div>

          {/* Carta Preta Atual */}
          <div className="black-card-section">
            <h3>🖤 Carta da Situação</h3>
            {currentBlackCard ? (
              <div className="black-card">
                <div className="card-content">
                  <p>{typeof currentBlackCard === 'string' ? currentBlackCard : currentBlackCard.text || currentBlackCard.content || "Carta da situação - texto em carregamento..."}</p>
                </div>
                <div className="card-footer">
                  <span className="card-type">Carta Preta</span>
                  {currentBlackCard.pick > 1 && (
                    <span className="pick-count">Escolhe {currentBlackCard.pick}</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="black-card loading">
                <div className="loading-content">
                  <div className="loading-spinner"></div>
                  <p>A carregar carta...</p>
                </div>
              </div>
            )}
          </div>

          {/* Submissions ou Mão do Jogador */}
          {submissions.length > 0 ? (
            <div className="submissions-section">
              <h3>
                🃏 Submissions 
                {isJudge ? ' - Escolhe a melhor!' : ` (${submissions.length})`}
              </h3>
              <div className="submissions-grid">
                {submissions.map((submission, index) => (
                  <div 
                    key={index}
                    className={`submission-card ${isJudge ? 'clickable' : ''} ${roundWinner?.submission === submission ? 'winner' : ''}`}
                    onClick={() => handleSelectWinner(submission)}
                  >
                    <div className="card-content">
                      <p>{submission.card || submission.text || submission.content || `Carta #${index + 1} - texto em carregamento...`}</p>
                    </div>
                    <div className="card-footer">
                      <span className="submission-number">#{index + 1}</span>
                      {roundWinner?.submission === submission && (
                        <span className="winner-badge">🏆 Vencedor!</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {isJudge && !roundWinner && (
                <div className="judge-instructions">
                  <p>⚖️ Tu és o juiz! Clica na carta que achas mais engraçada.</p>
                </div>
              )}
              
              {!isJudge && !roundWinner && (
                <div className="waiting-judge">
                  <div className="waiting-content">
                    <div className="waiting-spinner"></div>
                    <p>Aguardando que o juiz escolha o vencedor...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hand-section">
              <div className="hand-header">
                <h3>🎯 A tua Mão</h3>
                <div className="submission-status">
                  {isJudge ? (
                    <span className="judge-status">⚖️ Tu és o juiz desta ronda!</span>
                  ) : hasSubmitted ? (
                    <span className="submitted-status">✅ Carta submetida!</span>
                  ) : (
                    <span className="pending-status">
                      📋 Submissions: {submissionsCount.submitted}/{submissionsCount.total}
                    </span>
                  )}
                </div>
              </div>
              
              {showHand && (
                <div className="hand-cards">
                  {hand.map((card, index) => (
                    <div 
                      key={index}
                      className={`white-card ${selectedCard === index ? 'selected' : ''} ${isJudge || hasSubmitted ? 'disabled' : ''}`}
                      onClick={() => handleCardSelect(card)}
                    >
                      <div className="card-content">
                        <p>{typeof card === 'string' ? card : card.text || card.content || `Carta branca #${index + 1} - texto em carregamento...`}</p>
                      </div>
                      <div className="card-footer">
                        <span className="card-type">Carta Branca</span>
                        {selectedCard === index && <span className="selected-indicator">✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="hand-controls">
                <button 
                  onClick={() => setShowHand(!showHand)}
                  className="toggle-hand-btn"
                >
                  {showHand ? '🔽 Esconder Mão' : '🔼 Mostrar Mão'}
                </button>
                
                {!isJudge && !hasSubmitted && selectedCard !== null && (
                  <button 
                    onClick={handleSubmitCard}
                    className="submit-card-btn"
                  >
                    <span className="btn-icon">📤</span>
                    Submeter Carta
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Scoreboard */}
          <div className="scoreboard-mini">
            <h4>🏆 Pontuação</h4>
            <div className="scores-list">
              {players
                .sort((a, b) => (b.score || 0) - (a.score || 0))
                .map((player, index) => (
                  <div key={player.id} className={`score-item ${player.isJudge ? 'judge' : ''}`}>
                    <span className="position">{index + 1}º</span>
                    <span className="player-name">
                      {player.isJudge && '⚖️ '}
                      {player.name}
                    </span>
                    <span className="player-score">{player.score || 0}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Chat Lateral */}
        {showChat && (
          <div className="game-chat">
            <div className="chat-header">
              <h4>💬 Chat</h4>
              <button 
                onClick={() => setShowChat(false)}
                className="close-chat-btn"
              >
                ✕
              </button>
            </div>
            
            <div className="chat-messages" ref={chatMessagesRef}>
              {chatMessages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.type || 'user'}`}>
                  {msg.type === 'system' ? (
                    <span className="system-message">
                      🎮 {msg.message}
                    </span>
                  ) : (
                    <>
                      <span className="message-author">{msg.author}:</span>
                      <span className="message-text">{msg.message}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
            
            <div className="chat-input-container">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Mensagem..."
                className="chat-input"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                maxLength={200}
              />
              <button 
                onClick={handleSendMessage}
                className="chat-send-btn"
                disabled={!chatInput.trim()}
              >
                📤
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameArea;
