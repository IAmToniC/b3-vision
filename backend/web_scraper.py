import requests
import xml.etree.ElementTree as ET
import concurrent.futures

def fetch_rss_feed(url):
    try:
        response = requests.get(url, timeout=10)  
        if response.status_code == 200:
            return response.text
        else:
            return None
    except requests.exceptions.RequestException:
        return None

def parse_rss_feed(rss_text):
    try:
        root = ET.fromstring(rss_text)
        items = root.findall('.//item')
        articles = []
        for item in items:
            title = item.find('title').text if item.find('title') is not None else ''
            description = item.find('description').text if item.find('description') is not None else ''
            link = item.find('link').text if item.find('link') is not None else ''
            articles.append({'title': title, 'description': description, 'link': link})
        return articles
    except ET.ParseError:
        return []

def filter_articles(articles, keywords):
    filtered = []
    for article in articles:
        text = (article['title'] + ' ' + article['description']).lower()
        if any(keyword.lower() in text for keyword in keywords):
            filtered.append(article)
    return filtered

def get_articles(site, keywords, num_noticias):
    rss_text = fetch_rss_feed(site['url'])
    if rss_text:
        articles = parse_rss_feed(rss_text)
        filtered_articles = filter_articles(articles, keywords)
        return filtered_articles[:num_noticias]
    return []

def process_site(site, keywords, num_noticias, start_noti):
    articles = get_articles(site, keywords, num_noticias)
    site_result = f"Site: {site['name']}\n"
    if articles:
        for i, article in enumerate(articles, 1):
            site_result += f"Notícia {start_noti + i}:\n"
            site_result += f"Título: {article['title']}\n"
            site_result += f"Descrição: {article['description']}\n"
    return site_result

def web_scrape(noti):
    sites = [
        {'name': 'CNN', 'url': 'https://rss.cnn.com/rss/cnn_topstories.rss'},
        {'name': 'BBC', 'url': 'http://feeds.bbci.co.uk/news/world/rss.xml'},
        {'name': 'New York Times', 'url': 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'},
        {'name': 'Fox News', 'url': 'http://feeds.foxnews.com/foxnews/latest'},
        {'name': 'Bloomberg', 'url': 'https://feeds.bloomberg.com/bloomberg/index.xml'},
        {'name': 'Financial Times', 'url': 'https://www.ft.com/?format=rss'},
        {'name': 'G1', 'url': 'https://g1.globo.com/rss/g1/economia/'},
        {'name': 'UOL Economia', 'url': 'https://economia.uol.com.br/noticias/rss.xml'},
        {'name': 'Estadão', 'url': 'https://www.estadao.com.br/rss/economia.xml'},
        {'name': 'Valor Econômico', 'url': 'https://www.valor.com.br/rss/brasil'},
        {'name': 'Folha de S.Paulo', 'url': 'https://feeds.folha.uol.com.br/mercado/rss091.xml'},
        {'name': 'Exame', 'url': 'https://exame.com/feed/mercados/'},
        {'name': 'Agência Brasil', 'url': 'https://agenciabrasil.ebc.com.br/rss/economia/feed.xml'},
        {'name': 'InfoMoney', 'url': 'https://www.infomoney.com.br/feed/'}
    ]
    
    keywords = [
        'b3', 'ibovespa',             
        'market', 'stock market', 'financial market',
        'politics', 'political', 'government', 
        'governo', 'economia', 'bolsa de valores'
    ]
    
    num_noticias = 5 
    resultado = ""
    noticias = noti

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(process_site, site, keywords, num_noticias, noticias) for site in sites]
        for future in concurrent.futures.as_completed(futures):
            resultado += future.result()
            noticias += num_noticias

    return resultado
