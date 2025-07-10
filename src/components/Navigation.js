import React from 'react';
import '../styles/Navigation.css';

const Navigation = ({ currentPage, onPageChange, gameState }) => {
  const navItems = [
    { id: 'home', label: '🏠 Início', disabled: false },
    { id: 'how-to-play', label: '📖 Como Jogar', disabled: false },
    { id: 'decks', label: '🃏 Baralhos', disabled: false },
    { id: 'about', label: '💝 Sobre', disabled: false },
    { id: 'report', label: '🐛 Reportar Bug', disabled: false }
  ];

  // Se estivermos em jogo, não mostrar navegação completa
  if (gameState === 'waiting' || gameState === 'playing') {
    return (
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <h1>🃏 Cartas Contra Tugas</h1>
          </div>
          <div className="nav-status">
            {gameState === 'waiting' && <span className="status-indicator">🟡 Aguardando jogadores...</span>}
            {gameState === 'playing' && <span className="status-indicator">🟢 Jogo em curso</span>}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="top-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>🃏 Cartas Contra Tugas</h1>
        </div>
        <div className="nav-links">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
              onClick={() => !item.disabled && onPageChange(item.id)}
              disabled={item.disabled}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
