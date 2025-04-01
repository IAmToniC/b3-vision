# Documentação do Projeto B3 Vision

## Backend

### Visão Geral

O backend do projeto é desenvolvido em Python utilizando o framework Flask para criar uma API RESTful. Ele se conecta a um banco de dados MongoDB para gerenciar informações de usuários e seus perfis de investimento. A API fornece endpoints para registro de usuários, login, armazenamento de perfis de investimento e análise de notícias do mercado financeiro.

### Arquivos Principais

* `api.py`: Contém as rotas da API Flask para registro, login, perfil de investimento e análise de notícias.
* `main.py`: Orquestra a lógica de negócios, chamando funções de `networking.py` e `web_scraper.py` para buscar notícias e gerar análises.
* `networking.py`: Lida com requisições a APIs externas para obter notícias e interagir com o modelo de IA Gemini.
* `web_scraper.py`: Extrai notícias de diversos sites através de RSS feeds, filtrando por palavras-chave relevantes.

### Dependências

* Flask
* Flask-CORS
* PyMongo
* Requests
* python-dotenv
* xml.etree.ElementTree
* concurrent.futures

### Configuração

As variáveis de ambiente para a URI do MongoDB e as chaves de API para Gemini e NewsAPI são carregadas do arquivo `.env` usando a biblioteca `python-dotenv`.

### Rotas da API

* `/api/register` (POST): Registra um novo usuário.
* `/api/login` (POST): Autentica um usuário existente.
* `/api/investment-profile` (POST): Salva ou atualiza o perfil de investimento de um usuário.
* `/api/get_analysis` (GET): Retorna uma análise do mercado financeiro baseada em notícias e no perfil do usuário.

## Frontend

### Visão Geral

O frontend é uma aplicação React que permite aos usuários interagir com o backend para obter análises do mercado financeiro. Ele inclui funcionalidades para registro, login e visualização das análises geradas.

### Arquivos Principais

* `App.js`: Componente principal que gerencia a interface do usuário e a interação com a API.
* `AuthForm.js`: Componente para formulários de registro e login.
* `modals.js`: Componente para o modal de perfil de investimento.
* `validators.js`: Funções de validação para entradas de usuário.

### Dependências

* React
* React-markdown

### Funcionalidades

* Registro e login de usuários.
* Exibição de análises do mercado financeiro.
* Coleta de informações de perfil de investimento através de um modal interativo.

### Configuração

A URL da API é configurada através da variável de ambiente `REACT_APP_API_URL`.

### Estrutura de Componentes

* `App`: Gerencia o estado da aplicação e a lógica principal.
* `AuthForm`: Lida com a autenticação do usuário.
* `InvestmentProfileModal`: Coleta e envia dados do perfil de investimento.
* `ReactMarkdown`: Exibe o output formatado da API.
* `Validators`: Valida o input do usuário.
