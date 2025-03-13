import pytest
import requests
from unittest.mock import patch

# URL base do servidor Flask (ajuste conforme necessário)
BASE_URL = "http://localhost:5000/api"

# Limpeza do banco antes dos testes (opcional, dependendo do ambiente)
@pytest.fixture(autouse=True)
def setup_and_teardown():
    # Antes de cada teste, limpa o banco de dados para evitar conflitos
    response = requests.get(f"{BASE_URL}/get_analysis")  # Garante que o servidor está ativo
    if response.status_code != 200:
        pytest.skip("Servidor não está rodando")
    yield  # Executa o teste
    # Após o teste, pode-se limpar o banco se necessário (ex.: remover usuários criados)

# Teste para o endpoint /api/get_analysis
def test_get_analysis():
    response = requests.get(f"{BASE_URL}/get_analysis")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert isinstance(data["message"], str)  # Verifica se o retorno é uma string

# Teste para o endpoint /api/register - Sucesso
def test_register_success():
    payload = {"email": "test@example.com", "password": "123456"}
    response = requests.post(f"{BASE_URL}/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["message"] == "Usuário registrado com sucesso!"

# Teste para o endpoint /api/register - Email já existente
def test_register_duplicate_email():
    # Primeiro registro
    payload = {"email": "duplicate@example.com", "password": "123456"}
    requests.post(f"{BASE_URL}/register", json=payload)
    
    # Tentativa de registrar novamente
    response = requests.post(f"{BASE_URL}/register", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert data["message"] == "Usuário já cadastrado!"

# Teste para o endpoint /api/register - Dados faltando
def test_register_missing_fields():
    payload = {"email": "incomplete@example.com"}  # Sem senha
    response = requests.post(f"{BASE_URL}/register", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert data["message"] == "Email e senha são obrigatórios!"

# Teste para o endpoint /api/login - Sucesso
def test_login_success():
    # Registra um usuário primeiro
    payload = {"email": "login@example.com", "password": "secret"}
    requests.post(f"{BASE_URL}/register", json=payload)
    
    # Faz login
    response = requests.post(f"{BASE_URL}/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Login bem-sucedido!"

# Teste para o endpoint /api/login - Credenciais inválidas
def test_login_invalid_credentials():
    payload = {"email": "nonexistent@example.com", "password": "wrong"}
    response = requests.post(f"{BASE_URL}/login", json=payload)
    assert response.status_code == 401
    data = response.json()
    assert data["message"] == "Credenciais inválidas!"

# Teste para o endpoint /api/register - Erro interno (mock de exceção)
@patch('pymongo.collection.Collection.insert_one')
def test_register_internal_error(mock_insert):
    mock_insert.side_effect = Exception("Erro no MongoDB")
    payload = {"email": "error@example.com", "password": "123456"}
    response = requests.post(f"{BASE_URL}/register", json=payload)
    assert response.status_code == 500
    data = response.json()
    assert "Erro interno" in data["message"]

# Teste para OPTIONS (CORS)
def test_options_request():
    response = requests.options(f"{BASE_URL}/register")
    assert response.status_code == 200
    headers = response.headers
    assert headers["Access-Control-Allow-Origin"] == "*"
    assert "POST" in headers["Access-Control-Allow-Methods"]

if __name__ == "__main__":
    pytest.main(["-v"])