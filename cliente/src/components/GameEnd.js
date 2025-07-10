import React from 'react';

const GameEnd = ({ 
  gameWinner, 
  players, 
  room, 
  onPlayAgain, 
  onBackToHome 
}) => {
  const sortedPlayers = players.sort((a, b) => (b.score || 0) - (a.score || 0));
  const podium = sortedPlayers.slice(0, 3);

  const getPodiumIcon = (position) => {
    switch (position) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '🏅';
    }
  };

  const getPodiumClass = (position) => {
    switch (position) {
      case 0: return 'gold';
      case 1: return 'silver';
      case 2: return 'bronze';
      default: return '';
    }
  };

  return (
    <div className="game-end">
      <div className="celebration-header">
        <div className="confetti">🎉</div>
        <h1 className="game-over-title">
          🏆 Fim de Jogo!
        </h1>
        <div className="confetti">🎊</div>
      </div>

      <div className="winner-announcement">
        <div className="winner-card">
          <div className="winner-crown">👑</div>
          <h2 className="winner-name">{gameWinner?.name}</h2>
          <p className="winner-subtitle">É o Grande Vencedor!</p>
          <div className="winner-score">
            <span className="score-label">Pontuação Final:</span>
            <span className="score-value">{gameWinner?.score || 0} pontos</span>
          </div>
        </div>
      </div>

      <div className="podium-section">
        <h3>🏆 Pódio dos Campeões</h3>
        <div className="podium">
          {podium.map((player, index) => (
            <div key={player.id} className={`podium-place ${getPodiumClass(index)}`}>
              <div className="podium-rank">
                <span className="rank-icon">{getPodiumIcon(index)}</span>
                <span className="rank-number">{index + 1}º</span>
              </div>
              <div className="podium-player">
                <div className="player-avatar">
                  {index === 0 ? '👑' : '🎭'}
                </div>
                <div className="player-info">
                  <span className="player-name">{player.name}</span>
                  <span className="player-score">{player.score || 0} pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="full-results">
        <h3>📊 Classificação Completa</h3>
        <div className="results-table">
          <div className="table-header">
            <span>Posição</span>
            <span>Jogador</span>
            <span>Pontos</span>
            <span>Percentagem</span>
          </div>
          {sortedPlayers.map((player, index) => {
            const maxScore = sortedPlayers[0]?.score || 1;
            const percentage = Math.round(((player.score || 0) / maxScore) * 100);
            
            return (
              <div key={player.id} className={`table-row ${index === 0 ? 'winner-row' : ''}`}>
                <span className="position">
                  {getPodiumIcon(index)} {index + 1}º
                </span>
                <span className="player-name">{player.name}</span>
                <span className="score">{player.score || 0}</span>
                <span className="percentage">
                  <div className="percentage-bar">
                    <div 
                      className="percentage-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="game-stats">
        <h3>📈 Estatísticas do Jogo</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">🎮</span>
            <span className="stat-value">{room.maxRounds}</span>
            <span className="stat-label">Rondas Jogadas</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">👥</span>
            <span className="stat-value">{players.length}</span>
            <span className="stat-label">Jogadores</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🃏</span>
            <span className="stat-value">{players.length * room.maxRounds}</span>
            <span className="stat-label">Cartas Jogadas</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">😂</span>
            <span className="stat-value">∞</span>
            <span className="stat-label">Gargalhadas</span>
          </div>
        </div>
      </div>

      <div className="fun-facts">
        <h3>🎭 Factos Divertidos</h3>
        <div className="facts-list">
          <div className="fact-item">
            🎯 <strong>{gameWinner?.name}</strong> dominou o jogo com {gameWinner?.score} pontos!
          </div>
          {sortedPlayers[0]?.score > 0 && sortedPlayers[sortedPlayers.length - 1]?.score !== undefined && (
            <div className="fact-item">
              📊 Diferença entre o 1º e último: {(sortedPlayers[0]?.score || 0) - (sortedPlayers[sortedPlayers.length - 1]?.score || 0)} pontos
            </div>
          )}
          <div className="fact-item">
            🤔 Este jogo gerou risadas suficientes para alegrar uma cidade inteira!
          </div>
          <div className="fact-item">
            💭 "{gameWinner?.name} provou ser um verdadeiro mestre da comédia!"
          </div>
        </div>
      </div>

      <div className="game-actions">
        <button 
          onClick={onPlayAgain}
          className="btn-play-again"
        >
          <span className="btn-icon">🔄</span>
          Jogar Novamente
        </button>
        
        <button 
          onClick={onBackToHome}
          className="btn-back-home"
        >
          <span className="btn-icon">🏠</span>
          Voltar ao Início
        </button>
      </div>

      <div className="share-section">
        <h3>📱 Partilha a Diversão!</h3>
        <p>Conta aos teus amigos sobre este jogo épico!</p>
        <div className="share-buttons">
          <button className="share-btn facebook">📘 Facebook</button>
          <button className="share-btn twitter">🐦 Twitter</button>
          <button className="share-btn whatsapp">💚 WhatsApp</button>
        </div>
      </div>
    </div>
  );
};

export default GameEnd;
