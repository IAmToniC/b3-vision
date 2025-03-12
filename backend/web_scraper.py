import requests
import xml.etree.ElementTree as ET

def fetch_rss_feed(url):
    try:
        response = requests.get(url)
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

def web_scrape(noti):
    sites = [
        {'name': 'CNN', 'url': 'https://rss.cnn.com/rss/cnn_topstories.rss'},
        {'name': 'BBC', 'url': 'http://feeds.bbci.co.uk/news/world/rss.xml'},
        {'name': 'New York Times', 'url': 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'},
        {'name': 'Fox News', 'url': 'http://feeds.foxnews.com/foxnews/latest'},
        {'name': 'Reuters', 'url': 'http://feeds.reuters.com/reuters/topNews'},
        {'name': 'Al Jazeera', 'url': 'http://www.aljazeera.com/xml/rss/all.xml'},
        {'name': 'Bloomberg', 'url': 'https://feeds.bloomberg.com/bloomberg/index.xml'},
        {'name': 'Financial Times', 'url': 'https://www.ft.com/?format=rss'}
    ]
    
    keywords = [
        'b3', 'ibovespa',             
        'market', 'stock market', 'financial market',
        'politics', 'political', 'government'        
    ]
    
    num_noticias = 15 
    resultado = ""
    noticias = noti
    for site in sites:
        articles = get_articles(site, keywords, num_noticias)
        
        resultado += f"Site: {site['name']}\n"
        if articles:
            for i, article in enumerate(articles, 1):
                resultado += f"Notícia {noti}:\n"
                noti+=1
                resultado += f"Título: {article['title']}\n"
                resultado += f"Descrição: {article['description']}\n"
    return resultado
