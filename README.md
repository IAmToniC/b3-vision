# *B3 Vision*
> Em um mundo onde o volume de informações financeiras cresce exponencialmente, investidores e analistas enfrentam o ***desafio de filtrar*** ***notícias e identificar tendências de mercado com agilidade.*** O uso de IA generativa para ***ler notícias e interpretar dados*** pode transformar essa realidade. Isso elimina o esforço manual de análise, reduzindo o risco de decisões baseadas em informações desatualizadas ou enviesadas. Além disso, oferece insights estratégicos em tempo real, capacitando usuários a antecipar movimentos de mercado com maior precisão. Essa solução não só economiza tempo, mas também ***democratiza o acesso a análises sofisticadas***, potencializando os resultados de qualquer investidor.
### Grupo 14
* Ana Sofia da Silva Moura
* Elisson Dias de Oliveira 
* Gabriel Fonseca
* Renan Santana Costa
* Toni Cabral Amorim

### Introdução
A análise de notícias financeiras é um componente crítico para investidores e analistas que buscam identificar tendências e tomar decisões embasadas. No entanto, o grande volume de dados e o tempo necessário para interpretá-los representa um grande desafio. A ideia é solucionar esses problemas utilizando ferramentas modernas de IA para transformar notícias em insights relevantes de forma rápida e precisa.

Objetivos do projeto:
* Automatizar a coleta de notícias financeiras.
* Processar e analisar o conteúdo utilizando IA generativa.
* Apresentar os resultados em uma interface acessível e intuitiva.

### Planejamento

Nós havíamos especificado fazer o uso de **Django**, uma vez que o nosso primeiro protótipo de backend foi feito em python**(colocar link aqui)**. Porém, como escolhemos o **Github Pages** para fazer a entrega do MVP, surgiu a demanda de que o site tinha que ser **estático**, ou seja, sem **backend**. Para isso, usamos **React.js**, devido a funcionalidade da package gh-pages de conseguir dar build no site em uma versão estática e upar ela para uma branch chamada **gh-pages**. 

### Observações sobre a organização do ambiente de desenvolvimento:
* O código está nas branches main/ e dev/. O código da branch gh-pages foi gerado automaticamente pelo react, e é a versão do site executada quando se entra no site.
* A documentação do código pode ser encontrada logo abaixo.
* As keys se encontram no front-end, mas estão na base64 pra evitar que robôs que procuram chaves de api achem. (embora nenhuma das duas APIs usadas apresentem custo, então só estou fazendo medidas de segurança muito básicas. Futuramente, quando tivermos um backend, não teremos esse problema.)


### Descrição do Projeto
#### Coleta de Notícias Financeiras:
A primeira etapa do projeto consiste na coleta automatizada de notícias financeiras relacionadas ao mercado de ações. Essa funcionalidade é implementada utilizando a API newsdata.io, que permite buscar informações atualizadas com base em palavras-chave relevantes.
Implementação em Código:

#### Propósito no Projeto: 
A interface conecta o usuário às funcionalidades do sistema, permitindo que ele visualize os resultados de forma organizada e acessível.

---

#### Gerenciamento de Erros:
Para melhorar a experiência do usuário, o sistema possui mecanismos para lidar com erros, como falhas na coleta de notícias ou na interação com a API de IA.
Implementação em Código:

#### Propósito no Projeto: 
Essa funcionalidade garante maior confiabilidade e transparência, informando o usuário sobre eventuais problemas de forma clara.

---

#### Codificação Base64 para Dados Sensíveis
Para proteger chaves de API e outros dados sensíveis, utilizamos a codificação Base64. Essa técnica foi aplicada tanto no frontend quanto em scripts auxiliares escritos em Python.
Implementação em Código em Python:

#### Propósito no Projeto: 
Essa etapa aumenta a segurança do sistema, protegendo informações críticas contra acessos indevidos.

---

O projeto "B3 Vision" demonstra como tecnologias avançadas, como IA generativa e APIs modernas, podem ser integradas para criar soluções práticas e inovadoras no mercado financeiro. Desde a coleta automatizada de dados até a apresentação dos resultados em uma interface amigável, cada módulo do sistema desempenha um papel crucial no alcance dos objetivos propostos.
O "B3 Vision" não apenas simplifica o processo de análise de notícias financeiras, mas também democratiza o acesso a informações valiosas, permitindo que usuários de diferentes níveis de conhecimento tomem decisões mais embasadas e estratégicas.


