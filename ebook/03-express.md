# Express

![](https://i.cloudup.com/OgEsvIwmiL.png)

Vamos criar um pequeno "Hello World" com o Express com o seguinte código:

```js
var express = require('express')
  , app = express()
  ;

app.get('/hello', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});
app.listen(3000);
```

Antes de rodar esse código você precisa instalar localmente o Express com:

```sh
npm install express
```

Com isso criamos uma rota `/hello` que será acessada via `GET` e executará a seguinte função de *callback* que enviará o `Hello World` via `res.end`.

Tudo bem isso ainda está muito básico então vamos usar o `express-generator`. Para isso vamos instalá-lo globalmente.

```sh
npm i -g express-generator
```

Depois vamos gerar nosso *boilerplate* com o comando `express`:

```sh
express nome-projeto
cd nome-projeto
npm install
```

Após instaladas as dependências locais podemos rodar o projeto com:

```sh
npm start
```