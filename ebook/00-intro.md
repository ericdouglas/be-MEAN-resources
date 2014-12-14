#Be MEAN - Criando sistemas inteiros apenas com Javascript

Vamos aprender com esse material a criar um sistema inteiro utilizando apenas nosso querido e amado Javascript. Desde o Frontend até o Banco de Dados. 

![](https://i.cloudup.com/WI6pC8JKia.png) 

##MEAN
![](https://i.cloudup.com/Taslszh86K.jpg)

###O que siginifica MEAN?

Nada mais que a sigla das tecnologias utilizadas:
- [MongoDb](http://mongodb.org/)
- [Express](http://expressjs.com/)
- [AngularJs](https://angularjs.org/)
- [Node.js](http://nodejs.org/)

##Por que usar MEAN?

Hoje essa stack MEAN nos oferece as mesmas funcionalidades que stacks largamente utilizadas como LAMP/MAMP/WAMP, adicionando maior performance, por utilizar tecnologias feitas para escalar como Node.js e MongoDB.

Sem contar que o Javascript é a linguagem mais utilizada na Web, não precisando muito esforço para entender o porquê, já que é a única linguagem que roda nativamente em qualquer navegador e que foi criada especificamente para a Internet, por mais que ainda precise melhorar muito, mas já está no caminho com o ECMAScript 6.

##Arquitetura

Nesse livro iremos criar uma *Single Page Application*, onde nosso Frontend será feito com AngularJS e consumirá os dados do Backend feito com o Node.js e MongoDb.

![](https://i.cloudup.com/bg9bVWvHGG.png)

Como podemos ver nessa imagem nosso sistema será dividido em 3 áreas:

- Front-end
- Back-end
- Banco de dados

Nesse exemplo estamos fazendo a listagem das cervejas, a sequência de eventos é a seguinte:

1. Usuário entra na listagem
2. AngularJs consulta a view no Node.js
3. Node.js compila o Jade e entrega o HTML com marcações do AngularJs
4. AngularJs consulta na API do Node.js a listagem das cervejas
5. Node.js consulta no MongoDb todas as cervejas
6. MongoDb retorna um JSON
7. Node.js retorna um JSON
8. AngularJs recebe e trabalha com o retorno

##História

O Workshop Be MEAN foi criado a partir de uma necessidade.

No mês de Outubro de 2012 aconteceu o [Front in Maceió](http://www.eventick.com.br/frontinmaceio-workshops), porém inicialmente seria um workshop de Node.js e MongoDb que tinha sido acordado com o [Juarez](https://github.com/juarezpaf), o workshop seria na Sexta e o evento no Sábado de manhã.

Quando ele me pergunta na Terça-feira da semana do evento se eu não poderia dar um workshop de AngularJs, porém eu ainda estava estudando naquela época, diferentemente de Node.js e MongoDb q eu ja estudava há 2 anos na época, então perguntei se podia adicionar ele no de Node.js e MongoDb e ele concordou.

E assim nasceu o Workshop Be MEAN que resultou como conteúdo escrito nesse livro.

Desde 2012 muitas coisas mudaram e eu tive que atualizar várias vezes, em 2015 haverão mais ainda, mas nunca podemos deixar de nos atualizar.

Comecei a estudar HTML5, CSS3, Node.js e MongoDb um pouco antes de 2010 quando ainda era professor na [FAFIT](http://www.fafit.com.br/) e antes de sair de lá, para ir trabalhar em São Paulo, dei aula para o oitavo semestre na disciplina de Tópicos Avançados onde pude criar a ementa e ensinei exatamente isso: HTML5, CSS3, Node.js e MongoDb. Porém na época só existia 1 livro em inglês de HTML5, mas nem por isso deixei de estudar e ensinar os outros.

Precisamos estar sempre nos atualizando e esse livro é um exemplo prático disso, espero que seja útil para você como foi para meus alunos.

Para saber mais do [Workshop Be MEAN entre aqui http://bemean.com.br/](http://bemean.com.br/).











