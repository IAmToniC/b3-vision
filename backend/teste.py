import requests
import json

# URL do seu endpoint de registro
url = "http://localhost:5000/api/register"

# Dados que serão enviados no corpo da requisição
data = {
    "email": "teste@exemplo.com",  # Substitua com um e-mail que você deseja testar
    "password": "senha123"  # Substitua com uma senha
}

# Enviando a requisição POST
response = requests.post(url, json=data)

# Verificando a resposta
if response.status_code == 201:
    print("Cadastro realizado com sucesso!")
elif response.status_code == 400:
    print("Erro no cadastro:", response.json()["message"])
else:
    print("Erro desconhecido:", response.status_code, response.text)
