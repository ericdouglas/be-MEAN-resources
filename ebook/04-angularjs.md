# AngularJs

![Angularjs](https://i.cloudup.com/_O1Y7F0CfP.png)

## Introdução

O AngularJS é um framework criado por Misko Hevery e mantido pelo Google.

Ele trabalha com uma estrutura de MVC e um ótimo sistema de two way
data-bindings, além de suas diretivas darem super-poderes ao HTML.

Como o AngularJs é um framework e não uma biblioteca como o jQuery, o modo
de se trabalhar com ele é um pouco diferente do que éramos acostumados.

Para iniciarmos uma aplicação com o AngularJs, precisamos adicionar
o atributo ng-app em alguma tag do nosso HTML, normalmente em body ou html.

### Dica

Vamos instalar um servidor web em Node.js para que possamos rodar nossos
arquivos com AngularJs:

```sh
npm install -g http-server
```

E para rodarmos, basta ir na pasta onde estão nosso arquivos e rodar:

```sh
http-server
Starting up http-server, serving ./ on port: 8080
Hit CTRL-C to stop the server
```

## Iniciando - Guia Rápido

Para iniciar uma aplicação com o AngularJs possuímos 3 formas: 

- ng-app
- ng-app + angular.module
- angular.bootstrap

Vamos usamos a diretiva `ng-app` como visto no exemplo do exercício 01:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Workshop Be MEAN</title>
</head>
<!-- Iniciando minha aplicação com ng-app -->
<body data-ng-app>
  <!-- Parseando essa expressão -->
    {{ 2 + 2}}
    <script src="angular.min.js"></script>
</body>
</html>
```

Mas usando apenas dessa forma nós não temos controle sobre nossa aplicação, então para isso vamos nomear nossa aplicação e criar um módulo para ela como visto abaixo no exercício 02:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Workshop Be MEAN</title>
</head>
<html>
  <!-- Inicio minha aplicação com um nome -->
  <body data-ng-app="workshopBeMEAN">

    Olá mundo, 2 + 2 = {{ 2 + 2}}

    <script src="angular.min.js"></script>
    <script>
    // iniciando um módulo com o nome da nossa aplicação
      angular.module('workshopBeMEAN', []);
    </script>
  </body>
</html>
```

## Two way data-binding

Agora vamos entrar no mundo do *two way data-binding*, mas o que seria isso?

Basicamente, ele trabalha amarrando um elemento da `view` com o seu `model`, onde quando a `view` mudar de valor, *automagicamente* o valor do `model` também será alterado. E como isso é feito?

Infelizmente com *dirty checking*, onde em cada ciclo do `$digest` o Angular compara todos os valores, se mudaram ele atualiza onde é necessário. Isso acarreta problemas de performance quando você possuir mais de 2000 objetos sendo "observados".

Já que quando criamos uma variável no `$scope`, ou um objeto na view esse valor já estará sendo "observado", o número de objetos pode crescer sem muito controle e comprometer sua performance, para isso existe a técnica de [bind Once](https://github.com/tadeuszwojcik/angular-once).

Vamos voltar ao nosso exercício 03:

```html
<body data-ng-app="workshopBeMEAN">

  <!-- Adicionamos um input para inserirmos um valor para nome
      adicionamos o atributo ng-model para linkarmos o valor
      na váriavel do nosso escopo local $scope.nome
      Ou seja
      Estou criando uma variável nome
   -->
  <label for="nome">Seu nome: 
    <input type="text" data-ng-model="nome"> 
  </label>


  <!-- Utilizamos o valor de nome que está no nosso escopo local -->
  Olá mundo, {{ nome }}
  <!-- O valor em {{ nome }} é atualizado automagicamente através
      do two-way data binding
  -->

  <script src="angular.min.js"></script>
  <script>
    angular.module('workshopBeMEAN', []);

  </script>
</body>
```

Então agora eu adicionei um `input` que fará o papel do nosso `model` e adicionei um texto chamando a variável `nome` que fará o papel da nossa `view`.

Logo quando eu modificar o valor do meu `model` automagicamente a `view` será atualizada. Para ver isso funcionando basta digitar qualquer coisa no input.

Vamos pegar o exercício03 e salvar como exercício04 para ficar como abaixo:

```html
<!doctype html>
<html data-ng-app="workshopBeMEAN">
  <head>
    <title>{{ workshop }}</title>
  </head>
  <body>
    <!-- Adicionamos um input para inserirmos um valor para nome
        adicionamos o atributo nd-model para linkarmos o valor
        na váriavel do nosso escopo local $scope.nome
     -->
    <label for="nome">Seu nome: 
      <input type="text" data-ng-model="nome"> 
    </label>
    <!-- Utilizamos o valor de nome que está no nosso escopo local -->
    Olá mundo, {{ nome }}
    <!-- O valor em {{ nome }} é atualizado automagicamente através
        do two-way databinding
    -->
    <label for="workshop">Workshop: 
      <input type="text" data-ng-model="workshop"> 
    </label>


    <script src="angular.min.js"></script>
    <script>
      angular.module('workshopBeMEAN', []);
    </script>
  </body>
</html>
```

Ai você me pergunta: "mas o que tem de mais nesse ex04"?

Bom, primeiramente, mudamos nosso `ng-app` para o `html` para que possamos ter controle das tags do AngularJs em qualquer parte do nosso documento html.

Além de mudarmos o `ng-app`, colocamos uma expressão de variável na tag `title` a fim de mostrar como, dependendo de onde o `ng-app` é declarado, o AngularJs consegue parsear expressões em todo o documento.

Logo, se você escrever qualquer valor no input do workshop você verá o título da sua página ser modificado enquanto você digita.


## Filters

Os filtros são funções que servem para o tratamento visual de valores na view, logo, eles não modificam o valor original, modificam apenas para exibição. Um exemplo simples disso é formatar uma data a partir de um timestamp. 

Vamos agora para o exercício05 onde iremos utilizar um filtro padrão do AngularJs e um filtro criado por nós. Para utilizarmos um filtro, precisamos chamar o nome dele após o `|`, quando estiver depois de uma variável ou diretiva.

Podemos utilizar um ou mais filtros ao mesmo tempo, como podemos ver no código do exercício05:

```html
<body>
    <p>
      <h3>Olá mundo, {{ nome | reverseName | uppercase }}</h3>

      <!-- Adicionamos um input para inserirmos um valor para nome
        adicionamos o atributo nd-model para linkarmos o valor
        na váriavel do nosso escopo local $scope.nome
     -->
      <label for="nome">Seu nome: 
        <input type="text" data-ng-model="nome"> 
      </label>

      <!-- O valor em {{ nome }} é atualizado automagicamente através
          do two-way databinding
      -->
      <br>
      <label for="workshop">Workshop: <input type="text" data-ng-model="workshop"> </label>
    </p>

    <script src="angular.min.js"></script>
    <script>
      angular.module('workshopBeMEAN', [])
      .filter('reverseName', function () {
        return function (text) {
          if(text)
            return text.split("").reverse().join("");
        };
      });
    </script>
  </body>
```

Aqui nós chamamos o filtro:

```html
<h3>Olá mundo, {{ nome | reverseName | uppercase }}</h3>
```

Logo após a variável `nome`, chamamos o filtro `reverseName` e o `uppercase`. O filtro `reverseName` foi definido abaixo:

```html
<script>
  angular.module('workshopBeMEAN', [])
  .filter('reverseName', function () {
    return function (text) {
      if(text)
        return text.split("").reverse().join("");
    };
  });
</script>
```

Todos os filtros precisam receber ao menos um parâmetro, que será o valor a ser modificado por ele, porém, também podemos utilizar mais paramêtros como veremos mais para frente.

No filtro `reverseName`, o texto se transforma em um `array` com `split("")` para depois ser invertido com `reverse()`, e aí sim ser juntado novamente como uma `string`, pois o Javascript não possui um método nativo de inversão de strings.

No exercício06 vamos ver alguns filtros simples e padrões do AngularJs:

```html
<p>
  <label>Lower<input type="text" data-ng-model="lower"> </label>
  <br>
  <strong>Minúsculas</strong>
  Lowercase {{lower}}: {{ lower | lowercase }}
</p>
<p>
    <strong>Número de casas decimais.</strong>
    Number: {{ 1234 | number:2 }}
</p>
<p>
    <strong>Formatação de datas com timestamp</strong>
    Date: {{ 1402772567464 | date:'dd/MM/yyyy HH:mm:ss Z'}}

</p>
<p> 
  <strong>Formatação de moeda</strong>
    <input type="number" ng-model="amount"> <br>
    default currency symbol ($): 
      <span id="currency-default">{{amount | currency}}</span><br>
    custom currency identifier (R$): 
      <span>{{amount | currency:"R$"}}</span>
</p>
```

### Filtros - Parâmetros

Para utilizarmos mais de um parâmetro em um filtro precisamos apenas passar o valor após um `:`, como podemos ver no exemplo do exercício07:

```html
<h3>Olá mundo, {{ nome | truncate:4:'... veja mais' }}</h3>
```

Sendo que nossa função do filtro fica assim:

```js
.filter('truncate', function () {
  return function (text, length, end) {
    if(text){
      if (isNaN(length))
          length = 10;
      if (end === undefined)
          end = "...";
      if (text.length <= length) {
          return text;
      }
      else {
          return String(text).substring(0, length) + end;
      }

    }
  };
});
```

Para utilizarmos parâmetros em nossos filtros precisamos apenas declarar mais argumentos na função do callback:

```js
return function (text, length, end)
```

E para passarmos os parâmetros na chamada do filtro precisamos apenas separá-los por `:` como no nosso exemplo:

```html
{{ nome | truncate:4:'... veja mais' }}
```


Perceba também que criamos um módulo para nossos filtros e apenas injetamos ele no módulo da nossa aplicação, será dessa forma que iremos modularizar nosso código no AngularJs.

```html
<script>
  angular.module('workshopBeMEAN', ['workshopFilters']);

  angular.module('workshopFilters', [])
  .filter('reverseName', function () {
    return function (text) {
      if(text)
        return text.split("").reverse().join("");
    };
  })
  .filter('truncate', function () {
    return function (text, length, end) {
      if(text){
        if (isNaN(length))
            length = 10;
        if (end === undefined)
            end = "...";
        if (text.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length) + end;
        }

      }
    };
  });

</script>
```

##Controllers

Os Controllers trabalham diretamente com a `view`, podendo setar novos valores que serão visíveis nela, porém não se aconselha adicionar muita lógica nele, pois não é re-usável. 

Além da discussão atual sobre, pois eles não existirão no AngularJs 2.0. Para isso devemos tentar utilizar o mínimo dele apenas para utilizarmos os `Services` os quais conterão nossa lógica, por isso o AngularJs é um MVVM (Mode, View, ViewModel) pois o `Controller` na verdade só liga os 2 sem realmente precisar conter lógica.

Vamos criar um `Controller`e injetar o `$scope` para que ele possa criar variáveis acessíveis na nossa `View`:

```js
angular.module('workshopBeMEAN', ['workshopFilters'])
.controller('BeerController', ['$scope',
  function($scope){
    $scope.reverse = false;
    $scope.predicate = 'name';
    // criamos um array de cervejas
    var cervejas = [
      {
        name: 'Kaiser', 
        price: 2
      }, 
      {
        name: 'Skol', 
        price: 3
      }, 
      {
        name: 'Glacial', 
        price: 4
      }, 
      {
        name: 'Polar', 
        price: 6
      }, 
      {
        name: 'Heineken', 
        price: 10
      }
    ];
    // instanciamos nosso array no nosso scope
    // para que tenhamos acesso à esse array na View
    $scope.cervejas = cervejas;

} ]);
```

Na nossa `View`, além de iterarmos no array de cervejas, também chamamos o filtro `orderBy` que irá ordenar a listagem das cervejas, e também tem interação com um link que modifica sua ordenação.

```html
<div data-ng-controller='BeerController'>
  {{ cervejas }}

  <pre>Ordenando por predicate = {{predicate}}; reverse = {{reverse}}</pre>

  <a href="" data-ng-click="predicate = 'price'; reverse=!reverse">Ordenar por: {{ predicate }}</a>

  <ul>
  <!-- Parecido com o nosso for no Jade -->
    <li data-ng-repeat='cerveja in cervejas | orderBy:predicate:reverse'>
    <!-- acessando os valores do array -->
      {{ cerveja.name }} - {{ cerveja.price }}
    </li>
  </ul>
</div>
```

Para utilizarmos o `Controller` criado, precisamos apenas chamar a diretiva `ng-controller` na nossa `View`. Lembrando que o escopo criado existe apenas dentro desse `Controller`, logo o array de cervejas não existe fora dessa `div`:

```html
<div data-ng-controller='BeerController'>
```

No exercício09 nós criamos um módulo apenas para nossos `Controllers`, pois eles irão crescer, e também criei a função `ordenar` no `Controller` para ser chamada no `ng-click` do botão:

```html
<button data-ng-click='ordenar()'>Ordenar</button>
```

## $http

O `$http` é o responsável pelas nossas requisições `HTTP`, que nada mais é que o módulo utilizado para integrarmos com alguma `API`.

No exercício010 iremos ver como utilizar o `$http` para consumirmos a `API` do [github](https://github.com).

```js
var url = 'https://api.github.com/users/suissa';
var method = 'GET';
$http({
  url: url,
  method: method
})
.success(function(data){
  console.log('Data: ', data);
  $scope.user = data;
})
.error(function(err){
  console.log('Erro: ', err);
});
```

E na nossa `View` nós mostramos:

```html
<div data-ng-controller='UserController'>
  <button data-ng-click='rodar()'>Usuario</button>
  <p data-ng-show='mostraUser'>
    <img class='user-avatar' data-ng-src="{{user.avatar_url}}" alt="">
    <br />
    <span class='user-label'>Login:</span> {{user.login}} 
    <br />
    <span class='user-label'>Name:</span> {{user.name}}
    <br />
    <span class='user-label'>Company:</span> {{user.company}}
    <br />
    <span class='user-label'>Blog:</span> {{user.blog}}
    <br />
    <span class='user-label'>Email:</span> {{user.email}}
    <br />
    <span class='user-label'>Location:</span> {{user.location}}
  </p>
</div>
```

Perceba que ao iniciar a página ele não mostra o usuário, apenas se clickar no botão `Usuario` que mostra os dados abaixo. Para que isso aconteça, usamos a diretiva `ng-show` que irá mostrar o conteúdo caso receba `true`, porém nós iniciamos ela com `false` no nosso `Controller`:

```js
$scope.mostraUser = false;
```

Porém após clickar no botão e chamar a função `rodar()` ele muda esse valor e mostra o conteúdo abaixo. Ele serve como um toggle, pois a cada click ele irá inverter o valor de `mostraUser`.

```js
$scope.rodar = function(){
  $scope.mostraUser = !$scope.mostraUser;
}
```

## Rotas

Para começarmos o assunto das rotas iremos utilizar um projeto que vai iniciar um boilerplate com AngularJs para trabalharmos, o [angular-seed](https://github.com/angular/angular-seed). Basta clonarmos o repositório:

```
git clone https://github.com/angular/angular-seed.git
cd angular-seed
```

Depois instalarmos as dependências:

```
npm install
```

E para rodarmos:

```
npm start
```

Depois de ver rodando em `localhost:8000` vamos ver o arquivo `app.js`:

```js
'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
```

E depois que você abrir o `view1/view1.js` vai perceber que o próprio módulo `myApp.view1` possui sua rota, isso deixa nosso código bem modular e não polui o arquivo principal.

```js
angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
```

**Style Guide: https://github.com/johnpapa/angularjs-styleguide**

## Angular com MongoDB, Express e NodeJS

A base do AngularJs é a **injeção de dependências**.

Para exemplificar um uso muito simples da injeção de dependência, imagine que você possui um CRUD e está usando dessa forma:

```js
function create(){
    var db = mongoose.connection();
    // já temos o models e os dados e vamos salvar
    return user.save();
};
function retrieve(){
    var db = mongoose.connection();
    return user.list();
};
function update(dados){
    var db = mongoose.connection();
    return user.update(dados);
};
function delete(){
    var db = mongoose.connection();
    return user.remove();
};
```

E agora seu sistema vai mudar de MongoDb para CouchDb, o que fazer?

Se o seu código estiver sem injeção de dependência você precisará modificar todo seu código, por exemplo:

```js
function create(){
    var db = couchDb.connection();
    // já temos o models e os dados e vamos salvar
    return user.save();
};
function retrieve(){
    var db = couchDb.connection();
    return user.list();
};
function update(dados){
    var db = couchDb.connection();
    return user.update(dados);
};
function delete(){
    var db = couchDb.connection();
    return user.remove();
};
```

Agora, caso você tivesse escrito o código já com injeção de dependência, ele ficaria assim:

```js
// var db = mongoose.connection();
var db = couchDb.connection();
function create(db){
    // já temos o models e os dados e vamos salvar
    return user.save();
};
function retrieve(db){
    return user.list();
};
function update(db, dados){
    return user.update(dados);
};
function delete(db){
    return user.remove();
};
```

Com isso eu crio a dependência externamente, independente do código de cada função, ficando assim mais simples de se trocar as peças injetadas.


## Controllers

Para criarmos um controller precisamos apenas adicionar ele em um módulo, como no exemplo a seguir:

```js
angular.module('workshopBeMEAN', ['filters'])
  .controller('BeerController', ['$scope', function($scope){
    $scope.reverse = false;
    var cervejas = [{
      name: 'Kaiser', price: 2
      }, {
        name: 'Skol', price: 3
      }, {
        name: 'Glacial', price: 4
      }, {
        name: 'Polar', price: 6
      }, {
        name: 'Heineken', price: 10
      }
    ];
    $scope.cervejas = cervejas;
  }]);
```

Em cada controller, nós precisaremos injetar suas dependências, principalmente o `$scope` que é o nosso Model.

```js
['$scope', function($scope)
```

Eu poderia muito bem passar como dependência apenas via paramêtro:

```js
function($scope)
```

Porém quando eu for minificar meu arquivo isso poderá gerar problemas, pois todos os outros controllers também possuem seus scopes. Logo, a melhor forma e a mais indicada para injetar as dependências é listá-las antes como string.

Para que eu consiga acessar dados da minha View, preciso adicionar os valores no `$scope`:

```js
var cervejas = [{
  name: 'Kaiser', price: 2
  }, {
    name: 'Skol', price: 3
  }, {
    name: 'Glacial', price: 4
  }, {
    name: 'Polar', price: 6
  }, {
    name: 'Heineken', price: 10
  }
];
$scope.cervejas = cervejas;
```

Com isso eu tenho acesso na minha View com `{{ cervejas }}`.

Então com nosso array acessível na View podemos iterar sobre ele utilizando a diretiva `ng-repeat`:

```html    
<ul>
  <li data-ng-repeat='beer in cervejas | orderBy:predicate:reverse'>
    {{ beer.name }} - {{ beer.price }}
  </li>
</ul>
```

Nesse código o `ng-repeat` irá criar uma linha com `<li>` para cada cerveja que exista no nosso array. Muito parecido com o que foi feito no Jade, porém estamos utilizando um dos filtros mais poderosos que é o orderBy:

```html
| orderBy:predicate:reverse'
```

Então esse filtro me diz que preciso ordenar pelo predicate seguindo reverse.

```html
<a href="" data-ng-click="predicate = 'name'; reverse=!reverse">Nome</a>
```

Como podemos ver nesse link, possuímos a diretiva `ng-click`, a qual irá setar `predicate='name'` e `reverse=!reverse`, ou seja, inverte o valor de reverse.

Quando eu clickar nesse link ele irá setar esses valores fazendo com que o AngularJs ordene automaticamente nosso array.

Para tirarmos proveito da modularização do AngularJs, iremos criar um módulo para nosso controller:

```js
angular.module('workshopBeMEAN', ['workshopFilters', 'workshopControllers']);
  angular.module('workshopControllers', [])
  .controller('BeerController', ['$scope', 
    function($scope){
      var cerveja1 = {name: 'kaiser', price: 2};
      var cerveja2 = {name: 'skol', price: 3};
      var cerveja3 = {name: 'glacial', price: 4};
      var cerveja4 = {name: 'polar', price: 6};
      // ADICIONANDO AS CERVEJAS NO SCOPE DO CONTROLLER
      $scope.cervejas = [cerveja1, cerveja2, cerveja3, cerveja4];
  }]);
```

Agora vamos ver com utilizamos dois Controllers na mesma view, para que isso seja possível precisamos utilizar a diretiva `ng-controller`.

```html
<div data-ng-controller='BeerController'>
<div data-ng-controller='EnderecoController'>
```

Deixando nosso módulo de Controllers da seguinte forma:

```js
angular.module('workshopControllers', [])
  .controller('EnderecoController', ['$scope', '$http', 
    function($scope, $http){

      // exemplo de função que irá rodar com um CLICK
      $scope.rodar = function(){
        alert('RODOU');
      }

      var url = 'http://cors.io/cep.correiocontrol.com.br/02011200.json';

      $http.get(url)
      .success(function(data) { //função executada após o sucesso da requisição
        console.log(data);
        $scope.end = data;
        // Object {bairro: "Santana", logradouro: "Rua Voluntários da Pátria", cep: "02011200", uf: "SP", localidade: "São Paulo"} 
      })
      .error(function(err){ //função executada após o erro da requisição
        console.log('Error: ', err)
      });
    }])
  .controller('BeerController', ['$scope', '$http',
    function($scope, $http){
      var cerveja1 = {name: 'kaiser', price: 2};
      var cerveja2 = {name: 'skol', price: 3};
      var cerveja3 = {name: 'glacial', price: 4};
      var cerveja4 = {name: 'polar', price: 6};
      // ADICIONANDO AS CERVEJAS NO SCOPE DO CONTROLLER
      $scope.cervejas = [cerveja1, cerveja2, cerveja3, cerveja4];
  }]);
```

Então para usarmos nosso $http, antes precisamos injetá-lo como dependência:

```js
['$scope', '$http', function($scope, $http)
```

Depois já podemos utilizá-lo da seguinte forma:

```js
var url = 'http://cors.io/cep.correiocontrol.com.br/02011200.json';

$http.get(url)
.success(function(data) { //função executada após o sucesso da requisição
  console.log(data);
  $scope.end = data;
  // Object {bairro: "Santana", logradouro: "Rua Voluntários da Pátria", cep: "02011200", uf: "SP", localidade: "São Paulo"} 
})
.error(function(err){ //função executada após o erro da requisição
  console.log('Error: ', err)
});
```

### Dica

Estou usando o serviço do `cors.io` para fazer requisições externas, já que os navegadores implementam a política de mesma origem ([Same-origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)), ou seja, você só pode fazer requisições via navegador para o mesmo servidor, não podendo mudar nenhuma dessas 3 variáveis:

- protocolo
- host
- porta

    protocolo://host:porta
    http://localhost:8080 é diferente de:
    https://localhost:8080 
    http://sub.localhost:8080 
    http://localhost:3000

Então para "burlar" essa política nosso servidor precisa habilitar o [CORS](http://pt.wikipedia.org/wiki/Cross-origin_resource_sharing), caso não tenhamos acesso ao servidor, podemos utilizar esse serviço web rodando em `http://cors.io`.

No retorno da nossa consulta com $http recebemos duas promisses:

- success
- error

Então é nessas promisses que minha lógica de manipulação do retorno irá trabalhar.

```js
.success(function(data) { //função executada após o sucesso da requisição
  console.log(data);
  $scope.end = data;
  // Object {bairro: "Santana", logradouro: "Rua Voluntários da Pátria", cep: "02011200", uf: "SP", localidade: "São Paulo"} 
})
.error(function(err){ //função executada após o erro da requisição
  console.log('Error: ', err)
});
```

Então fica claro de identificar o que cada uma faz e com isso deixamos nosso código mais limpo e legível.

Na promisse de success é onde instanciamos a variável end no nosso `$scope`

```js
$scope.end = data;
```

Para que ela seja acessível dentro do nosso Controller na View.

```html
<div data-ng-controller='EnderecoController'>
  <button data-ng-click='rodar()'>Click aqui</button>
  <p>
    Endereço: {{ end }}
  </p>
</div>
```

Ou seja, eu só acesso as variáveis e funções do meu `$scope` dentro do meu 
`ng-controller` correto. Pois esses dados só existem nesse `$scope` local.

Além de usarmos o `$http` nesse Controller também criamos uma função que será 
acessada via `ng-click`:

```js
// exemplo de função que irá rodar com um CLICK
  $scope.rodar = function(){
    alert('RODOU');
  }
```

Ela será chamada na nossa view da seguinte forma:

```js
<button data-ng-click='rodar()'>Click aqui</button>
```

## Rotas

![](https://i.cloudup.com/M_kYIOWyyn.png)

Vamos iniciar esse módulo clonando o seed do AngularJs.

```sh
git clone git://github.com/angular/angular-seed.git
```

Depois de entrar na pasta angular-seed, você verá o arquivo `bower.json`. Para instalarmos nossos assets de frontend, precisamos instalar o Bower antes.

```
npm install -g bower
```

Agora localmente primeiro vamos rodar:

```
npm install
```

Para iniciar nosso projeto precisamos apenas rodar:

```
npm start
```

Depois conferir em `localhost:8000/app`.

O nosso roteamento se dá apenas no navegador, sem que precisemos requisitar nenhum dado no nosso servidor. Já que o AngularJs é um framework para Single Page Applications ele irá gerenciar todas essas rotas localmente, emulando a troca das URLs utilizando a History API e PushState.

Para definirmos nossas rotas, iremos utilizar o `$routeProvider`.

```js
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
```

Onde em `when` eu irei setar minha rota, passando sua url e um objeto com meu Template, `templateUrl`, e meu Controller, `controller`.

### templateUrl

O `templateUrl` é a URL para a nossa View a ser renderizada.

### controller

O `controller` irá chamar a função setada nele.

### otherwise

É a função parecida com o default do switch, ou seja, caso a rota requisitada não exista, ele irá redireciar para essa.

Após criarmos nossa rota em `config`, precisamos criar nossa view em `partials/beers/index.html`

```html
<h3>
  {{ workshop }}
</h3>

    INDEX DAS CERVEJAS
```

Depois vamos criar nosso controller `BeersIndexCtrl`:

```js
.controller('BeersIndexCtrl', ['$scope', function ($scope) {
  $scope.workshop = 'Workshop Be MEAN';
}])
```

Passando apenas a variável workshop para ser mostrada na View.

No `app/index.html`, a linha mais importante para renderizar as views é a seguinte:

```html
<div ng-view></div>
```

Pois o `ng-view` é o responsável por renderizar as views.

## RETRIEVE

Agora vamos criar a View `list.html` e modificar na nossa rota.

```js
$routeProvider.when('/beers', {
    templateUrl: 'partials/beers/list.html', 
    controller: 'BeersIndexCtrl'
  });
```

Copiando o código do nosso exercício 08 nossa View lista ficará:

```html
<h3>
  {{ workshop }}
</h3>
      
<!-- Usando o filtro de ordenação -->
<a href="" data-ng-click="reverse=!reverse">
  Ordenar por {{ predicate }} - {{ !reverse }}
</a>
    
<!-- Vamos listar nosso array usando o ng-repeat -->
<ul>
<!-- Parecido com o nosso for no Jade -->
  <li data-ng-repeat='beer in cervejas | orderBy:predicate:reverse'>
  <!-- acessando os valores do array -->
    {{ beer.name }} - {{ beer.price }}
  </li>
</ul>
```

Copiamos o código do controller também, ficando assim:

```js
controller('BeersIndexCtrl', ['$scope', function ($scope) {
  $scope.workshop = 'Workshop Be MEAN';

  // Código colado do exercicio 08
  $scope.reverse = false;
  $scope.predicate = 'name';

  // criamos um array de cervejas
  var cervejas = [{
  name: 'Kaiser', price: 2
  }, {
    name: 'Skol', price: 3
  }, {
    name: 'Glacial', price: 4
  }, {
    name: 'Polar', price: 6
  }, {
    name: 'Heineken', price: 10
  }
  ];

  // instanciamos nosso array no nosso scope
  // para que tenhamos acesso à esse array na View
  $scope.cervejas = cervejas;

}])
```

Com isso, na nossa rota `/beers` já temos uma listagem das cervejas com ordenção por nome.

Para entendermos mais um pouco como as coisas funcionam no AngularJs vamos pegar nosso outro exercício e copiar seu código do $http.

Vamos substituir essas cervejas setadas na mão por uma consulta na nossa API do Node.js

```js
var url = '/api/beers';

$http.get(url)
  .success(function(data){
    $scope.cervejas = data;
    console.log('Cervejas', $scope.cervejas);
  })
  .error(function(err){
    console.log('Error: ', err);
  });
```

E corrigimos nossa view `list.jade`:

```jade
h3
  | {{ workshop }}
h4 Listagem das cervejas
table
  thead
    tr
      th 
        a.order(data-ng-click='orderBy(\'name\')') Name
      th
        a.order(data-ng-click='orderBy(\'category\')') Category
  tbody
    tr(data-ng-repeat='cerveja in cervejas | orderBy:predicate:reverse')
      td {{ cerveja.name }}
      td {{ cerveja.category }}
```

Como você deve ter percebido, estamos chamando a função `orderBy`, onde ela irá ordernar nossa tabela a partir dos campos `name` e `category`. 

Então vamos ver como vai ficar nossa função `orderBy` no controller `BeersIndexCtrl`:

```js
$scope.orderBy = function(predicate){
  $scope.predicate = predicate;
  $scope.reverse = !$scope.reverse;
}
```

Setando o `$scope.reverse = !scope.reverse` estamos invertendo a nossa listagem, então quando você clickar novamente no mesmo campo ele apenas inverterá a seleção.

## Integração com o exercício do Express

Agora vamos integrar a nossa API que criamos no Express anteriormente, basta seguir esses passos:

1 - Copiar a pasta controllers do Express para o Angular Express Seed
2 - Copiar a pasta models do Express para o Angular Express Seed
3 - Passar as rotas do Express para o Angular Express Seed

As rotas vamos precisar integrar manualmente, então nosso `app.js` do Angular Express Seed ficará assim:

```js
/**
* Routes
*/

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// API REST
// criando o objeto de rotas da API
var api = {};
// requisitando nosso controller
api.beer = require('./controllers/api/beer');
app.get('/api/beers', api.beer.retrieve);
app.get('/api/beers/:id', api.beer.findOne);
app.post('/api/beers', api.beer.create);
app.put('/api/beers/:id', api.beer.update);
app.delete('/api/beers/:id', api.beer.delete);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);
```

Você percebeu que estamos requisitando nossa view do AngularJs para o Node.js? Olhe nas nossas rotas do AngularJs:

```js
when('/view1', {
  templateUrl: 'partials/partial1',
  controller: 'MyCtrl1'
}).
when('/view2', {
  templateUrl: 'partials/partial2',
  controller: 'MyCtrl2'
}).
// criando a rota de listagem das cervejas
when('/beers', {
  templateUrl: 'partials/list',
  controller: 'BeersIndexCtrl'
})
```

Todo `templateUrl` bate em `partials/:name`, o que é descrito no `app.js` do Express: 

```js
app.get('/partials/:name', routes.partials);
```

Então vamos ver o que essa função `routes.partials` faz. Primeiramente vemos que ela vem do objeto `routes`:

```js
routes = require('./routes'),
```

Isso quer dizer que estamos importando o arquivo `routes/index.js`:

```js
exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};
```

Com isso conseguimos entender o que nossa função `partials` faz, ela renderiza qualquer nome de view repassada na URL, exemplo:

`/routes/list`

Vai renderizar:

`/views/partials/list.jade`

Agora vamos criar nossa própria função de renderização de views genéricas:

```js
exports.expose = function(req, res) {
  // pego o diretório da view
  var dir = req.params.dir;
  // pego o nome da view
  var name = req.params.name;
  // crio o nome completo da view
  var view = dir + '/' + name;

  // renderizo a view
  res.render(view);
}
```

Depois de criamos nossa função `expose` vamos criar a rota que será responsável por executar essa função em `app.js` do Express:

```js
app.get('/expose/:dir/:name', routes.expose);
```

Depois disso podemos salvar o `list.jade` na pasta `/views/beers/`.

E agora corrigimos nossa rota `/beers` no app do AngularJs:

```js
when('/beers', {
  templateUrl: 'expose/beers/list',
  controller: 'BeersIndexCtrl'
})
```

Pronto. Agora sempre vamos buscar nossas views utilizando a rota `expose/:dir:name` deixando assim nossa função de partials mais genérica.

## Consultar

Nesse ponto já integramos nossa listagem em MEAN, precisamos agora fazer a consulta individual de cada cerveja, então vamos refatorar nossa view `list`:

```jade
tr(data-ng-repeat='cerveja in cervejas | orderBy:predicate:reverse')
  td 
    a(data-ng-href='/beers/{{cerveja._id}}')
      {{ cerveja.name }}
  td 
    a(data-ng-href='/beers/{{cerveja._id}}')
      {{ cerveja.category }}
```

Depois de colocarmos um link para cada cerveja no formato `/beers/:id`, precisamos criar essa rota no AngularJs:

```js
.when('/beers/:id', {
  templateUrl: 'expose/beers/show',
  controller: 'BeersShowCtrl'
})
```

Vamos criar a nossa view `beers/show.jade`:

```jade 
h3
| {{ workshop }}

ul
  h4 {{ cerveja.name }}
  li
    | Name: {{ cerveja.name }}
  li
    | Category: {{ cerveja.category }}
  li
    | Alcohol: {{ cerveja.alcohol }}
  li
    | Price: {{ cerveja.price }}
  li
    | Description: {{ cerveja.description }}
```

Depois disso criar o controller `BeersShowCtrl`:

```js
controller('BeersShowCtrl', ['$scope', '$http', '$routeParams', 
function ($scope, $http, $routeParams) {
  $scope.workshop = 'Workshop Be MEAN';

  // Precisamos buscar nosssa cerveja na nossa API
  var id = $routeParams.id;
  var url = '/api/beers/'+id;

  $http.get(url)
    .success(function(data){
      $scope.cerveja = data;
      console.log('Cerveja', $scope.cerveja);
    })
    .error(function(err){
      console.log('Error: ', err);
    });

}])
```

Nesse controller usamos o `$routeParams` do AngularJs para pegar as variáveis da rota, igual o `request.params` do Express.

E pronto, quando clickarmos em qualquer link da nossa listagem das cervejas vamos entrar na rota que irá mostrar os dados da cerveja.

## CREATE

Antes de criarmos nossas funcionalidades de `UPDATE` e `DELETE` vamos criar a funcionalidade de criação da cerveja, primeiramente criando sua rota no AngularJs:

```js
when('/beers/create', {
  templateUrl: 'expose/beers/create',
  controller: 'BeersCreateCtrl'
})
```

Agora vamos criar nossa view `create.jade`:

```jade
h3 {{ workshop }}
h4 {{ msg }}
form.container-small
  label
    | Name:
  input(type='text', name='cerveja.name', 
        data-ng-model='cerveja.name')
  label
    | Category:
  input(type='text', name='cerveja.category', 
        data-ng-model='cerveja.category')
  label
    | Price:
  input(type='text', name='cerveja.price', 
        data-ng-model='cerveja.price')
  label
    | Alcohol:
  input(type='text', name='cerveja.alcohol', 
        data-ng-model='cerveja.alcohol')
  label
    | Description:
  textarea(name='description', 
          data-ng-model='cerveja.description')
  button(data-ng-click='create(cerveja)')
    | Criar
```

Logo precisamos ir no nosso controller `BeersCreateCtrl` e adicionar a função `create`:

```js
controller('BeersCreateCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.workshop = 'Workshop Be MEAN';
  $scope.msg = 'Cadastro de cerveja'
  var url = '/api/beers/';
  $scope.create = function(cerveja){
    var method = 'POST';
    console.table(cerveja);
    $http({
      method: method,
      url: url,
      data: cerveja
    }).
    success(function(data){
      $scope.msg = 'Cerveja ' + cerveja.name + ' criada com SUCESSO';
    }).
    error(function(err){
      console.log('Error: ', err);
      $scope.msg = 'Error:  ' + err;
    });
  }
}])
```

Criei um `$scope.msg` para dar um feedback da ação para o usuário de forma simples. E pronto após isso podemos ir na nossa rota `beers/create` e criarmos nossa cerveja.

## $http

No `$http` agora estamos passando um objeto com as configurações da requisição:

```js
{
  method: method,
  url: url,
  data: cerveja
}
```

Onde:

- method: é o verbo do HTTP que vamos usar
- url: é a url que nossa requisição utilizará
- data: é o objeto a ser enviado pela requisição

**Exercício:** mudar o create do click do botão para o submit do form e mudar o button para um input[type=submit]

## UPDATE

Depois de listarmos e criarmos nossas cervejas precisamos poder alterá-las também, então dentro da nossa view `show` vamos adicionar um link para o `UPDATE` e para o `DELETE`:

```jade
p
  a(data-ng-href='beers/{{cerveja._id}}/edit')
    | Alterar
p 
  a(data-ng-href='beers/{{cerveja._id}}/remove')
    | Excluir
```

Após adicionarmos esses links precisamos criar suas respectivas rotas:

```js
when('/beers/:id/edit', {
  templateUrl: 'expose/beers/edit',
  controller: 'BeersEditCtrl'
}).
when('/beers/:id/remove', {
  templateUrl: 'expose/beers/remove',
  controller: 'BeersRemoveCtrl'
})
```

E agora vamos criar seus controllers:

```js
controller('BeersEditCtrl', ['$scope', '$http', '$routeParams', 
  function ($scope, $http, $routeParams) {
  $scope.workshop = 'Workshop Be MEAN';

  // Precisamos buscar nosssa cerveja na nossa API
  var id = $routeParams.id;
  var url = '/api/beers/'+id;

}]).
controller('BeersRemoveCtrl', ['$scope', '$http', '$routeParams', 
  function ($scope, $http, $routeParams) {
  $scope.workshop = 'Workshop Be MEAN';

  // Precisamos buscar nosssa cerveja na nossa API
  var id = $routeParams.id;
  var url = '/api/beers/'+id;

}])
```

Vamos iniciar pela criação da view `edit.jade`:

```jade
h3 {{ workshop }}
h4 {{ msg }}
form.container-small
  label
    | Name:
    input(type='text', name='cerveja.name', 
          data-ng-model='cerveja.name')
  label
    | Category:
    input(type='text', name='cerveja.category', 
          data-ng-model='cerveja.category')
  label
    | Price:
    input(type='text', name='cerveja.price', 
          data-ng-model='cerveja.price')
  label
    | Alcohol:
    input(type='text', name='cerveja.alcohol', 
          data-ng-model='cerveja.alcohol')
  label
    | Description:
    textarea(name='description', 
            data-ng-model='cerveja.description')
  button(data-ng-click='update(cerveja)')
    | Salvar
```

Agora vamos no nosso controller `BeersEditCtrl` e criar a função que vai consultar a cerveja a ser alterada, ou seja, re-usar a função onde mostramos os dados da cerveja. 

Para isso, inicialmente, adicionamos o `$routeParams`:

```js
  controller('BeersCreateCtrl', ['$scope', '$http', '$routeParams', 
    function ($scope, $http, $routeParams)
```

E chamamos a cerveja a ser alterada para mostrar os valores na view:

```js
// Precisamos buscar nosssa cerveja na nossa API
var id = $routeParams.id;
var url = '/api/beers/'+id;
var method = 'GET';
$http({
  method: method,
  url: url
})
.success(function(data){
  $scope.msg = 'Cerveja ' + data.name;
  $scope.cerveja = data;
})
.error(function(err){
  console.log('Error: ', err);
  $scope.msg = 'Error:  ' + err;
});
```

Após buscarmos nossa cerveja a ser alterada, precisamos criar a função de `UPDATE`:

```js
// Função de alterar
$scope.update = function(cerveja){    
  method = 'PUT';
  $http({
    method: method,
    url: url,
    data: cerveja
  })
  .success(function(data){
    $scope.msg = 'Cerveja ' + cerveja.name + ' alterada com SUCESSO';
  })
  .error(function(err){
    console.log('Error: ', err);
    $scope.msg = 'Error:  ' + err;
  });
}
```

Depois da view vamos criar a função `update` no controller `BeersEditCtrl`:

Porém, vamos fazer uma modificação no controller da nossa API `controllers/api/beer.js`:

```js
update: function(req, res){
  // criando o objeto de query
  // para fazer a busca da cerveja a ser alterada
  var query = {_id: req.params.id};
  // crio o objeto de modificação da cerveja
  // recebendo os dados via req.body
  var mod = req.body;
  Beer.update(query, mod, function (err, data) {
    if (err){
      console.log('Erro: ', err);
      // msg = 'Erro ao atualizar a cerveja!';
      msg = 0;
    }else{
      console.log('Cerveja atualizada com sucesso', data);
      // msg = 'Cerveja atualizada com sucesso!';    
      // retorna quantidade de cervejas atualizadas
      msg = data;
    } 
    // enviando a msg para o cliente
    res.json(msg);
  });
}
```

Mudamos o `res.send` para `res.json` para que nossa requisição do AngularJs não caia no `error`.

## DELETE

Como já havíamos criado a rota do `DELETE` vamos agora criar nossa view, que basicamente é a mesma do show apenas com o botão para deletar.

```jade
h3 {{ workshop }}
h4 {{ msg }}

ul
  h4 {{ cerveja.name }}
  li
    | Name: {{ cerveja.name }}
  li
    | Category: {{ cerveja.category }}
  li
    | Alcohol: {{ cerveja.alcohol }}
  li
    | Price: {{ cerveja.price }}
  li
    | Description: {{ cerveja.description }}

p 
  button(data-ng-click='remove(cerveja)')
    | Excluir
```

Depois alteramos o controller `BeersRemoveCtrl`:

```js
controller('BeersRemoveCtrl', ['$scope', '$http', '$routeParams', 
  function ($scope, $http, $routeParams) {
  $scope.workshop = 'Workshop Be MEAN';

  // Precisamos buscar nosssa cerveja na nossa API
  var id = $routeParams.id;
  var url = '/api/beers/'+id;
  var method = 'GET';
  $http({
    method: method,
    url: url
  })
  .success(function(data){
    $scope.msg = 'Cerveja ' + data.name;
    $scope.cerveja = data;
  })
  .error(function(err){
    console.log('Error: ', err);
    $scope.msg = 'Error:  ' + err;
  });

  // Função de deletar
  $scope.remove = function(cerveja){    
    var method = 'DELETE';
    var query = {
      _id: cerveja._id
    };

    var http_settings = {
      method: method,
      url: url,
      data: query
    };
    console.log('alterando', http_settings);
    $http(http_settings)
    .success(function(data){
      $scope.msg = 'Cerveja ' + cerveja.name + ' deletada com SUCESSO';
    })
    .error(function(err){
      console.log('Error: ', err);
      $scope.msg = 'Error:  ' + err;
    });
  }
}])
```

Lembrando que precisamos editar o `controllers/api/beer.js` na função `delete` para usa o `res.json` em vez do `res.send`:

```js
delete: function(req, res){
  // Criando a query para remover a cerveja pelo _id
  var query = {_id: req.params.id};

  Beer.remove(query, function(err, data) {
    if(err) {
      console.log(err);
      // msg = 'Erro ao deletar a cerveja!';
      msg = 0;
    } else {
      console.log('Cerveja deletada com sucesso', data);
      // msg = 'Cerveja deletada com sucesso!';
      // retorna a quantidade de elementos deletados
      msg = data;
    }
    // enviando a msg para o cliente
    res.json(msg);
  });
}
```

## Projeto Final

Criar um sistema que seja composto de lojas de cervejas, onde os usuários poderão se cadastrar e falar que tomaram as cervejas. Nisso teremos basicamente 3 coleções:

- users
- shops
- beers

Onde beers terá um array que conterá o ObjectId de cada cerveja que eles vendam e os usuarios possuirão um array com cada cerveja que já tomaram.

O sistema deverá ser um Single Page App onde o usuário se cadastrará e pesquisará pelas cervejas, **dica: use regex na query**, a cerveja que ele quiser poderá adicionar em sua coleção. E nessa cerveja além dos seus dados também mostrará quais lojas vendem.

###Model beer
- name
- price
- alcohol
- category
- description

###Model shop
- name
- address //object {logradouro, nome, numero, complemento, bairro, cidade, estado, país}
- beers

###Model user
- login
- email
- password //criptografado
- birth //data de nascimento
- beers

[Express](https://github.com/ericdouglas/be-MEAN-resources/blob/master/ebook/03-express.md)