# Node.js

## INTRO - TEORIA

### Hello World

```js
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(3000);
console.log('Server running at http://localhost:3000/');
```


## EXPLICAR O REQ, RES, WRITE, END ETC


```js
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;chaset=utf-8'});
  res.write('<h1>Hello World</h1>');
  res.end('<h2>Hoje está um belo dia :p</h2>');
}).listen(3000);
console.log('Server running at http://localhost:3000/');
```

## FileSystem

Para retornamos um HTML lido pelo Node.js, utilizamos o módulo `fs` (FileSystem) para ler/escrever arquivos. Esse módulo é um dos mais importantes do Node.js, pois proporciona grandes poderes e com grandes poderes vem grandes responsabilidades :p

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

Agora no nosso *Controller* precisamos mudar a chamada do *Model* para:

```
var mongoose = require('mongoose')
  , Beer = mongoose.model('Beer')
  , msg = '';
```

E no `app.js` ficará:

```
var http = require('http')
  , db = require('./config/db')
  , Beer = require('./controllers/beers')
  ;
```

O *require* do `config/db` vem antes do *Controller* para que os *Models* ja estejam importados, em cache, para que possamos apenas chamá-lo.