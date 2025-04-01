import React, { useState } from "react";
import "../styles/modal.css";

function InvestmentProfileModal({ isOpen, onClose, userEmail }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState({});

  const API_URL = process.env.REACT_APP_API_URL || "https://b3-vision-b.vercel.app";

  const questions = [
    {
      question: "Qual é a sua principal motivação para investir?",
      options: [
        "Aumentar patrimônio",
        "Gerar renda passiva",
        "Proteção contra a inflação",
        "Independência financeira"
      ],
      key: "investmentMotivation"
    },
    {
      question: "O que você espera alcançar com seus investimentos no longo prazo?",
      options: [
        "Segurança financeira",
        "Realizar um grande projeto",
        "Criar reserva para aposentadoria",
        "Gerar renda para despesas recorrentes"
      ],
      key: "investmentGoal"
    },
    {
      question: "Em quais ativos você já investe ou pretende investir?",
      options: [
        "Não invisto ainda",
        "Renda fixa",
        "Ações",
        "Fundos Imobiliários",
        "Criptomoedas",
        "ETFs e Fundos de Investimento",
        "Outros"
      ],
      key: "investmentAssets"
    },
    {
      question: "Quanta experiência você tem com investimentos?",
      options: [
        "Nenhuma, estou começando agora",
        "Pouca, já investi mas ainda estou aprendendo",
        "Média, já fiz alguns investimentos e acompanho o mercado",
        "Alta, invisto há anos e estudo o mercado regularmente"
      ],
      key: "investmentExperience"
    },
    {
      question: "Como você se sente em relação a oscilações no valor do seu investimento?",
      options: [
        "Qualquer perda me deixa desconfortável",
        "Aceito pequenas perdas se houver chance de ganhos",
        "Estou confortável com riscos moderados",
        "Busco retornos altos e aceito grandes variações"
      ],
      key: "riskTolerance"
    },
    {
      question: "Quais desses setores você mais se interessa para investir?",
      options: [
        "Tecnologia",
        "Saúde e Biotecnologia",
        "Energia",
        "Varejo e Consumo",
        "Financeiro",
        "Imobiliário",
        "Agronegócio",
        "Criptomoedas e blockchain",
        "Outros"
      ],
      key: "investmentSectors"
    },
    {
      question: "Você prefere investir em ativos mais previsíveis ou em oportunidades de alto crescimento?",
      options: [
        "Prefiro previsibilidade e estabilidade",
        "Um equilíbrio entre estabilidade e crescimento",
        "Prefiro investimentos arrojados e de alto crescimento"
      ],
      key: "investmentStrategy"
    },
    {
      question: "Você já tem uma reserva de emergência formada?",
      options: [
        "Sim, e já investi parte dela",
        "Sim, mas ainda não investi",
        "Não, estou formando uma reserva",
        "Não, ainda não pensei nisso"
      ],
      key: "emergencyFund"
    },
    {
      question: "Com que frequência você acompanha o mercado financeiro?",
      options: [
        "Diariamente",
        "Algumas vezes por semana",
        "Ocasionalmente",
        "Quase nunca"
      ],
      key: "marketMonitoring"
    },
    {
      question: "Você costuma seguir análises de especialistas ou toma suas decisões sozinho?",
      options: [
        "Sigo recomendações de analistas e especialistas",
        "Uso análises como referência, mas tomo decisões sozinho",
        "Tomo todas as decisões sozinho sem consultar especialistas"
      ],
      key: "decisionMaking"
    }
  ];

  const handleChange = (e) => {
    setResponses({ ...responses, [questions[currentPage].key]: e.target.value });
  };

  const handleNext = () => {
    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async () => {
    if (!userEmail) {
      console.error("Erro: E-mail do usuário não definido!");
      return;
    }

    const payload = {
      ...responses,
      email: userEmail,
    };

    console.log("Enviando payload:", payload);

    try {
      const response = await fetch(`${API_URL}/api/investment-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Perfil de investimento submetido com sucesso");
        onClose();
      } else {
        const errorMessage = await response.json();
        console.error("Erro ao enviar o perfil de investimento:", errorMessage);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="investment-profile-modal">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>{questions[currentPage].question}</h2>
        <div className="radio-options-box">
          {questions[currentPage].options.map((option, index) => (
            <div key={index} className="radio-option-button">
              <input
                type="radio"
                id={`${questions[currentPage].key}-${index}`}
                name={questions[currentPage].key}
                value={option}
                checked={responses[questions[currentPage].key] === option}
                onChange={handleChange}
              />
              <label htmlFor={`${questions[currentPage].key}-${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <div className="modal-pagination">
          {currentPage > 0 && <button onClick={handlePrevious}>Anterior</button>}
          {currentPage < questions.length - 1 ? (
            <button onClick={handleNext}>Próximo</button>
          ) : (
            <button onClick={handleSubmit}>Enviar</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvestmentProfileModal;
