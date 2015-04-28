# Node.js

## INTRO - TEORIA

### Hello World

Vamos ao código do nosso Hello World:

```js
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(3000);
console.log('Server running at http://localhost:3000/');
```

Na primeira linha estamos chamando o módulo [http](http://nodejs.org/api/http.html) do Node.js o qual é responsável por toda a comunicação via o protocolo [HTTP](http://pt.wikipedia.org/wiki/Hypertext_Transfer_Protocol).

Logo abaixo estamos executando a função [createServer](http://nodejs.org/api/http.html#http_http_createserver_requestlistener) o qual recebe como parâmetro uma [função anônima](http://pt.stackoverflow.com/questions/9936/como-funcionam-fun%C3%A7%C3%B5es-an%C3%B4nimas) com 2 parâmetros:

- **req**: request
- **res**: response

E eles são os objetos que sempre teremos nessa função já que o *resquest* é o objeto que possui todas as informações das requisições que chegam nesse server, que acabamos de criar, e o *response* é o objeto que possui as informações da resposta que vamos enviar.

Dentro dessa função primeiramente estamos setando o [código 200](http://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#200_OK) da resposta e o cabeçalho `Content-type` com o valor `text/plain`. E isso diz quem minha respostá será um texto puro.

Logo após temos o `res.end('Hello World');` que irá fechar a conexão do cliente com o servidor, enviando o texto `Hello World`. Depois iniciamos o servidor, propriamente dito, na porta 3000.

Vamos fazer uma pequena modificação:

```js
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;chaset=utf-8'});
  res.write('<h1>Hello World</h1>');
  res.end('<h2>Hoje está um belo dia :p</h2>');
}).listen(3000);
console.log('Server running at http://localhost:3000/');
```

Agora além de modificarmos o cabeçalho para retornar HTML em UTF-8, também enviamos a tag `<h1>Hello World</h1>` via `res.write` e `<h2>Hoje está um belo dia :p</h2>` via `res.end`. Como vimos anteriormente o `res.end` envia uma mensagem finalizando a conexão e esse `res.send`?

####res.send
Esse método realiza uma infinidade de tarefas úteis para respostas não-streaming simples como atribuir automaticamente o Content-Length, a menos que previamente definindo e provendo o HEAD automático e limpeza de cache HTTP.

```js
res.send(new Buffer('buferando'));
res.send({ algum: 'json' });
res.send('algum html');
res.send(404, 'Não achei!');
res.send(500, { error: 'FFFFFUUUUUUU' });
res.send(200);
```

Quando um buffer é enviado o Content-Type é definido como “application / octet-stream” a menos que previamente definido, como mostrado abaixo:

```js
res.set('Content-Type', 'text/html');
res.send(new Buffer('<h1>Be MEAN</h1>'));

```

Legal podemos enviar HTML direto na nossa resposta, mas é claro que não usamos dessa forma, então qual seria a melhor forma?

Ler um arquivo HTML e enviar seu conteúdo nessa resposta, como veremos a seguir.

## FileSystem

Para retornamos um HTML lido pelo Node.js, utilizamos o módulo `fs` ([FileSystem](http://nodejs.org/api/fs.html)) para ler/escrever arquivos. Esse módulo é um dos mais importantes do Node.js, pois proporciona grandes poderes e com grandes poderes vem grandes responsabilidades :p

```js
var http = require('http')
  , fs = require('fs')
  ;

http.createServer(function (req, res) {
  var index = fs.readFileSync('index.html');
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.end(index);
}).listen(3000);
console.log('Server running at http://localhost:3000/');
```

Nesse caso usamos a função [fs.readFileSync](http://nodejs.org/api/fs.html#fs_fs_readfilesync_filename_options) que é a versão síncrona da [fs.readFile](http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback)

**DICA IMPORTANTE!!!!**

> Todas as funções do Node.js são por padrão assíncronas, caso você necessite usar alguma de forma síncrona deverá usar sua versão com `Sync` no final.

Vamos entender um pouco melhor qual a diferença entre as 2. Observe o código abaixo que irá ler um arquivo de forma síncrona.

```js
var fs = require('fs');

console.log('Vou ler', Date.now());
console.time('leitura');

var file = fs.readFileSync('file.zip');
console.log(file);

console.timeEnd('leitura');
console.log('Ja li', Date.now());
```

Rodando esse código para ele ler um arquivo chamado `file.zip` temos a seguinte saída:

```
➜  node.js  node sync-world.js
Vou ler 1422637149740
<Buffer 50 4b 03 04 14 00 08 00 08 00 63 42 e8 44 00 00 00 00 00 00 00 00 00 00 00 00 23 00 10 00 57 69 6c 66 72 65 64 2e 55 53 2e 53 30 34 45 30 31 2e 48 44 54 ...>
leitura: 2106ms
Ja li 1422637151848
```

Agora vamos rodar o código assíncrono:

```
var fs = require("fs");

console.log("Vou ler", Date.now());
console.time("leitura");
// var file = fs.readFileSync("file.zip");

fs.readFile('file.zip', function(err, data){
    console.log(data);
});

console.timeEnd("leitura");
console.log("Ja li", Date.now());
```

Rodando esse arquivo:

```
➜  node.js  node async-world.js 
Vou ler 1422637230715
leitura: 1ms
Ja li 1422637230718
<Buffer 50 4b 03 04 14 00 08 00 08 00 63 42 e8 44 00 00 00 00 00 00 00 00 00 00 00 00 23 00 10 00 57 69 6c 66 72 65 64 2e 55 53 2e 53 30 34 45 30 31 2e 48 44 54 ...>
```

Conseguiu perceber a diferença? Não foi apenas no tempo, que nesse caso é irrelevante já que o tempo de leitura do arquivo não muda.

Você deve estar se perguntando:

**- Como assim não muda? E aquele leitura: 1ms ali?**

Antes de responder vamos analisar o código síncrono


## Mongoose

Para conectarmos no MongoDb, utilizamos o módulo do `mongoose` com a função `connect`.

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/be-mean-book');
```

No Mongoose possuímos alguns eventos que nos auxiliam no gerenciamento da conexão com o Mongodb, para isso pegamos a informação do `mongoose.connection`, vamos ver alguns abaixo:

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/be-mean-book');

var db = mongoose.connection;

db.on('error', function(err){
    console.log('Erro de conexao.', err);
});
db.on('open', function () {
  console.log('Conexão aberta.');
});
db.on('connected', function(err){
    console.log('Conectado');
});
db.on('disconnected', function(err){
    console.log('Desconectado');
});
```


## Rotas

Para iniciarmos nosso sistema de CRUD com rotas vamos abrir o `hello-world.js` do início e salvar ele como `app.js` em uma pasta nova chamada `rotas`. Depois vamos jogar o código do `exe03.js` o qual cadastra uma cerveja. Ele deve ficar assim:

```js
var http = require('http');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/be-mean-book');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err);
});
db.on('open', function () {
  console.log('Conexão aberta.');
});
db.on('connected', function(err){
    console.log('Conectado');
});
db.on('disconnected', function(err){
    console.log('Desconectado');
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  price: { type: Number, min: 0},
  category: { type: String, default: ''},
  created_at: { type: Date, default: Date.now }
});

var Beer = mongoose.model('Beer', BeerSchema);

var dados = {
  name: 'Skol',
  description: 'Mijo de rato',
  alcohol: 4.5,
  price: 3.0,
  category: 'pilsen'
}

var model = new Beer(dados);

model.save(function (err, data) {
  if (err){
    console.log('Erro: ', err);
  }
  else{
    console.log('Cerveja Inserida: ', data);
  }
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.write('<h1>Hello World</h1>');
  res.end('<h2>Hoje está um belo dia :p</h2>');
}).listen(3000);
console.log('Server running at http://localhost:3000/');
```

A informação de qual rota está sendo requisitada está em `req.url`, como podemos ver no código abaixo:

```js
var http = require('http')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/workshop-online-novembro-2014');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.on('open', function () {
  console.log('Conexão aberta.')
});
db.on('connected', function(err){
    console.log('Conectado')
});
db.on('disconnected', function(err){
    console.log('Desconectado')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  price: { type: Number, min: 0},
  category: { type: String, default: ''},
  created_at: { type: Date, default: Date.now }
});

var Beer = mongoose.model('Beer', BeerSchema);

var dados = {
  name: 'Skol',
  description: 'Mijo de rato',
  alcohol: 4.5,
  price: 3.0,
  category: 'pilsen'
}

var model = new Beer(dados);

// model.save(function (err, data) {
//   if (err){
//     console.log('Erro: ', err);
//   }
//   else{
//     console.log('Cerveja Inserida: ', data);
//   }
// });


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

  console.log('URL: ', req.url);

}).listen(3000);
console.log('Server running at http://localhost:3000/');

```

Agora criamos um teste para verificar se é a rota desejada, caso sim ele, deve inserir a cerveja, se não, deve mostrar `ROTA NÃO ENCONTRADA`.

```js
var http = require('http')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/workshop-online-novembro-2014');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.on('open', function () {
  console.log('Conexão aberta.')
});
db.on('connected', function(err){
    console.log('Conectado')
});
db.on('disconnected', function(err){
    console.log('Desconectado')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  price: { type: Number, min: 0},
  category: { type: String, default: ''},
  created_at: { type: Date, default: Date.now }
});

var Beer = mongoose.model('Beer', BeerSchema);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

  console.log('URL: ', req.url);
  var route = req.url;

  if (route === '/beer/create') {
    var dados = {
      name: 'Skol',
      description: 'Mijo de rato',
      alcohol: 4.5,
      price: 3.0,
      category: 'pilsen'
    }

    var model = new Beer(dados)
      , msg = '';

    model.save(function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro: ' + err;
      }
      else{
        console.log('Cerveja Inserida: ', data);
        msg = 'Cerveja Inserida: ' + JSON.stringify(data);
      }
      res.end(msg);
    });
  } else {
    res.end('ROTA NAO ENCONTRADA!');
  }

}).listen(3000);
console.log('Server running at http://localhost:3000/');

```

Perceba onde está o `res.end` dentro da função assíncrona do mongoose, pois se ela estivesse fora você não conseguiria retornar os dados da função para o `response`.


## DICA: Github

Como esse material é baseado em um workshop, eu peço para meus alunos subirem os exerciícios no [Github](http://github.com) e alguns ainda não estão familiarizados, então vamos lá.

Primeiramente instale o git na sua máquina:

- [MacOS]()
- [Linux]()
- [Windows]()

Depois disso, crie uma conta no Github e vamos adicionar uma chave para você poder acessar sua conta via `ssh`.

Lendo a documentação [Generating SSH keys](https://help.github.com/articles/generating-ssh-keys/), vemos como criamos uma chave ssh no terminal e depois adicionamos na nossa conta no Github.

Depois de feito isso, vamos criar nosso repositório git onde estão nosso arquivos:

```
cd /meus-exercicios
git init
```

Vamos criar o repositório no Github, na página inicial.

![](https://cldup.com/gaixfYqF7R.png)

![](https://cldup.com/XlhjpfR_gm.png)

![](https://cldup.com/zp9Fa7XNfu.png)

Pronto agora você deve copiar essa parte:

```
git remote add origin git@github.com:suissa/dica-be-mean.git
```

Volte para o terminal e vamos adicionar os arquivos para comitá-los:

```
git add .
git commit -m 'Subindo os exercícios'
git remote add origin git@github.com:suissa/dica-be-mean.git
git push origin master
```

E está lá, quando você der refresh na página do repositório já verá seus arquivos, fácil não?


## Voltando ao assunto


Vamos refatorar para um objeto que encapsule toda a lógica do CRUD.

```js
var http = require('http')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/workshop-online-novembro-2014');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.on('open', function () {
  console.log('Conexão aberta.')
});
db.on('connected', function(err){
    console.log('Conectado')
});
db.on('disconnected', function(err){
    console.log('Desconectado')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  price: { type: Number, min: 0},
  category: { type: String, default: ''},
  created_at: { type: Date, default: Date.now }
});

var Beer = mongoose.model('Beer', BeerSchema)
  , _beer = {
    create: ,
    retrieve: ,
    update: ,
    delete: ,
  }



http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

  console.log('URL: ', req.url);
  var route = req.url
    , msg = '';

  switch (route) {
    case '/beer/create':
      var dados = {
        name: 'Skol',
        description: 'Mijo de rato',
        alcohol: 4.5,
        price: 3.0,
        category: 'pilsen'
      }

      var model = new Beer(dados);

      model.save(function (err, data) {
        if (err){
          console.log('Erro: ', err);
          msg = 'Erro: ' + err;
        }
        else{
          console.log('Cerveja Inserida: ', data);
          msg = 'Cerveja inserida: ' + JSON.stringify(data);
        }
        res.end(msg);
      });
      break;

    case '/beer/retrieve':
      Beer.find(query, function (err, data) {
        if (err) {
          console.log('Erro: ', err);
            msg = 'Erro: ' + err;
        } else {
          console.log('Listagem: ', data);
            msg = 'Cervejas listadas: ' + JSON.stringify(data);
        }
        res.end(msg);
      });
      break;

    case '/beer/update':
      var query = {name: /skol/i};

      var mod = {
        alcohol: 666
      };

      var optional = {
        upsert: false,
        multi: true
      };

      Beer.update(query, mod, optional, function (err, data) {
        if (err){
          console.log('Erro: ', err);
          msg = 'Erro: ' + err;
        }
        else{
          console.log('Cervejas atualizadas com sucesso: ', data);
          msg = 'Cervejas alteradas: ' + data;
        }
        res.end(msg);
      });
    break;
    case '/beer/delete':
      var query = {name: /skol/i};

      // É multi: true CUIDADO!
      Beer.remove(query, function(err, data) {
        if(err) {
          console.log(err);
          msg = 'Erro: ' + err;
        } else {
          console.log('Cerveja deletada com sucesso, quantidade: ', data);
          msg = 'Cervejas deletadas: ' + data;
        }
        res.end(msg);
      });
    break;
    default: res.end('ROTA NAO ENCONTRADA!');
  };

}).listen(3000);
console.log('Server running at http://localhost:3000/');

```


Agora nós passamos a lógica que está no switch para uma `function` para cada ação do nosso objeto `_beer`.

```js
var http = require('http')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/workshop-online-novembro-2014');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.on('open', function () {
  console.log('Conexão aberta.')
});
db.on('connected', function(err){
    console.log('Conectado')
});
db.on('disconnected', function(err){
    console.log('Desconectado')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  price: { type: Number, min: 0},
  category: { type: String, default: ''},
  created_at: { type: Date, default: Date.now }
});

var Beer = mongoose.model('Beer', BeerSchema)
  , _beer = {
    create: function (req, res) {

      var dados = {
        name: 'Skol',
        description: 'Mijo de rato',
        alcohol: 4.5,
        price: 3.0,
        category: 'pilsen'
      }

      var model = new Beer(dados);

      model.save(function (err, data) {
        if (err){
          console.log('Erro: ', err);
          msg = 'Erro: ' + err;
        }
        else{
          console.log('Cerveja Inserida: ', data);
          msg = 'Cerveja inserida: ' + JSON.stringify(data);
        }
        res.end(msg);
      });
    }
    , retrieve: function (req, res) {

      var query = {};

      Beer.find(query, function (err, data) {
        if (err) {
          console.log('Erro: ', err);
            msg = 'Erro: ' + err;
        } else {
          console.log('Listagem: ', data);
            msg = 'Cervejas listadas: ' + JSON.stringify(data);
        }
        res.end(msg);
      });

    }
    , update: function (req, res) {

      var query = {name: /skol/i}
        , mod = {
          alcohol: 666,
        }
        , optional = {
          upsert: false,
          multi: true
        };

      Beer.update(query, mod, optional, function (err, data) {
        if (err){
          console.log('Erro: ', err);
          msg = 'Erro: ' + err;
        }
        else{
          console.log('Cervejas atualizadas com sucesso: ', data);
          msg = 'Cervejas alteradas: ' + data;
        }
        res.end(msg);
      });
    }
    , delete: function (req, res) {

      var query = {name: /skol/i};

      // É multi: true CUIDADO!
      Beer.remove(query, function(err, data) {
        if(err) {
          console.log(err);
          msg = 'Erro: ' + err;
        } else {
          console.log('Cerveja deletada com sucesso, quantidade: ', data);
          msg = 'Cervejas deletadas: ' + data;
        }
        res.end(msg);
      });
    }
  };


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

  console.log('URL: ', req.url);
  var route = req.url
    , msg = '';

  switch (route) {
    case '/beer/create':
      _beer.create(req, res);
    break;
    case '/beer/retrieve':
      _beer.retrieve(req, res);
    break;
    case '/beer/update':
      _beer.update(req, res);
    break;
    case '/beer/delete':
      _beer.delete(req, res);
    break;
    default: res.end('ROTA NAO ENCONTRADA!');
  };

}).listen(3000);
console.log('Server running at http://localhost:3000/');

```

Mas nosso arquivo ainda está uma bagunça, e é agora que vamos começar a **modularizar** nosso código!

## Linkar sobre `module.exports = exports`

Vamos iniciar retirando a parte do MongoDb do nosso arquivo do servidor HTTP.

```js

  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/workshop-online-novembro-2014');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.on('open', function () {
  console.log('Conexão aberta.')
});
db.on('connected', function(err){
    console.log('Conectado')
});
db.on('disconnected', function(err){
    console.log('Desconectado')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  price: { type: Number, min: 0},
  category: { type: String, default: ''},
  created_at: { type: Date, default: Date.now }
});

var Beer = mongoose.model('Beer', BeerSchema)
```

Agora temos um Model porém ele ainda não é um módulo do Node.js, para isso precisamos exportar o objeto Beer utilizando `module.exports`:

`models/beer.js`

```js
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/workshop-online-novembro-2014');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.on('open', function () {
  console.log('Conexão aberta.')
});
db.on('connected', function(err){
    console.log('Conectado')
});
db.on('disconnected', function(err){
    console.log('Desconectado')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  price: { type: Number, min: 0},
  category: { type: String, default: ''},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Beer', BeerSchema);

```

Retirando o nosso Model do `app`, precisamos importá-lo para que o código continue funcionando, por isso vamos chamá-lo com `require`:

```js
var http = require('http')
  , Beer = require('./models/beer')
  , _beer = {
    create: function (req, res) {

      var dados = {
        name: 'Skol',
        description: 'Mijo de rato',
        alcohol: 4.5,
        price: 3.0,
        category: 'pilsen'
      }

      var model = new Beer(dados);

      model.save(function (err, data) {
        if (err){
          console.log('Erro: ', err);
          msg = 'Erro: ' + err;
        }
        else{
          console.log('Cerveja Inserida: ', data);
          msg = 'Cerveja inserida: ' + JSON.stringify(data);
        }
        res.end(msg);
      });
    }
    , retrieve: function (req, res) {

      var query = {};

      Beer.find(query, function (err, data) {
        if (err) {
          console.log('Erro: ', err);
            msg = 'Erro: ' + err;
        } else {
          console.log('Listagem: ', data);
            msg = 'Cervejas listadas: ' + JSON.stringify(data);
        }
        res.end(msg);
      });

    }
    , update: function (req, res) {

      var query = {name: /skol/i}
        , mod = {
          alcohol: 666,
        }
        , optional = {
          upsert: false,
          multi: true
        };

      Beer.update(query, mod, optional, function (err, data) {
        if (err){
          console.log('Erro: ', err);
          msg = 'Erro: ' + err;
        }
        else{
          console.log('Cervejas atualizadas com sucesso: ', data);
          msg = 'Cervejas alteradas: ' + data;
        }
        res.end(msg);
      });
    }
    , delete: function (req, res) {

      var query = {name: /skol/i};

      // É multi: true CUIDADO!
      Beer.remove(query, function(err, data) {
        if(err) {
          console.log(err);
          msg = 'Erro: ' + err;
        } else {
          console.log('Cerveja deletada com sucesso, quantidade: ', data);
          msg = 'Cervejas deletadas: ' + data;
        }
        res.end(msg);
      });
    }
  };

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

  console.log('URL: ', req.url);
  var route = req.url
    , msg = '';

  switch (route) {
    case '/beer/create':
      _beer.create(req, res);
    break;
    case '/beer/retrieve':
      _beer.retrieve(req, res);
    break;
    case '/beer/update':
      _beer.update(req, res);
    break;
    case '/beer/delete':
      _beer.delete(req, res);
    break;
    default: res.end('ROTA NAO ENCONTRADA!');
  };

}).listen(3000);
console.log('Server running at http://localhost:3000/');

```

Porém, ainda temos a lógica do CRUD no mesmo arquivo do servidor HTTP, então vamos modularizar ele também, removemos esse código do `app` e colocando em um arquivo novo chamado `beers.js`, criando uma pasta nova chamada `controllers`:

```js
_beer = {
    create: function (req, res) {

      var dados = {
        name: 'Skol',
        description: 'Mijo de rato',
        alcohol: 4.5,
        price: 3.0,
        category: 'pilsen'
      }

      var model = new Beer(dados);

      model.save(function (err, data) {
        if (err){
          console.log('Erro: ', err);
          msg = 'Erro: ' + err;
        }
        else{
          console.log('Cerveja Inserida: ', data);
          msg = 'Cerveja inserida: ' + JSON.stringify(data);
        }
        res.end(msg);
      });
    }
    , retrieve: function (req, res) {

      var query = {};

      Beer.find(query, function (err, data) {
        if (err) {
          console.log('Erro: ', err);
            msg = 'Erro: ' + err;
        } else {
          console.log('Listagem: ', data);
            msg = 'Cervejas listadas: ' + JSON.stringify(data);
        }
        res.end(msg);
      });

    }
    , update: function (req, res) {

      var query = {name: /skol/i}
        , mod = {
          alcohol: 666,
        }
        , optional = {
          upsert: false,
          multi: true
        };

      Beer.update(query, mod, optional, function (err, data) {
        if (err){
          console.log('Erro: ', err);
          msg = 'Erro: ' + err;
        }
        else{
          console.log('Cervejas atualizadas com sucesso: ', data);
          msg = 'Cervejas alteradas: ' + data;
        }
        res.end(msg);
      });
    }
    , delete: function (req, res) {

      var query = {name: /skol/i};

      // É multi: true CUIDADO!
      Beer.remove(query, function(err, data) {
        if(err) {
          console.log(err);
          msg = 'Erro: ' + err;
        } else {
          console.log('Cerveja deletada com sucesso, quantidade: ', data);
          msg = 'Cervejas deletadas: ' + data;
        }
        res.end(msg);
      });
    }
  };
```

Só que ele ainda não é um módulo, então vamos exportar ele com `module.exports` e importar o módulo do Model `beer`:

```js
var Beer = require('../models/beer')
  , msg = '';

module.exports = {
  create: function (req, res) {

    var dados = {
      name: 'Skol',
      description: 'Mijo de rato',
      alcohol: 4.5,
      price: 3.0,
      category: 'pilsen'
    }

    var model = new Beer(dados);

    model.save(function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro: ' + err;
      }
      else{
        console.log('Cerveja Inserida: ', data);
        msg = 'Cerveja inserida: ' + JSON.stringify(data);
      }
      res.end(msg);
    });
  }
  , retrieve: function (req, res) {

    var query = {};

    Beer.find(query, function (err, data) {
      if (err) {
        console.log('Erro: ', err);
          msg = 'Erro: ' + err;
      } else {
        console.log('Listagem: ', data);
          msg = 'Cervejas listadas: ' + JSON.stringify(data);
      }
      res.end(msg);
    });

  }
  , update: function (req, res) {

    var query = {name: /skol/i}
      , mod = {
        alcohol: 666,
      }
      , optional = {
        upsert: false,
        multi: true
      };

    Beer.update(query, mod, optional, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro: ' + err;
      }
      else{
        console.log('Cervejas atualizadas com sucesso: ', data);
        msg = 'Cervejas alteradas: ' + data;
      }
      res.end(msg);
    });
  }
  , delete: function (req, res) {

    var query = {name: /skol/i};

    // É multi: true CUIDADO!
    Beer.remove(query, function(err, data) {
      if(err) {
        console.log(err);
        msg = 'Erro: ' + err;
      } else {
        console.log('Cerveja deletada com sucesso, quantidade: ', data);
        msg = 'Cervejas deletadas: ' + data;
      }
      res.end(msg);
    });
  }
};
```

Pronto! Agora voltamos no `app` e deixamos ele como no slide:

```js
var http = require('http')
  , Beer = require('./controllers/beers');


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

  console.log('URL: ', req.url);
  var route = req.url;

  switch (route) {
    case '/beer/create':
      Beer.create(req, res);
    break;
    case '/beer/retrieve':
      Beer.retrieve(req, res);
    break;
    case '/beer/update':
      Beer.update(req, res);
    break;
    case '/beer/delete':
      Beer.delete(req, res);
    break;
    default: res.end('ROTA NAO ENCONTRADA!');
  };

}).listen(3000);
console.log('Server running at http://localhost:3000/');

```

Mas nosso código ainda pode melhorar. Vamos separar a conexão do MongoDb do *Model*, para isso vamos retirar todo o código da conexão e salvar em `config/db`:

```js
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/workshop-online-novembro-2014');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.on('open', function () {
  console.log('Conexão aberta.')
});
db.on('connected', function(err){
    console.log('Conectado')
});
db.on('disconnected', function(err){
    console.log('Desconectado')
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

require('../models/index');
```

Note a última linha onde eu chamo `require('../models/index');`, para que serve isso?

Ai que está a jogada, para centralizarmos a conexão, também centralizaremos a importação dos *Models* para o projeto, chamando esse `models/index.js`.

```js
// index.js
var MODELS_FOLDER = './models';
require('fs')
  .readdirSync(MODELS_FOLDER)
  .forEach(function(file) {
    // Remove index from models
    if(file !== 'index.js'){
      require('./'+file);
      console.log('Add model: ', file);
    }
  });

```

Esse arquivo apenas lê os arquivos da pasta `models`, e dá um `require` para que não precisemos fazer isso nos *Controllers* que os forem usar.

Seu arquivo `models/beer.js` vai ficar assim:

```js
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name : { type : String, default : '', required : true },
  description : { type : String, default : '' },
  alcohol : { type : Number, min : 0 },
  price : { type : Number, min : 0 },
  category : { type : String, default : '' },
  created_at : { type : Date, default : Date.now }
});

module.exports = mongoose.model( 'Beer', BeerSchema );
```

Agora no nosso *Controller* precisamos mudar a chamada do *Model* para:

```js
var mongoose = require('mongoose')
  , Beer = mongoose.model('Beer')
  , msg = '';
```

E no `app.js` ficará:

```js
var http = require('http')
  , db = require('./config/db')
  , Beer = require('./controllers/beers')
  ;
```

O *require* do `config/db` vem antes do *Controller* para que os *Models* ja estejam importados, em cache, para que possamos apenas chamá-lo.

[MongoDB](https://github.com/ericdouglas/be-MEAN-resources/blob/master/ebook/01-mongodb.md) | [Express](https://github.com/ericdouglas/be-MEAN-resources/blob/master/ebook/03-express.md)