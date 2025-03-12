import requests 
import dotenv
import os
class Networking:
    def __init__(self):
        dotenv.load_dotenv()
        self.segredo_noticias = os.getenv("NEWS_API_KEY")
        self.segredo_gemini = os.getenv("GEMINI_API_KEY")
        self.tokens_promptados_sessao = 0
        self.tokens_recebidos_sessao = 0

    def promptIA(self, prompt:str) -> dict:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.segredo_gemini}"
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }
        headers = {
            "Content-Type": "application/json"
        }
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code != 200:
            print(f"Erro: {response.status_code}")
            print("Mensagem:", response.text)
            return
        resposta = eval(response.text)
        resposta_desejada = {"resposta" : resposta["candidates"][0]["content"]["parts"][0]["text"], "dados" : resposta["usageMetadata"]}
        self.tokens_promptados_sessao += resposta_desejada['dados']['promptTokenCount']
        self.tokens_recebidos_sessao += resposta_desejada['dados']['candidatesTokenCount']
        return resposta_desejada

    def getNews(self, quantidade) -> dict:
        noticias = requests.get(f"https://newsdata.io/api/1/latest?apikey={self.segredo_noticias}&q=ibovespa OR petrobras OR vale OR mercado financeiro&size={str(quantidade)}&language=pt").text
        noticias = noticias.replace("null", "None").replace("false", "False").replace("true", "True")
        actual = eval(noticias)
        return actual
