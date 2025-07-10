import React, { useState } from 'react';
import '../styles/HowToPlay.css';

const HowToPlayPage = () => {
  const [activeTab, setActiveTab] = useState('basics');

  const tabs = [
    { id: 'basics', label: '🎯 Básico', icon: '🎯' },
    { id: 'detailed', label: '📚 Detalhado', icon: '📚' },
    { id: 'tips', label: '💡 Dicas', icon: '💡' },
    { id: 'examples', label: '🎭 Exemplos', icon: '🎭' }
  ];

  return (
    <div className="how-to-play-page">
      <div className="page-hero">
        <h1>📖 Como Jogar</h1>
        <p className="page-subtitle">
          Aprende todas as regras e estratégias para dominares o jogo!
        </p>
      </div>

      <div className="tabs-container">
        <div className="tabs-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'basics' && (
            <div className="basics-content">
              <h2>🎯 Regras Básicas</h2>
              
              <div className="rule-card">
                <h3>🏁 Objetivo do Jogo</h3>
                <p>
                  Ser o jogador com mais pontos no final! Ganhas pontos quando o juiz 
                  escolhe a tua carta como a mais engraçada da ronda.
                </p>
              </div>

              <div className="rule-card">
                <h3>👥 Número de Jogadores</h3>
                <ul>
                  <li><strong>Mínimo:</strong> 3 jogadores</li>
                  <li><strong>Ideal:</strong> 4-6 jogadores</li>
                  <li><strong>Máximo:</strong> 8 jogadores</li>
                </ul>
              </div>

              <div className="rule-card">
                <h3>🎮 Como Funciona uma Ronda</h3>
                <div className="steps-list">
                  <div className="step-item">
                    <span className="step-number">1</span>
                    <div>
                      <strong>Carta Preta é Revelada</strong>
                      <p>Uma carta com uma situação ou pergunta aparece.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <span className="step-number">2</span>
                    <div>
                      <strong>Jogadores Escolhem</strong>
                      <p>Cada jogador (exceto o juiz) escolhe uma carta branca da sua mão.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <span className="step-number">3</span>
                    <div>
                      <strong>Submissions Anónimas</strong>
                      <p>Todas as cartas são mostradas ao juiz sem revelar quem jogou o quê.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <span className="step-number">4</span>
                    <div>
                      <strong>Juiz Decide</strong>
                      <p>O juiz escolhe a combinação mais engraçada e atribui um ponto.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <span className="step-number">5</span>
                    <div>
                      <strong>Próxima Ronda</strong>
                      <p>O papel de juiz passa para o próximo jogador.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rule-card">
                <h3>⚖️ O Papel do Juiz</h3>
                <ul>
                  <li>Não joga cartas na sua vez de juiz</li>
                  <li>Lê a carta preta em voz alta (opcional)</li>
                  <li>Avalia todas as submissions anonimamente</li>
                  <li>Escolhe a combinação mais engraçada</li>
                  <li>O papel roda para o próximo jogador</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'detailed' && (
            <div className="detailed-content">
              <h2>📚 Regras Detalhadas</h2>

              <div className="rule-card">
                <h3>🃏 Tipos de Cartas</h3>
                <div className="card-types">
                  <div className="card-type">
                    <h4>🖤 Cartas Pretas</h4>
                    <ul>
                      <li>Contêm situações, perguntas ou frases incompletas</li>
                      <li>Algumas requerem múltiplas cartas brancas</li>
                      <li>Definem o contexto da ronda</li>
                    </ul>
                  </div>
                  <div className="card-type">
                    <h4>🤍 Cartas Brancas</h4>
                    <ul>
                      <li>Contêm respostas, objetos, pessoas ou conceitos</li>
                      <li>Cada jogador tem sempre 10 na mão</li>
                      <li>São repostas automaticamente após cada ronda</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rule-card">
                <h3>🎯 Sistema de Pontuação</h3>
                <ul>
                  <li><strong>1 ponto</strong> por carta escolhida pelo juiz</li>
                  <li>O juiz não ganha pontos na sua ronda</li>
                  <li>Em caso de empate, todos os empatados ganham</li>
                  <li>O primeiro a atingir o limite de rondas com mais pontos ganha</li>
                </ul>
              </div>

              <div className="rule-card">
                <h3>⏱️ Gestão de Tempo</h3>
                <ul>
                  <li>Não há limite de tempo rígido (jogo social)</li>
                  <li>Encoraja-se decisões rápidas para manter o ritmo</li>
                  <li>O juiz pode dar tempo extra se necessário</li>
                  <li>Jogadores podem conversar e reagir às cartas</li>
                </ul>
              </div>

              <div className="rule-card">
                <h3>🔄 Mecânicas Especiais</h3>
                <div className="special-mechanics">
                  <div className="mechanic">
                    <h4>🎪 Cartas Especiais</h4>
                    <p>Algumas cartas pretas podem ter instruções especiais ou requerer múltiplas respostas.</p>
                  </div>
                  <div className="mechanic">
                    <h4>🗳️ Voting System</h4>
                    <p>Em grupos grandes, pode-se usar votação em vez de um único juiz.</p>
                  </div>
                  <div className="mechanic">
                    <h4>🎭 House Rules</h4>
                    <p>Os grupos podem criar as suas próprias regras especiais.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="tips-content">
              <h2>💡 Dicas e Estratégias</h2>

              <div className="tip-category">
                <h3>🎯 Para Jogadores</h3>
                <div className="tips-grid">
                  <div className="tip-card">
                    <div className="tip-icon">🎭</div>
                    <h4>Conhece o Teu Juiz</h4>
                    <p>Adapta o teu humor ao estilo da pessoa que está a julgar. Alguns preferem trocadilhos, outros humor negro.</p>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">⚡</div>
                    <h4>Vai pela Primeira Impressão</h4>
                    <p>A primeira carta que te faz rir é geralmente uma boa escolha. Não penses demais!</p>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">🎪</div>
                    <h4>Abraça o Absurdo</h4>
                    <p>Quanto mais inesperada e absurda a combinação, melhor. O objetivo é provocar gargalhadas!</p>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">🔄</div>
                    <h4>Varia a Estratégia</h4>
                    <p>Alterna entre humor inteligente, trocadilhos e puro absurdo para manteres-te imprevisível.</p>
                  </div>
                </div>
              </div>

              <div className="tip-category">
                <h3>⚖️ Para Juízes</h3>
                <div className="tips-grid">
                  <div className="tip-card">
                    <div className="tip-icon">😂</div>
                    <h4>Segue o Riso</h4>
                    <p>Escolhe a carta que te fez rir primeiro ou mais alto. A reação espontânea é a melhor.</p>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">🎲</div>
                    <h4>Sê Imprevisível</h4>
                    <p>Não tenhas sempre o mesmo tipo de humor. Varia para manter todos a adivinharem.</p>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">🤔</div>
                    <h4>Considera o Contexto</h4>
                    <p>Pensa na situação da carta preta e qual resposta se encaixa melhor ou é mais engraçada.</p>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">⏰</div>
                    <h4>Não Demores Muito</h4>
                    <p>Uma decisão rápida mantém o jogo fluido. Se estás indeciso, vai com a primeira opção.</p>
                  </div>
                </div>
              </div>

              <div className="tip-category">
                <h3>🎮 Para o Grupo</h3>
                <div className="group-tips">
                  <div className="group-tip">
                    <h4>🤝 Estabeleçam Limites</h4>
                    <p>Acordem sobre que tipo de humor é aceitável antes de começarem a jogar.</p>
                  </div>
                  <div className="group-tip">
                    <h4>😄 Mantenham o Ambiente Leve</h4>
                    <p>Lembrem-se que é só um jogo! O objetivo é divertirem-se todos juntos.</p>
                  </div>
                  <div className="group-tip">
                    <h4>🗣️ Usem o Chat</h4>
                    <p>Reajam às cartas, comentem as jogadas e mantenham a conversa fluida.</p>
                  </div>
                  <div className="group-tip">
                    <h4>🔄 Rodem os Papéis</h4>
                    <p>Certifiquem-se que todos têm oportunidades iguais de ser juiz.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="examples-content">
              <h2>🎭 Exemplos de Jogadas</h2>

              <div className="example-card">
                <h3>📝 Exemplo 1: Jogada Simples</h3>
                <div className="example-scenario">
                  <div className="black-card-example">
                    <h4>🖤 Carta Preta:</h4>
                    <p>"O que é que sempre estraga uma primeira impressão?"</p>
                  </div>
                  <div className="white-cards-example">
                    <h4>🤍 Submissions dos Jogadores:</h4>
                    <div className="submissions-example">
                      <div className="submission">
                        <span className="player">Jogador 1:</span>
                        <span className="card">"Suores excessivos"</span>
                      </div>
                      <div className="submission">
                        <span className="player">Jogador 2:</span>
                        <span className="card">"A minha mãe"</span>
                      </div>
                      <div className="submission winner">
                        <span className="player">Jogador 3:</span>
                        <span className="card">"Pants molhados"</span>
                        <span className="winner-badge">🏆 Vencedor!</span>
                      </div>
                    </div>
                  </div>
                  <div className="example-explanation">
                    <p><strong>Por que ganhou:</strong> A resposta "Pants molhados" criou uma situação absurda e inesperada que fez o juiz rir mais.</p>
                  </div>
                </div>
              </div>

              <div className="example-card">
                <h3>📝 Exemplo 2: Jogada com Múltiplas Cartas</h3>
                <div className="example-scenario">
                  <div className="black-card-example">
                    <h4>🖤 Carta Preta:</h4>
                    <p>"_____ + _____ = Fim da minha carreira política."</p>
                  </div>
                  <div className="white-cards-example">
                    <h4>🤍 Submission Vencedora:</h4>
                    <div className="submissions-example">
                      <div className="submission winner">
                        <span className="player">Jogador 4:</span>
                        <span className="card">"TikToks embaraçosos" + "A minha sogra"</span>
                        <span className="winner-badge">🏆 Vencedor!</span>
                      </div>
                    </div>
                  </div>
                  <div className="example-explanation">
                    <p><strong>Por que ganhou:</strong> A combinação criou um cenário hilariante e relatable que pintou uma imagem clara na mente do juiz.</p>
                  </div>
                </div>
              </div>

              <div className="example-card">
                <h3>📝 Exemplo 3: Estratégia do "Anti-humor"</h3>
                <div className="example-scenario">
                  <div className="black-card-example">
                    <h4>🖤 Carta Preta:</h4>
                    <p>"Qual é o segredo para uma relação duradoura?"</p>
                  </div>
                  <div className="white-cards-example">
                    <h4>🤍 Submissions:</h4>
                    <div className="submissions-example">
                      <div className="submission">
                        <span className="player">Jogador 1:</span>
                        <span className="card">"Comunicação honesta"</span>
                      </div>
                      <div className="submission winner">
                        <span className="player">Jogador 2:</span>
                        <span className="card">"Fingir que ouves"</span>
                        <span className="winner-badge">🏆 Vencedor!</span>
                      </div>
                      <div className="submission">
                        <span className="player">Jogador 3:</span>
                        <span className="card">"Batatas fritas"</span>
                      </div>
                    </div>
                  </div>
                  <div className="example-explanation">
                    <p><strong>Por que ganhou:</strong> Enquanto outros foram pelo absurdo ou pelo óbvio, esta resposta teve um humor inteligente e cynical que ressoou com o juiz.</p>
                  </div>
                </div>
              </div>

              <div className="strategy-insights">
                <h3>🧠 Insights de Estratégia</h3>
                <div className="insights-grid">
                  <div className="insight">
                    <h4>🎯 Lê a Sala</h4>
                    <p>Observa que tipo de cartas têm ganhado e adapta-te ao humor do grupo.</p>
                  </div>
                  <div className="insight">
                    <h4>🎪 Timing é Tudo</h4>
                    <p>Uma carta mediocre na altura certa pode ganhar a uma carta brilhante fora de contexto.</p>
                  </div>
                  <div className="insight">
                    <h4>🔄 Varia o Estilo</h4>
                    <p>Alterna entre diferentes tipos de humor para manteres os outros jogadores surpresos.</p>
                  </div>
                  <div className="insight">
                    <h4>😂 Confia no Instinto</h4>
                    <p>A primeira carta que te faz rir é frequentemente a melhor escolha.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HowToPlayPage;
