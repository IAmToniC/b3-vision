import React, { useState, useEffect } from "react";
import "../styles/AuthForm.css";
import emailValidation from "../utils/validators";
import InvestmentProfileModal from "../utils/modal";

function AuthForm({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [alertMessage, setAlert] = useState({ message: "", color: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "https://b3-vision-b.vercel.app";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailValidation(Email)) {
      setAlert({ message: "Formato incorreto", color: "#ff4d4d" });
      return;
    }

    if (isRegistering) {
      try {
        const response = await fetch(`${API_URL}/api/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: Email, password: Password }),
        });
        const data = await response.json();
        if (response.ok) {
          setAlert({ message: data.message, color: "#55b855" });
          setIsRegistering(false);
          setPassword("");
          setIsModalOpen(true);
        } else {
          setAlert({ message: data.message, color: "#ff4d4d" });
        }
      } catch (error) {
        console.error("Erro ao registrar:", error);
        setAlert({ message: "Erro ao registrar. Tente novamente.", color: "#ff4d4d" });
      }
    } else {
      // Login
      try {
        const response = await fetch(`${API_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: Email, password: Password }),
        });
        const data = await response.json();
        if (response.ok) {
          setAlert({ message: data.message, color: "#55b855" });
          localStorage.setItem("userEmail", Email);
          onLogin();
        } else {
          setAlert({ message: data.message, color: "#e27c28" });
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        setAlert({ message: "Erro ao conectar com o servidor", color: "#e27c28" });
      }
    }
  };

  useEffect(() => {
    if (alertMessage.message) {
      const timer = setTimeout(() => setAlert({ message: "", color: "" }), 3500);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className="login-app-wrapper">
      {alertMessage.message && (
        <div className="custom-alert" style={{ backgroundColor: alertMessage.color }}>
          {alertMessage.message}
          <button onClick={() => setAlert({ message: "", color: "" })}>&times;</button>
        </div>
      )}
      <header>{isRegistering ? "Cadastro" : "Login"}</header>
      <div className="login-container">
        <div className="login-content-section">
          <h2>{isRegistering ? "Cadastre-se" : "Faça seu login"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-button" type="submit">
              {isRegistering ? "Cadastrar" : "Entrar"}
            </button>
            <p className="register-link">
              {isRegistering ? "Já tem uma conta? " : "Não tem uma conta? "}
              <a onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Faça login" : "Cadastre-se"}
              </a>
            </p>
          </form>
        </div>
      </div>
      <footer>
        Projeto desenvolvido para a cadeira de Desenvolvimento de Software.
        <div className="members">
          <span>Ana Sofia da Silva Moura</span>
          <span>Elisson Dias de Oliveira</span>
          <span>Layla Beatriz Batista dos Santos</span>
          <span>Gabriel Fonseca de Oliveira</span>
          <span>Renan Santana Costa</span>
          <span>Toni Cabral Amorim</span>
        </div>
      </footer>
      <InvestmentProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userEmail={Email}
      />
    </div>
  );
}

export default AuthForm;
