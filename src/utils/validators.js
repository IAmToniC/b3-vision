// Funções para validar entradas no programa (ex: Entrada de e-mail)

const emailValidation = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Utilizando regex para garantir o formato de e-mail correto
    return regex.test(email);
}

export default emailValidation;