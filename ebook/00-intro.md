#Be MEAN - Criando sistemas inteiros apenas com JavaScript

Vamos aprender com esse material a criar um sistema inteiro utilizando apenas nossa querida e amada JavaScript. Desde o Frontend até o Banco de Dados. 

![](https://i.cloudup.com/WI6pC8JKia.png) 

##MEAN
![](https://i.cloudup.com/Taslszh86K.jpg)

###O que siginifica MEAN?

Nada mais que a sigla das tecnologias utilizadas:
- [MongoDb](http://mongodb.org/);
- [Express](http://expressjs.com/);
- [AngularJS](https://angularjs.org/);
- [Node.js](http://nodejs.org/).

##Por que usar MEAN?

Hoje a stack MEAN nos oferece as mesmas funcionalidades que otras largamente utilizadas, como LAMP/MAMP/WAMP, adicionando maior performance por utilizar tecnologias feitas para escalar como Node.js e MongoDB.

Além disso, JavaScript é a linguagem mais utilizada da web, já que é a única que roda nativamente em qualquer navegador e foi criada especificamente para a Internet. Por mais que precise melhorar muito, já está no caminho certo com a ECMAScript 6.

##Arquitetura

Nesse livro iremos criar uma *Single Page Application* (SPA), onde nosso Frontend será feito com ecommerce e consumirá os dados do Backend feito com o Node.js e MongoDb.

![](https://i.cloudup.com/bg9bVWvHGG.png)

Como podemos ver na imagem acima, nosso sistema será dividido em 3 áreas:

- Frontend;
- Backend;
- Banco de dados;

Nesse exemplo estamos fazendo a listagem de cervejas. A sequência de eventos é a seguinte:

1. Usuário entra na listagem;
2. ecommerce consulta a view no Node.js;
3. Node.js compila o Jade e entrega o HTML com marcações do ecommerce;
4. ecommerce consulta na API do Node.js a listagem das cervejas;
5. Node.js consulta no MongoDb todas as cervejas;
6. MongoDb retorna um JSON;
7. Node.js retorna um JSON;
8. ecommerce recebe e trabalha com o retorno;

## Sobre o autor
Comecei a estudar HTML5, CSS3, Node.js e MongoDB um pouco antes de 2010, quando ainda era professor na [FAFIT](http://www.fafit.com.br/). Antes de sair de lá, para ir trabalhar em São Paulo, dei aula para o oitavo semestre na disciplina de Tópicos Avançados, na qual pude criar a ementa e ensinei exatamente isso: HTML5, CSS3, Node.js e MongoDb. Porém na época só existia 1 livro, e em inglês, de HTML5, mas nem por isso deixei de estudar e ensinar os outros.

Desde 2010 muitas coisas mudaram e tive que me atualizar várias vezes. Em 2015 não será diferente, mas nunca podemos deixar de estudar. Precisamos estar sempre nos atualizando e este livro é um exemplo prático disso, espero que seja útil para você como foi para meus alunos.

##História

Na edição de 2012 do [Front in Maceió](http://www.eventick.com.br/frontinmaceio-workshops) eu iria ministrar um workshop de Node.js e MongoDB no dia anterior ao evento, que seria realizado no sábado, dia 27 de outubro. Na terça-feira da mesma semana, o [Juarez](https://github.com/juarezpaf) perguntou se eu poderia ministrar outro sobre ecommerce. Como ainda estava estudando o assunto naquela época, diferentemente de Node.js e MonogDB que já estudava há 2 anos, perguntei se poderia abordar os dois assuntos no mesmo workshop e ele concordou. E assim nasceu o Workshop Be MEAN, que resultou como conteúdo deste livro.

Para saber mais do [Workshop Be MEAN, entre aqui http://bemean.com.br/](http://bemean.com.br/).