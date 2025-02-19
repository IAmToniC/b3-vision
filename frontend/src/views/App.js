import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/App.css';

function App() {
  const [output, setOutput] = useState('Aqui será exibido o output do programa.');

  const fetchAndProcessNews = async () => {
    setOutput('Carregando notícias...');

    try {
      const response = await fetch(
        `https://newsdata.io/api/1/latest?apikey=${atob('cHViXzU5MjMyM2Y0ZjJiNGUwYzY3NDViYmFmNWQ1YzZmYzZhOTQxZDc=')}&q=ibovespa OR petrobras OR vale OR mercado financeiro&size=10&language=pt`
      );
      const newsData = await response.json();

      if (!newsData.results || newsData.results.length === 0) {
        setOutput('Nenhuma notícia encontrada.');
        return;
      }

      let prompt = '';
      newsData.results.forEach((news, index) => {
        prompt += `Notícia ${index + 1}:\n`;
        prompt += `${news.title}:\n`;
        prompt += `${news.description}\n\n`;
      });

      const analysis = `
        Você é uma IA que deve analisar as notícias para oferecer uma análise sofisticada da bolsa de valores B3 e suas ações para investidores que não têm tempo de ler notícias ou não entendem de investimentos. Dito isso, você deve separar sua resposta na seguinte estrita ordem:  
        - **Análise geral da B3**  
        - **Tendência do mercado atual**  
        - **Setores em destaque**  
        - **Oportunidades e Riscos**  
        - **Tópicos relevantes**  
        - **Possíveis consequências**  

        Use as seguintes notícias:  
        ${prompt}

        **Disclaimer:** Esta análise é apenas uma interpretação baseada nas notícias fornecidas. Não se trata de recomendação de investimento. Consulte um profissional qualificado antes de tomar qualquer decisão de investimento.
      `;

      setOutput('Analisando notícias...');

      const aiResponse = await fetch( 
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${atob('QUl6YVN5Q0ZKRlBHMm1xaTBxcmVfczN5UnN3dXlaN1RvSXRYMkVB')}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: analysis }] }],
          }),
        }
      );

      const aiData = await aiResponse.json();

      if (!aiData.candidates || aiData.candidates.length === 0) {
        setOutput('Erro ao gerar análise.');
        return;
      }
      setOutput(aiData.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Erro:', error);
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
          <span>Renan Santana Costa</span>
          <span>Toni Cabral Amorim</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
