import React, {useState} from "react";
import "./AuthForm.css";

function AuthForm({onLogin}) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        if(isRegistering) {
            setIsRegistering(!isRegistering);
            setEmail("");
            setPassword("");
        } else {
            onLogin();
        }
    };

    return (
        <div class="login-app-wrapper">
            <header>{isRegistering ? "Cadastro" : "Login"}</header>
            <div class="login-container">
                <div class="login-content-section">
                    <h2>{isRegistering ? "Cadastre-se" : "Faça seu login"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div class="login-input-group">
                            <label for="email">E-mail</label>
                            <input type="email" id="email" value={Email} onChange={(e) => setEmail(e.target.value)} required></input>
                        </div>
                        <div class="login-input-group">
                            <label for="password">Senha</label>
                            <input type="password" id="password" value={Password} onChange={(e) => setPassword(e.target.value)} required></input>
                        </div>
                        <button class="login-button" type="submit">{isRegistering ? "Cadastrar" : "Entrar"}</button>
                        <p class="register-link">{isRegistering ? "Já tem uma conta? " : "Não tem uma conta? "}<a onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? "Faça login" : "Cadastre-se"}</a></p>
                    </form>
                </div>
            </div>
            <footer>
                &copy; 2025 Todos os direitos reservados
            </footer>
        </div>
    );
}

export default AuthForm;