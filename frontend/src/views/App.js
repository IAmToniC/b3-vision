import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/App.css';

function App() {
  const [output, setOutput] = useState('Aqui será exibido o output do programa.');

  const API_URL = process.env.REACT_APP_API_URL || "https://b3-vision-b.vercel.app";

  const fetchAndProcessNews = async () => {
    setOutput('Carregando e analisando notícias...');
    
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setOutput('Erro: Usuário não autenticado.');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/get_analysis?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();

        if (data.message) {
            setOutput(data.message);
        } else {
            setOutput('Erro ao obter a análise.');
        }
    } catch (error) {
        console.error('Erro ao acessar a API:', error);
        setOutput('Erro ao processar as notícias. Tente novamente mais tarde.');
    }
};

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
          <button onClick={fetchAndProcessNews}>Tente Agora</button>
        </div>
      </div>

      <div className="text-placeholder">
        Em um mundo onde o volume de informações financeiras cresce exponencialmente, investidores e analistas enfrentam o desafio de filtrar notícias e identificar tendências de mercado com agilidade. O uso de IA generativa para ler notícias e interpretar dados pode transformar essa realidade. Isso elimina o esforço manual de análise, reduzindo o risco de decisões baseadas em informações desatualizadas ou enviesadas. Além disso, oferece insights estratégicos em tempo real, capacitando usuários a antecipar movimentos de mercado com maior precisão. Essa solução não só economiza tempo, mas também democratiza o acesso a análises sofisticadas, potencializando os resultados de qualquer investidor.
      </div>

      <div className="output-box">
        <ReactMarkdown>{output}</ReactMarkdown>
      </div>

      <footer>
        Projeto desenvolvido para a cadeira de Desenvolvimento de Software.
        <div className="members">
          <span>Ana Sofia da Silva Moura</span>
          <span>Elisson Dias de Oliveira</span>
          <span>Gabriel Fonseca de Oliveira</span>
          <span>Layla Beatriz Batista dos Santos</span>
          <span>Renan Santana Costa</span>
          <span>Toni Cabral Amorim</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
