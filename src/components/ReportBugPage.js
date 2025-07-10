import React, { useState } from 'react';
import '../styles/ReportBugPage.css';

const ReportBugPage = () => {
  const [bugType, setBugType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [expectedBehavior, setExpectedBehavior] = useState('');
  const [actualBehavior, setActualBehavior] = useState('');
  const [browser, setBrowser] = useState('');
  const [device, setDevice] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [email, setEmail] = useState('');

  const bugTypes = [
    { id: 'gameplay', label: '🎮 Problema de Jogabilidade', icon: '🎮' },
    { id: 'ui', label: '🎨 Problema de Interface', icon: '🎨' },
    { id: 'connection', label: '🌐 Problema de Conexão', icon: '🌐' },
    { id: 'cards', label: '🃏 Problema com Cartas', icon: '🃏' },
    { id: 'chat', label: '💬 Problema no Chat', icon: '💬' },
    { id: 'performance', label: '⚡ Problema de Performance', icon: '⚡' },
    { id: 'mobile', label: '📱 Problema Mobile', icon: '📱' },
    { id: 'other', label: '❓ Outro', icon: '❓' }
  ];

  const severityLevels = [
    { id: 'low', label: 'Baixa', color: '#4CAF50', description: 'Problema menor que não afeta a jogabilidade' },
    { id: 'medium', label: 'Média', color: '#FF9800', description: 'Problema que causa algum incómodo mas é contornável' },
    { id: 'high', label: 'Alta', color: '#F44336', description: 'Problema que impede ou dificulta muito a jogabilidade' },
    { id: 'critical', label: 'Crítica', color: '#9C27B0', description: 'Problema que torna o jogo inutilizável' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar envio do bug report
    alert('Bug report enviado! Obrigado pelo feedback.');
    // Reset form
    setBugType('');
    setTitle('');
    setDescription('');
    setSteps('');
    setExpectedBehavior('');
    setActualBehavior('');
    setBrowser('');
    setDevice('');
    setSeverity('medium');
    setEmail('');
  };

  return (
    <div className="report-bug-page">
      <div className="page-hero">
        <h1>🐛 Reportar Bug</h1>
        <p className="page-subtitle">
          Ajuda-nos a melhorar o jogo reportando problemas que encontraste!
        </p>
      </div>

      <div className="bug-report-container">
        <div className="report-intro">
          <div className="intro-card">
            <h2>🙏 Obrigado pela Ajuda!</h2>
            <p>
              Os teus reports de bugs são essenciais para mantermos o jogo funcionando perfeitamente. 
              Quanto mais detalhes forneceres, mais rápido conseguimos resolver o problema!
            </p>
            
            <div className="quick-tips">
              <h3>💡 Dicas Rápidas</h3>
              <ul>
                <li>✨ Sê específico na descrição do problema</li>
                <li>🔄 Inclui os passos para reproduzir o bug</li>
                <li>📱 Menciona o dispositivo e browser que usas</li>
                <li>📸 Screenshots ajudam muito (se possível)</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bug-report-form">
          <div className="form-section">
            <h3>🏷️ Tipo de Problema</h3>
            <div className="bug-types-grid">
              {bugTypes.map(type => (
                <label key={type.id} className={`bug-type-option ${bugType === type.id ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="bugType"
                    value={type.id}
                    checked={bugType === type.id}
                    onChange={(e) => setBugType(e.target.value)}
                  />
                  <div className="bug-type-content">
                    <span className="bug-type-icon">{type.icon}</span>
                    <span className="bug-type-label">{type.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>📝 Detalhes do Problema</h3>
            
            <div className="form-group">
              <label htmlFor="title">🎯 Título do Bug (resumo curto)</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Chat não funciona na sala de espera"
                className="form-input"
                required
                maxLength={100}
              />
              <small className="char-count">{title.length}/100</small>
              {!title.trim() && (
                <div className="warning-message">
                  <span className="warning-icon">⚠️</span>
                  <span>Título é obrigatório para reportar o bug</span>
                </div>
              )}
              {title.length > 80 && (
                <div className="info-message">
                  <span className="info-icon">💡</span>
                  <span>Tenta ser mais conciso no título</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">📋 Descrição Detalhada</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreve o problema com o máximo de detalhes possível..."
                className="form-textarea"
                rows={5}
                required
                maxLength={1000}
              />
              <small className="char-count">{description.length}/1000</small>
              {!description.trim() && (
                <div className="warning-message">
                  <span className="warning-icon">⚠️</span>
                  <span>Descrição detalhada é obrigatória</span>
                </div>
              )}
              {description.length < 20 && description.trim() && (
                <div className="info-message">
                  <span className="info-icon">💡</span>
                  <span>Adiciona mais detalhes para ajudar na resolução</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="steps">🔄 Passos para Reproduzir</label>
              <textarea
                id="steps"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="1. Entrei numa sala&#10;2. Cliquei no chat&#10;3. Escrevi uma mensagem&#10;4. A mensagem não apareceu"
                className="form-textarea"
                rows={4}
                maxLength={400}
              />
              <small className="char-count">{steps.length}/400</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expected">✅ Comportamento Esperado</label>
                <textarea
                  id="expected"
                  value={expectedBehavior}
                  onChange={(e) => setExpectedBehavior(e.target.value)}
                  placeholder="O que devia ter acontecido?"
                  className="form-textarea"
                  rows={3}
                  maxLength={200}
                />
                <small className="char-count">{expectedBehavior.length}/200</small>
              </div>

              <div className="form-group">
                <label htmlFor="actual">❌ Comportamento Real</label>
                <textarea
                  id="actual"
                  value={actualBehavior}
                  onChange={(e) => setActualBehavior(e.target.value)}
                  placeholder="O que realmente aconteceu?"
                  className="form-textarea"
                  rows={3}
                  maxLength={200}
                />
                <small className="char-count">{actualBehavior.length}/200</small>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>💻 Informações Técnicas</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="browser">🌐 Browser</label>
                <select
                  id="browser"
                  value={browser}
                  onChange={(e) => setBrowser(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Seleciona o browser</option>
                  <option value="chrome">Google Chrome</option>
                  <option value="firefox">Mozilla Firefox</option>
                  <option value="safari">Safari</option>
                  <option value="edge">Microsoft Edge</option>
                  <option value="opera">Opera</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="device">📱 Dispositivo</label>
                <select
                  id="device"
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Seleciona o dispositivo</option>
                  <option value="desktop">Computador Desktop</option>
                  <option value="laptop">Portátil</option>
                  <option value="tablet">Tablet</option>
                  <option value="mobile">Telemóvel</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>⚠️ Gravidade do Problema</h3>
            <div className="severity-grid">
              {severityLevels.map(level => (
                <label key={level.id} className={`severity-option ${severity === level.id ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="severity"
                    value={level.id}
                    checked={severity === level.id}
                    onChange={(e) => setSeverity(e.target.value)}
                  />
                  <div className="severity-content">
                    <div className="severity-header">
                      <div 
                        className="severity-indicator" 
                        style={{ backgroundColor: level.color }}
                      ></div>
                      <span className="severity-label">{level.label}</span>
                    </div>
                    <p className="severity-description">{level.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>📧 Contacto (Opcional)</h3>
            <div className="form-group">
              <label htmlFor="email">✉️ Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teu.email@exemplo.com"
                className="form-input"
              />
              <small className="form-help">
                Se quiseres receber atualizações sobre o estado do bug (opcional)
              </small>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={!bugType || !title || !description || !browser || !device}>
              <span className="btn-icon">🚀</span>
              Enviar Report
            </button>
            
            <div className="form-note">
              <p>
                💝 Obrigado por ajudares a melhorar o Cartas Contra Tugas! 
                A tua contribuição é valiosa para toda a comunidade.
              </p>
            </div>
          </div>
        </form>
      </div>

      <div className="known-issues">
        <h2>🔍 Problemas Conhecidos</h2>
        <p>Antes de reportares, verifica se o teu problema já está na nossa lista:</p>
        
        <div className="issues-list">
          <div className="issue-item">
            <div className="issue-status working">🔄</div>
            <div className="issue-content">
              <h4>Chat pode demorar a carregar em conexões lentas</h4>
              <p>Estamos a otimizar o carregamento do chat para conexões mais lentas.</p>
            </div>
          </div>
          
          <div className="issue-item">
            <div className="issue-status working">🔄</div>
            <div className="issue-content">
              <h4>Algumas cartas podem aparecer cortadas em ecrãs pequenos</h4>
              <p>A ser corrigido na próxima atualização do design responsivo.</p>
            </div>
          </div>
          
          <div className="issue-item">
            <div className="issue-status fixed">✅</div>
            <div className="issue-content">
              <h4>Problemas de conexão em salas com muitos jogadores</h4>
              <p>Corrigido! O servidor agora suporta melhor salas grandes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="report-stats">
        <h2>📊 Estatísticas de Reports</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">🐛</span>
            <div className="stat-info">
              <span className="stat-number">127</span>
              <span className="stat-label">Bugs Reportados</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <div className="stat-info">
              <span className="stat-number">95</span>
              <span className="stat-label">Bugs Corrigidos</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⚡</span>
            <div className="stat-info">
              <span className="stat-number">2.3</span>
              <span className="stat-label">Dias Médios para Correção</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🙏</span>
            <div className="stat-info">
              <span className="stat-number">89</span>
              <span className="stat-label">Contribuidores</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBugPage;
