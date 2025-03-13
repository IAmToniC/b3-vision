import networking
import time

def query(investment_profile_data=None):
    a = networking.Networking()
    b = a.getNews(10)
    num_noticia = 1

    prompt = ""
    for i in b['results']:
        prompt += (f"Notícia {num_noticia}:\n")
        prompt += (f"Site: {i['source_name']}\n")
        prompt += (f"{i['title']}:\n")
        prompt += (f"{i['description']}\n")
        num_noticia += 1
    import web_scraper
    prompt += web_scraper.web_scrape(num_noticia + 1)

    perfil = ""
    if investment_profile_data:
        for key, value in investment_profile_data.items():
            perfil += f"{key.capitalize()}: {value}\n"
    else:
        perfil += "Nenhum perfil de investimento fornecido.\n"

    prompt_definitivo = f"""Você é uma IA que deve analisar as notícias para oferecer uma análise sofisticada da bolsa de valores B3 e suas ações para investidores que não tem tempo de ler notícias ou não entendem de investimentos, dito isso, você deve separar sua resposta na seguinte estrita ordem:  
    - Análise geral da B3
    - Tendência do mercado atual
    - Setores em alta
    - Riscos
    - Tópicos relevantes
    - Possíveis consequências 
    Use as seguintes notícias: {prompt}

    Após isso você deve fazer uma análise de notícias com base no perfil do usuário, coloque isso:
    Se o usuário não fornecer nenhum dado de perfil você deve ignorar o feedback personalizado.
    **Feedback Personalizado**:
    Use os dados do perfil seguinte: {perfil}

    Coloque isso ao final:
    No início, explicite de que sites você extraiu as notícias.
    
    Evite mencionar notícias que parecem ser fora do tema de mercado, e etc. Essas entraram aí por engano. Não as mencione.

    **Disclaimer:** Esta análise é apenas uma interpretação baseada nas notícias fornecidas. Não se trata de recomendação de investimento.  Consulte um profissional qualificado antes de tomar qualquer decisão de investimento.    
    """
    print(prompt_definitivo)
    gemini = a.promptIA(prompt_definitivo)

    return gemini['resposta']