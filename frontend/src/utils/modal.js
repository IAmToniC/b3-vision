import React, { useState } from "react";
import "../styles/modal.css";

function InvestmentProfileModal({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState({});

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const questions = [
    {
      question: "Qual é o seu objetivo principal com investimentos?",
      options: ["Aposentadoria", "Comprar casa", "Educação", "Outro"],
      key: "goal",
    },
    {
      question: "Qual é o seu perfil de risco?",
      options: ["Conservador", "Moderado", "Ousado", "Muito Ousado"],
      key: "risk",
    },
    {
      question: "Quanto tempo você pretende manter o investimento?",
      options: ["Menos de 1 ano", "1-3 anos", "3-5 anos", "Mais de 5 anos"],
      key: "investmentTime",
    },
    {
      question: "Qual é a sua faixa etária?",
      options: ["Menos de 25", "25-40", "41-60", "Acima de 60"],
      key: "age",
    },
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
    console.log(responses);
    try {
      const response = await fetch(`${API_URL}/api/investment-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responses),
      });

      if (response.ok) {
        console.log("Perfil de investimento submetido com sucesso");
        onClose();
      } else {
        console.error("Erro ao enviar o perfil de investimento");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  if(!isOpen) return null;

  return (
    <div className={`investment-profile-modal`}>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>{questions[currentPage].question}</h2>
        <div>
          {questions[currentPage].options.map((option, index) => (
            <div key={index}>
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
