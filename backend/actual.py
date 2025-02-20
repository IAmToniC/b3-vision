import networking
import time

def go():
    a = networking.Networking()
    b = a.getNews(10)
    num_noticia = 1

    prompt = ""
    for i in b['results']:
        prompt += (f"Notícia {num_noticia}:\n")
        prompt += (f"{i['title']}:\n")
        prompt += (f"{i['description']}\n")
        num_noticia += 1


    prompt_definitivo = f"""Você é uma IA que deve analisar as notícias para oferecer uma análise sofisticada da bolsa de valores B3 e suas ações para investidores que não tem tempo de ler notícias ou não entendem de investimentos, dito isso, você deve separar sua resposta na seguinte estrita ordem:  
    - Análise geral da B3
    - Tendência do mercado atual
    - Ações com tendências de subir
    - Ações com tendências de descer
    - Tópicos relevantes
    - Possíveis consequências 
    Use as seguintes notícias: {prompt}

    Coloque isso ao final:
    **Disclaimer:** Esta análise é apenas uma interpretação baseada nas notícias fornecidas. Não se trata de recomendação de investimento.  Consulte um profissional qualificado antes de tomar qualquer decisão de investimento.    
    """

    gemini = a.promptIA(prompt_definitivo)

    return gemini['resposta']