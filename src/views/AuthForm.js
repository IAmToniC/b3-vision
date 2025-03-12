import React, {useState, useEffect} from "react";
import "../styles/AuthForm.css";
import emailValidation from "../utils/validators";

function AuthForm({onLogin}) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [users, setUsers] = useState({});
    const [alertMessage, setAlert] = useState({message : "", color : ""});
    const handleSubmit = (event) => {
        event.preventDefault();
        if(isRegistering) {
            if(users[Email]) {
                setAlert({message : "Usuário já cadastrado", color : "#ff4d4d"});
                return;
            }  else if (!emailValidation(Email)) {
                setAlert({message : "Formato incorreto", color : "#ff4d4d"})
                return;
            }
            setUsers((listUsers) => {
                const allUsers = {
                    ...listUsers,
                    [Email] : Password,
                };
                return allUsers;
            });
            setAlert({message : "Cadastro realizado com sucesso!", color : "#55b855"});
            setIsRegistering(!isRegistering);
            setEmail(""); setPassword("");
        } else {
            let checkEmail = users[Email]; let checkPassword = users[Email] !== Password;
            if(!checkEmail || checkPassword) {
                let val = (!checkEmail) ? true : false;
                setAlert((val) ? {message : "Email não cadastrado ou incorreto", color : "#e27c28"} : {message : "Senha incorreta!", color : "#e27c28"});
                return;
            }
            setAlert({message : "Login realizado com sucesso!", color : "#55b855"});
            onLogin();
        }
    };

    useEffect(() => {
        if (alertMessage.message) {
            const timer = setTimeout(() => setAlert({ message: "", color: "" }), 3500);
            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

    return (
        <div class="login-app-wrapper">
            {alertMessage.message && (
                <div className="custom-alert" style={{ backgroundColor: alertMessage.color }}>
                    {alertMessage.message}
                    <button onClick={() => setAlert({ message: "", color: "" })}>&times;</button>
                </div>
            )}
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

export default AuthForm;