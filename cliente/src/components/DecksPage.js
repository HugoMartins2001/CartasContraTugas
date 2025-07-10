import React, { useState } from 'react';
import '../styles/DecksPage.css';

const DecksPage = () => {
  const [selectedDeck, setSelectedDeck] = useState('base');

  const decks = [
    {
      id: 'base',
      name: '🇵🇹 Baralho Base',
      description: 'O baralho principal com humor português clássico',
      cardCount: { black: 150, white: 350 },
      status: 'active',
      themes: ['Cultura Portuguesa', 'Política', 'Celebridades', 'Vida Quotidiana']
    },
    {
      id: 'internet',
      name: '🌐 Geração Internet',
      description: 'Memes, influencers e cultura digital moderna',
      cardCount: { black: 75, white: 200 },
      status: 'active',
      themes: ['Memes', 'Redes Sociais', 'YouTubers', 'TikTok']
    },
    {
      id: 'retro',
      name: '📺 Nostalgia Anos 90/2000',
      description: 'Referências nostálgicas dos anos dourados',
      cardCount: { black: 50, white: 150 },
      status: 'coming_soon',
      themes: ['TV', 'Música', 'Tecnologia Antiga', 'Celebridades Retro']
    },
    {
      id: 'regional',
      name: '🏘️ Regionalismos',
      description: 'Humor específico das diferentes regiões portuguesas',
      cardCount: { black: 40, white: 120 },
      status: 'coming_soon',
      themes: ['Norte', 'Centro', 'Sul', 'Ilhas']
    }
  ];

  const sampleCards = {
    base: {
      black: [
        "O que é que falta à minha vida para ser completa?",
        "A nova tendência do TikTok é _____ com _____.",
        "O Cristiano Ronaldo fica mesmo irritado com _____.",
        "Se eu fosse presidente, a minha primeira medida seria _____."
      ],
      white: [
        "Pastéis de nata frios",
        "A fila do Continente",
        "Falar mal dos vizinhos",
        "O preço da gasolina",
        "A RTP1 às 3 da manhã",
        "Comentários do Facebook",
        "Bifanas de plástico",
        "A música pimba"
      ]
    },
    internet: {
      black: [
        "O último vídeo viral do YouTube foi sobre _____.",
        "A nova trend do Instagram é postar fotos com _____.",
        "O que é que todos os influencers fingem que gostam?",
        "A próxima rede social vai ser baseada em _____."
      ],
      white: [
        "Stories às 3 da manhã",
        "Filtros do Instagram",
        "Comentários tóxicos",
        "Lives intermináveis",
        "Hashtags desnecessárias",
        "Unboxing videos",
        "Dance challenges",
        "Sponsored content"
      ]
    }
  };

  return (
    <div className="decks-page">
      <div className="page-hero">
        <h1>🃏 Baralhos</h1>
        <p className="page-subtitle">
          Descobre todos os baralhos disponíveis e as suas cartas!
        </p>
      </div>

      <div className="decks-overview">
        <div className="total-stats">
          <div className="stat-card">
            <span className="stat-icon">🖤</span>
            <div className="stat-info">
              <span className="stat-number">315</span>
              <span className="stat-label">Cartas Pretas</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🤍</span>
            <div className="stat-info">
              <span className="stat-number">820</span>
              <span className="stat-label">Cartas Brancas</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🎭</span>
            <div className="stat-info">
              <span className="stat-number">∞</span>
              <span className="stat-label">Combinações</span>
            </div>
          </div>
        </div>
      </div>

      <div className="decks-container">
        <div className="decks-sidebar">
          <h3>📚 Baralhos Disponíveis</h3>
          <div className="decks-list">
            {decks.map(deck => (
              <div 
                key={deck.id}
                className={`deck-item ${selectedDeck === deck.id ? 'active' : ''} ${deck.status === 'coming_soon' ? 'coming-soon' : ''}`}
                onClick={() => deck.status === 'active' && setSelectedDeck(deck.id)}
              >
                <div className="deck-header">
                  <h4>{deck.name}</h4>
                  {deck.status === 'coming_soon' && (
                    <span className="coming-soon-badge">Em Breve</span>
                  )}
                </div>
                <p className="deck-description">{deck.description}</p>
                <div className="deck-stats">
                  <span>{deck.cardCount.black} pretas</span>
                  <span>{deck.cardCount.white} brancas</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="deck-details">
          {decks.filter(d => d.id === selectedDeck).map(deck => (
            <div key={deck.id} className="deck-content">
              <div className="deck-info">
                <h2>{deck.name}</h2>
                <p className="deck-description">{deck.description}</p>
                
                <div className="deck-metrics">
                  <div className="metric">
                    <span className="metric-label">🖤 Cartas Pretas:</span>
                    <span className="metric-value">{deck.cardCount.black}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">🤍 Cartas Brancas:</span>
                    <span className="metric-value">{deck.cardCount.white}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">🎯 Status:</span>
                    <span className={`metric-value status-${deck.status}`}>
                      {deck.status === 'active' ? '✅ Ativo' : '🔜 Em Breve'}
                    </span>
                  </div>
                </div>

                <div className="deck-themes">
                  <h4>🏷️ Temas Incluídos:</h4>
                  <div className="themes-list">
                    {deck.themes.map(theme => (
                      <span key={theme} className="theme-tag">{theme}</span>
                    ))}
                  </div>
                </div>
              </div>

              {sampleCards[deck.id] && (
                <div className="sample-cards">
                  <h3>📋 Exemplos de Cartas</h3>
                  
                  <div className="cards-section">
                    <h4>🖤 Cartas Pretas (Situações)</h4>
                    <div className="cards-grid black-cards">
                      {sampleCards[deck.id].black.map((card, index) => (
                        <div key={index} className="sample-card black-card">
                          <div className="card-content">
                            <p>{card}</p>
                          </div>
                          <div className="card-footer">
                            <span className="card-type">Carta Preta</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="cards-section">
                    <h4>🤍 Cartas Brancas (Respostas)</h4>
                    <div className="cards-grid white-cards">
                      {sampleCards[deck.id].white.map((card, index) => (
                        <div key={index} className="sample-card white-card">
                          <div className="card-content">
                            <p>{card}</p>
                          </div>
                          <div className="card-footer">
                            <span className="card-type">Carta Branca</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {deck.status === 'coming_soon' && (
                <div className="coming-soon-section">
                  <div className="coming-soon-content">
                    <h3>🚧 Em Desenvolvimento</h3>
                    <p>
                      Este baralho está a ser desenvolvido e será lançado em breve! 
                      Estamos a trabalhar para trazer-te o melhor humor português.
                    </p>
                    <div className="progress-info">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: deck.id === 'retro' ? '60%' : '30%' }}></div>
                      </div>
                      <span className="progress-text">
                        {deck.id === 'retro' ? '60%' : '30%'} concluído
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="contribute-section">
        <h2>🤝 Contribuir com Cartas</h2>
        <div className="contribute-content">
          <p>
            Tens ideias para novas cartas hilariantes? Queremos ouvir-te! 
            As melhores sugestões serão incluídas nos próximos baralhos.
          </p>
          
          <div className="contribute-guidelines">
            <h3>📝 Diretrizes para Cartas</h3>
            <div className="guidelines-grid">
              <div className="guideline">
                <span className="guideline-icon">✅</span>
                <div>
                  <strong>Humor Português</strong>
                  <p>Referências culturais e expressões que todos os tugas percebem</p>
                </div>
              </div>
              <div className="guideline">
                <span className="guideline-icon">✅</span>
                <div>
                  <strong>Originalidade</strong>
                  <p>Evita copiar cartas de outros jogos ou memes óbvios</p>
                </div>
              </div>
              <div className="guideline">
                <span className="guideline-icon">✅</span>
                <div>
                  <strong>Adequado ao Contexto</strong>
                  <p>Humor adulto mas sempre respeitoso dentro do absurdo</p>
                </div>
              </div>
              <div className="guideline">
                <span className="guideline-icon">✅</span>
                <div>
                  <strong>Facilmente Entendível</strong>
                  <p>Evita referências muito específicas ou obscuras</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contribute-actions">
            <button className="contribute-btn primary">
              💡 Sugerir Carta Preta
            </button>
            <button className="contribute-btn primary">
              💭 Sugerir Carta Branca
            </button>
            <button className="contribute-btn secondary">
              📧 Contactar Equipa
            </button>
          </div>
        </div>
      </div>

      <div className="expansion-roadmap">
        <h2>🗺️ Roadmap de Expansões</h2>
        <div className="roadmap-timeline">
          <div className="timeline-item completed">
            <div className="timeline-marker">✅</div>
            <div className="timeline-content">
              <h4>Baralho Base</h4>
              <p>500 cartas com o melhor humor português</p>
              <span className="timeline-date">Lançado</span>
            </div>
          </div>
          <div className="timeline-item completed">
            <div className="timeline-marker">✅</div>
            <div className="timeline-content">
              <h4>Geração Internet</h4>
              <p>Memes e cultura digital moderna</p>
              <span className="timeline-date">Lançado</span>
            </div>
          </div>
          <div className="timeline-item in-progress">
            <div className="timeline-marker">🔄</div>
            <div className="timeline-content">
              <h4>Nostalgia Anos 90/2000</h4>
              <p>Referências nostálgicas dos anos dourados</p>
              <span className="timeline-date">Q1 2024</span>
            </div>
          </div>
          <div className="timeline-item upcoming">
            <div className="timeline-marker">⏳</div>
            <div className="timeline-content">
              <h4>Regionalismos</h4>
              <p>Humor específico das diferentes regiões</p>
              <span className="timeline-date">Q2 2024</span>
            </div>
          </div>
          <div className="timeline-item upcoming">
            <div className="timeline-marker">💭</div>
            <div className="timeline-content">
              <h4>Profissões Portuguesas</h4>
              <p>Humor sobre trabalho e profissões típicas</p>
              <span className="timeline-date">Q3 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecksPage;
