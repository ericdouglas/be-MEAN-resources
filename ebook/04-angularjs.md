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

```
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

```
$scope.mostraUser = false;
```

Porém após clickar no botão e chamar a função `rodar()` ele muda esse valor e mostra o conteúdo abaixo. Ele serve como um toggle, pois a cada click ele irá inverter o valor de `mostraUser`.

```
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

```
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

```
angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
```

**Style Guide: https://github.com/johnpapa/angularjs-styleguide**



