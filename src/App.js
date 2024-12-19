import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <header>B3 Vision</header>
      
      <div className="container">
        <div className="image-section">
          <img src={`${process.env.PUBLIC_URL}/touro.png`} alt="Touro" />
        </div>
        
        <div className="content-section">
          <h1>Investir com Precisão e Confiança</h1>
          <p>Antecipe tendências, tome decisões assertivas</p>
          <button>Tente Agora</button>
        </div>
      </div>

      <div className="text-placeholder">Em um mundo onde o volume de informações financeiras cresce exponencialmente, investidores e analistas enfrentam o desafio de filtrar notícias e identificar tendências de mercado com agilidade. O uso de IA generativa para ler notícias e interpretar dados pode transformar essa realidade. Isso elimina o esforço manual de análise, reduzindo o risco de decisões baseadas em informações desatualizadas ou enviesadas. Além disso, oferece insights estratégicos em tempo real, capacitando usuários a antecipar movimentos de mercado com maior precisão. Essa solução não só economiza tempo, mas também democratiza o acesso a análises sofisticadas, potencializando os resultados de qualquer investidor.</div>

      <div className="output-box">
        Aqui será exibido o output do programa.
      </div>

      <footer>
        Projeto desenvolvido para a cadeira de Desenvolvimento de Software.
        <div className="members">
          <span>Ana Sofia da Silva Moura</span>
          <span>Elisson Dias de Oliveira</span>
          <span>Gabriel Fonseca de Oliveira</span>
          <span>Renan Santana Costa</span>
          <span>Toni Cabral Amorim</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
