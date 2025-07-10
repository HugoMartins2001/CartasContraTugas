import React from 'react';
import '../styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>💝 Sobre o Cartas Contra Tugas</h1>
        <p className="about-subtitle">
          O jogo mais irreverente e divertido da internet portuguesa!
        </p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>🎭 O que é o Cartas Contra Tugas?</h2>
          <div className="content-card">
            <p>
              O <strong>Cartas Contra Tugas</strong> é uma versão portuguesa e moderna do famoso jogo 
              "Cards Against Humanity". É um jogo de festa para pessoas com sentido de humor... 
              questionável! 😈
            </p>
            <p>
              O objetivo é simples: combinar cartas brancas (respostas) com cartas pretas (situações) 
              da forma mais hilariante possível. Cada ronda, um jogador é o juiz e escolhe a 
              combinação mais engraçada.
            </p>
          </div>
        </div>

        <div className="about-section">
          <h2>🚀 Funcionalidades</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Multijogador Online</h3>
              <p>Joga com amigos em tempo real, onde quer que estejam!</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Chat Integrado</h3>
              <p>Conversa e ri-te com os teus amigos durante o jogo.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Sistema de Pontuação</h3>
              <p>Rankings, estatísticas e competição saudável!</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Design Moderno</h3>
              <p>Interface bonita com glassmorfismo e animações.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Totalmente Responsivo</h3>
              <p>Funciona perfeitamente em computadores, tablets e telemóveis.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🇵🇹</div>
              <h3>100% Português</h3>
              <p>Humor e referências culturais portuguesas autênticas.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>🎯 Como Jogar</h2>
          <div className="content-card">
            <div className="game-steps">
              <div className="step">
                <span className="step-number">1</span>
                <div className="step-content">
                  <h4>Criar ou Juntar-se a uma Sala</h4>
                  <p>O host cria uma sala e partilha o código com os amigos.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <div className="step-content">
                  <h4>Aguardar Jogadores</h4>
                  <p>Espera que pelo menos 3 jogadores se juntem (ideal: 4-6).</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <div className="step-content">
                  <h4>Jogada por Ronda</h4>
                  <p>Cada jogador (exceto o juiz) submete a carta branca mais engraçada.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <div className="step-content">
                  <h4>Julgamento</h4>
                  <p>O juiz escolhe a combinação mais hilariante e atribui um ponto.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">5</span>
                <div className="step-content">
                  <h4>Próxima Ronda</h4>
                  <p>O papel de juiz roda e começa uma nova ronda!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>⚠️ Aviso Importante</h2>
          <div className="warning-card">
            <div className="warning-icon">🔞</div>
            <div className="warning-content">
              <h3>Conteúdo Para Adultos (18+)</h3>
              <p>
                Este jogo contém humor adulto, linguagem explícita e conteúdo que pode ser 
                considerado ofensivo. É destinado exclusivamente a jogadores com mais de 18 anos 
                e deve ser jogado com bom senso e entre amigos que compreendem o contexto humorístico.
              </p>
              <p>
                <strong>Não nos responsabilizamos por amizades perdidas devido a cartas muito engraçadas! 😅</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>💻 Tecnologia</h2>
          <div className="content-card">
            <p>Este jogo foi desenvolvido com tecnologias modernas:</p>
            <div className="tech-list">
              <div className="tech-item">
                <span className="tech-icon">⚛️</span>
                <span><strong>React</strong> - Interface de utilizador moderna e reativa</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">🚀</span>
                <span><strong>Node.js + Express</strong> - Servidor backend robusto</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">🔌</span>
                <span><strong>Socket.io</strong> - Comunicação em tempo real</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">🎨</span>
                <span><strong>CSS3 Moderno</strong> - Glassmorfismo e animações</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">📱</span>
                <span><strong>Design Responsivo</strong> - Funciona em todos os dispositivos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>🎉 História</h2>
          <div className="content-card">
            <p>
              O <strong>Cartas Contra Tugas</strong> nasceu da vontade de trazer o famoso jogo 
              "Cards Against Humanity" para o contexto português, com humor e referências 
              culturais que todos os tugas conseguem relacionar.
            </p>
            <p>
              Esta versão remaster representa uma evolução completa do jogo original, 
              com design ultra-moderno, funcionalidades online avançadas e uma experiência 
              de utilizador de primeira qualidade.
            </p>
          </div>
        </div>

        <div className="about-section">
          <h2>🤝 Contribuir</h2>
          <div className="content-card">
            <p>
              Tens ideias para novas cartas? Encontraste um bug? Queres contribuir para o desenvolvimento?
            </p>
            <div className="contribute-actions">
              <button className="contribute-btn">
                🐛 Reportar Bug
              </button>
              <button className="contribute-btn">
                💡 Sugerir Carta
              </button>
              <button className="contribute-btn">
                📧 Contactar
              </button>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>❤️ Agradecimentos</h2>
          <div className="content-card">
            <p>
              Um grande obrigado a todos os jogadores que testaram, sugeriram melhorias 
              e ajudaram a tornar este jogo ainda mais divertido!
            </p>
            <p>
              Menção especial aos criadores originais do "Cards Against Humanity" 
              pela inspiração e pela licença Creative Commons que permitiu criar esta versão.
            </p>
          </div>
        </div>
      </div>

      <div className="about-footer">
        <div className="footer-content">
          <p>
            🃏 <strong>Cartas Contra Tugas Remaster</strong> - Versão 2.0
          </p>
          <p>
            Feito com ❤️ em Portugal 🇵🇹
          </p>
          <p className="disclaimer">
            Este jogo é uma paródia humorística destinada apenas a entretenimento entre adultos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
