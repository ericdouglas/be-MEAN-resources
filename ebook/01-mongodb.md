#MongoDb

##NoSQL

O termo NoSQL foi usado pela primeira vez em 1998 como o nome de um banco de dados relacional de código aberto que não possuía uma interface SQL. Seu autor, Carlo Strozzi, alega que o movimento NoSQL é "completamente distinto do modelo relacional, e portanto deveria ser mais apropriadamente chamado "NoREL" ou algo que produzisse o mesmo efeito". Porém o termo só voltou a ser assunto em 2009 por um funcionário do Rackspace, Eric Evans, quando Johan Oskarsson da Last.fm queria organizar um evento para discutir bancos de dados open source distribuídos. 

NoSQL são diferentes sistemas de armazenamento que vieram para suprir necessidades onde os bancos de dados tradicionais (relacionais) são ineficazes. Muitas dessas bases apresentam características muito interessantes como **alta performance**, **escalabilidade**, **replicação**, **suporte à dados estruturados**, **grafos** e **sub-colunas**. 

O NoSQL surgiu da necessidade de uma performance superior e de alta escalabilidade. Os atuais bancos de dados relacionais são muito restritos a isso, sendo necessário a distribuição vertical de servidores, ou seja, quanto mais dados, mais memória e mais disco um servidor precisa. O NoSQL tem uma grande facilidade na distribuição horizontal, ou seja, mais dados, mais servidores, não necessariamente de alta performance. Um grande utilizador desse conceito é o Google, que usa computadores de pequeno e médio porte, para a distribuição dos dados, essa forma de utilização é muito mais eficiente e econômica. Alem disso, os bancos de dados NoSQL são muito tolerantes a erros.

No caso dos bancos NoSQL, toda a informação necessária estará agrupada no mesmo registro, ou seja, em vez de você ter o relacionamento entre várias tabelas para formar uma informação, ela estará em sua totalidade no **mesmo registro**.

##Por que usar?

Os bancos de dados NoSQL nasceram de necessidades mais específicas, então quase sempre encontramos algum para resolver melhor um determinado problema. Caso necessitemos de um sistema que tenha como obrigação alta escalabilidade a baixo custo, provavelmente usaremos algum banco de dados NoSQL.

Quando nosso banco de dados relacional não aguenta mais requisições crescentes e o servidor ja está no seu máximo, essa seria uma boa hora para testar algum NoSQL. Assim como podemos usar mais de um banco NoSQL para tratar de problemas específicos.

Além disso, vários bancos NoSQL são *schemaless*, ou seja, não necessitam que uma estrutura seja pré-definida para a inserção de dados. Isso proporciona maior dinamismo na manipulação dos dados.

##Onde usar?

Hoje em dia temos vários bancos NoSQL que podem resolver diversos problemas, porém eles não são a chave para TODOS os problemas. Ainda existem cenários onde os bancos relacionais são mais indicados, visto que os mesmos possuem propriedades **ACID**, logo são melhores em cenários onde os dados são muitíssimo importantes e não pode haver nenhuma quebra de referencia. Ou seja, não indicaria, ainda, algum banco NoSQL para sistemas de transações financeiras, por exemplo.

Agora se o seu sistema é alguma rede social, ou algum site que necessite de alta disponibilidade ou escalabilidade com certeza lhe indicaria algum banco NoSQL.

Entretanto, não precisamos mudar todo o sistema para algum banco NoSQL, podemos muito bem utilizar um banco NoSQL e um relacional em conjunto. Como muitos já fazem hoje em dia mas nem percebem. 

Por exemplo, um sistema que utiliza cache, com certeza esta usando um banco NoSQL no cache como o mais conhecido Memcached. A API Storage do HTML5 também utiliza um sistema de banco NoSQL do tipo chave-valor.

##Tipos de armazenamento

Existem diversos tipos de armazenamento, onde cada um trata os dados de uma forma diferente e que pode ser mais específico para o objetivo desejado.

Os tipo de armazenamento são: 

* Wide Column Store/Column Families
* Document Store
* Key Value/Tuple Store 
* Eventually Consistent Key Value Store
* Graph Databases
* Object Databases
* Grid Database Solutions
* XML Databases

> Lista retirada de http://nosql-database.org/ 

###Key/Value Store

Esse é o tipo de banco de dados NoSQL mais simples. O conceito dele é uma chave e um valor para essa chave, mas ele é o que aguenta mais carga de dados. Esses tipos de bancos de dados são os que tem a maior escalabilidade.

- Berkeley DB 
- Tokyo Cabinet 
- Kyoto Cabinet
- Project Voldermort 
- MemcacheDB 
- SimpleBD 
- Redis
- Riak

###Wide Columns Store

Fortemente inspirados pelo *BigTable* do Google, eles suportam várias linhas e colunas, além disso ele permite subcolunas. Alem do BigTable do Google outros que usam essa tecnologia são:

- HBase (Apache) 
- HiperTable 
- Cassandra (Apache) 

###Document Store

Baseado em documentos XML ou JSON, podem ser localizados pelo seu id unico ou por qualquer registro que tenha no documento. 

- CouchDB (Apache) 
- MongoDB 
- RavenDB 

###Graph Store

Com uma complexibilidade maior, esses bancos de dados guardam objetos, e não registros como os outros tipos de NoSQL. A busca destes itens são feitas pela navegação destes objetos.

- Neo4J 
- InfoGrid 
- HyperGraphDB 

Na imagem abaixo podemos ver um gráfico demonstrando a diferença entre o tamanho da base de dados pela complexidade dos seus dados. 

Assim podemos perceber que os bancos do tipo **chave-valor** conseguem aguentar mais dados, sendo que seus dados são mais simples, enquanto que os banco do tipo **grafo** aguentam menos dados porém seus dados são mais complexos.

![](http://img.genbetadev.com/2014/02/logo-mongodb-tagline-2.png)

##Introdução ao MongoDB

O MongoDB é um dos bancos NoSQL mais utilizados atualmente pela sua facilidade de instalação, documentação e os diversos drivers para inúmeras linguagens de programação. 

Ele é um banco de dados **orientado a documentos**, **escalável**, **livre de esquema**, de **alto desempenho** e **código aberto** escrito em C++.

Algumas funcionalidades interessantes do MongoDB são: 

* orientação a documentos(JSON/BSON)
* suporte a index
* replicação
* alta disponibilidade
* auto-sharding
* map/reduce 
* GridFS
* suporte comercial da MongoDB Inc.

###Schemaless

![](http://www.greenberg-art.com/.Illustrations/.Humorous/qq1sgMessyDesk.jpg)

O que significa ser livre de esquema? Basicamente, é não precisar ter nenhum objeto identificando como será nosso modelo de persistência, ou seja, não terá nada dizendo o nome dos campos, nem seus tipos.

E isso é bom? Dependendo do que você quer fazer sim, ele dá maior liberdade para futuras modificações e maiores possibilidades de modelagem em comparação à relacional.

###JSON/BSON

![](https://cldup.com/HZhJhq6zRZ.jpg)

O MongoDb é um banco NoSQL orientado a documento [JSON](http://json.org/), ou seja, ele persiste os dados usando o formato JSON, criando assim um formato único de troca de dados em toda stack [MEAN](http://bemean.com.br/).

O [BSON](http://bsonspec.org/) nada mais é que uma versão serializada e "binarizada", transformada em binário, do JSON. Ele possui diversos tipos caso queira conhecer mais sobre esses tipos [visite http://docs.mongodb.org/manual/reference/bson-types/](http://docs.mongodb.org/manual/reference/bson-types/).

O [MongoDB](http://www.mongodb.com/json-and-bson) usa o [BSON](http://docs.mongodb.org/manual/reference/bson-types/) para estende o modelo de [JSON](http://json-schema.org/latest/json-schema-core.html#anchor8) para fornecer tipos de dados adicionais e para ser eficiente na codificação e decodificação em diferentes idiomas.db.teste.insert(json)


###Sharding

![Sharding chapter's image](https://cldup.com/CKCcVAXuE6.jpg)

O [Sharding](http://docs.mongodb.org/manual/sharding/) é um mecanismo de distribuição de dados entre os servidores para persistir grandes volumes de dados. 

Quando uma coleção começar a atingir o limite daquele servidor, você poderá adicionar outro servidor e colocar essa coleção como **sharding** para que ela distribua uma quantidade de seus dados para esse outro servidor ou servidores.

Os `Config Server`s são servidores que armazenam os dados sobre o cluster e que são consultados pelo `mongos`, nosso router, para saber onde buscar a informação requisitada pelo `mongos` que será a porta de entrada de qualquer requisição no cluster.

![Simple example with Sharding](http://docs.mongodb.org/manual/_images/sharded-cluster-test-architecture.png)

Veremos um exemplo simples de implementação local mais para frente.

###Replica

![Replica chapter's image](http://images.freshnessmag.com/wp-content/uploads/2010/07/bat-pod-replica-1.jpg)

Possuímos réplicas na maioria dos bancos de dados relacionais também, ela apenas faz o espelhamento dos seus dados de um servidor para outro.

No MongoDb funciona da mesma forma, porém podemos replicar também os shardings.

A ideia por trás de replicar os shardings nos remete ao conceito largamente utilizado pelo MongoDb que é a alta disponibilidade.

Vamos ver isso graficamente.

![Sharding with Replica cluster](https://cldup.com/_aT9Si2PTY.gif)

Nesse caso um mesmo servidor físico pode estar rodando uma instância de `sharding` e uma de `replica`, porém a réplica é de um `sharding` externo àquele servidor, pois caso ele caia derrubará apenas um `sharding` que terá sua `replica` em outro servidor, podendo facilmente levantar um novo servidor com os dados do servidor que caiu, lindo não?

###GridFs

![](http://www.windream.com/uploads/media/windream_Filesystem-Archivierung_Header_01.jpg)

É o sistema de armazenamento de aquivos binários do MongoDb, com ele você poderá distribuir seus arquivos binários pelos seus servidores, dando assim alta disponibilidade de acesso a eles.

##Instalação

###Download

Para instalar o MongoDb, após descompactarmos ele, precisamos criar a pasta `/data/db` para que ele persista localmente seus dados, essa pasta é a padrão, você pode mudar a localização dessa pasta via linha de comando:


```
mongod --dbpath /minha/pasta
```

*Caso você esteja no Windows e não adicionou a pasta `bin` do MongoDb no seu `PATH`, terá que executar os binários localmente:*

```
cd /Pasta_do_MongoDb/bin
.\mongod
```

###MacOs

```
brew install mongodb
```

###Linux

```
apt-get install mongodb
```

##Console

Para interagirmos com o MongoDB via terminal precisamos rodar o binário.

*Caso você esteja no Windows e não adicionou a pasta `bin` do MongoDb no seu `PATH`, terá que executar os binários localmente:*

```
cd /Pasta_do_MongoDb/bin
.\mongo
```

###Mão na massa

Para criar uma database usamos o comando `use` que cria um database novo ou usa um já existente.

```
use be-mean
```

Após criamos o database vamos listá-lo:

```
show dbs
```

Você deve ter notado que o database `worksop-be-mean` não foi criado né? Porque o MongoDB só irá realmente criar seu database quando você inserir um objeto em uma coleção. Então vamos fazer isso:

```
db.teste.insert({a: true})
```

Listamos novamente com `show dbs` e voiala!

Perceba que a sintaxe de um comando no MongoDb é:

`database.coleção.função()`

```
db.teste.insert()

// Inserindo diretamente via parametro
db.teste.insert({a: true})

// Inserindo via variável
var json = {b: 'TESTE'}
db.teste.insert(json)
Inserted 1 record(s) in 250ms
WriteResult({
  "nInserted": 1
})

// Inserindo um segundo registro
db.teste.insert(json)
Inserted 1 record(s) in 2ms
WriteResult({
  "nInserted": 1
})

// perceba que a primeira vez que foi inserido ele demora mais
// pois ele está criando a estrutura da colletion
```

Quando usamos o comando `use`, ele muda nosso database e o aponta para a variável `db` usada no inicio dos comandos, então ela sempre apontará para e database atual, como podemos ver executando apenas seu nome:

```
db
be-mean

```

**Dica**: instale o `mongo-hacker`, ver no github, manualmente. NÃO RODA EM WINDOWS.

```
db.teste.find()
{
  "_id": ObjectId("546142385b9f2b586cb31d06"),
  "a": true
}
{
  "_id": ObjectId("546142665b9f2b586cb31d07"),
  "b": "TESTE"
}
```


###ObjectId

Você deve ter percebido esse campo após listarmos os objetos da nossa coleção, ele é o ID único gerado pelo MongoDb, na verdade ele é um [UUID - Universally unique identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier) gerado a partir de 4 dados:

- 4-byte é o timestamp,
- 3-byte é o identificador da máquina,
- 2-byte é o id do processo
- 3-byte é o contador que começa com valor randômico

*Documentação do [ObjectId](http://docs.mongodb.org/manual/reference/object-id/).*

Para apagarmos os dados dessa coleção de teste possuímos 2 comandos:

- `remove`
- `drop`.
- `dropDatabase`.

O `remove` apenas apaga os dados, porém a coleção continua existindo, já com o `drop` ele apaga a coleção inteira e o `dropDatabase` como o próprio nome diz ele apaga o banco, como podemos ver abaixo:

```
suissacorp(mongod-2.4.8) be-mean> db.teste.remove({})
Removed 2 record(s) in 1ms

suissacorp(mongod-2.4.8) be-mean> db.teste.find()
Fetched 0 record(s) in 0ms -- Index[none]

suissacorp(mongod-2.4.8) be-mean> show collections
system.indexes
teste

suissacorp(mongod-2.4.8) be-mean> db.teste.drop()
true

suissacorp(mongod-2.4.8) be-mean> show collections
system.indexes

suissacorp(mongod-2.4.8) be-mean> db.dropDatabase()
{
  "dropped": "be-mean",
  "ok": 1
}


```


*O `remove` recebe um objeto vazio `{}`, pois precisa de um objeto de query obrigatoriamente, nas versões acima da 2.6.*

###Inserindo

Para inserir um objeto no MongoDb podemos criá-lo em uma variável e depois passar como parâmetro para a função `insert` ou `save`:

```
var product = {
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 12.00
}

suissacorp(mongod-2.4.8) be-mean> product
{
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 12
}

suissacorp(mongod-2.4.8) be-mean> db.products.insert(product)
Inserted 1 record(s) in 2ms

suissacorp(mongod-2.4.8) be-mean> db.products.find()
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 12
}
Fetched 1 record(s) in 1ms -- Index[none]
```

Para inserir diversos registros de uma só vez podemos criar um array com nossos objetos como abaixo:

```
var ps = [
  {
    "name":"Pinga",
    "description":"da braba po tubão",
    "price": 4.50
  },
  {
    "name":"Uísque",
    "description":"Pra preiboi toma com energético",
    "price":80.00
  },
  {
    "name":"Champagne",
    "description":"só podia ser saopaulino",
    "price":130.00
  }
]

suissacorp(mongod-2.4.8) be-mean> ps
[
  {
    "name": "Pinga",
    "description": "da braba po tubão",
    "price": 4.5
  },
  {
    "name": "Uísque",
    "description": "Pra preiboi toma com energético",
    "price": 80
  },
  {
    "name": "Champagne",
    "description": "só podia ser saopaulino",
    "price": 130
  }
]

suissacorp(mongod-2.4.8) be-mean> db.products.insert(ps)
Inserted 1 record(s) in 1ms
```

Na versão 2.6 para cima ainda recebemos o retorno de nossas ações, como nessa:

```
BulkWriteResult({
  "writeErrors": [ ],
  "writeConcernErrors": [ ],
  "nInserted": 3,
  "nUpserted": 0,
  "nMatched": 0,
  "nModified": 0,
  "nRemoved": 0,
  "upserted": [ ]
})
```

Logo podemos ver que foram inseridos 3 registros, esse tipo de retorno só aconteceu após a versão 2.6, **em uma próxima atualização todos os códigos estarão na versão mais atual**.

```
suissacorp(mongod-2.4.8) be-mean> db.products.find()
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 12
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d09"),
  "name": "Pinga",
  "description": "da braba po tubão",
  "price": 4.5
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0a"),
  "name": "Uísque",
  "description": "Pra preiboi toma com energético",
  "price": 80
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0b"),
  "name": "Champagne",
  "description": "só podia ser saopaulino",
  "price": 130
}
Fetched 4 record(s) in 1ms -- Index[none]

// navegando de coleção em coleção
suissacorp(mongod-2.4.8) be-mean> var produtos = db.products.find()
suissacorp(mongod-2.4.8) be-mean> produtos.next()
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 12
}
suissacorp(mongod-2.4.8) be-mean> produtos.next()
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d09"),
  "name": "Pinga",
  "description": "da braba po tubão",
  "price": 4.5
}
suissacorp(mongod-2.4.8) be-mean> produtos.next()
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0a"),
  "name": "Uísque",
  "description": "Pra preiboi toma com energético",
  "price": 80
}
suissacorp(mongod-2.4.8) be-mean> produtos.next()
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0b"),
  "name": "Champagne",
  "description": "só podia ser saopaulino",
  "price": 130
}
suissacorp(mongod-2.4.8) be-mean> produtos.next()
error hasNext: false at src/mongo/shell/query.js:127
// este erro é porque não há mais elementos para serem percorrido
// hasNext retorna false se não tivesse mais elementos para serem percorrido
// e returna true se tiver elementos para serem percorrido
suissacorp(mongod-2.4.8) be-mean> produtos.hasNext()
false
suissacorp(mongod-2.4.8) be-mean> var produtos = db.products.find()
suissacorp(mongod-2.4.8) be-mean> produtos.hasNext()
true
```

**Dica**: quando utilizar o comando `find` ou `findOne` e não tiver o mongo-hacker, utilize no final a função `pretty()`.

```
db.products.find().pretty()
```

Nós também podemos inserir objetos utilizando o `save`, ele tanto insere como altera valores.

```
var p = {
  name: 'Vinho',
  price: 23,
  description: 'Suco de uva alcoolico'
}

suissacorp(mongod-2.4.8) be-mean> db.products.save(p)
Inserted 1 record(s) in 0ms

suissacorp(mongod-2.4.8) be-mean> db.products.find()
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 12
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d09"),
  "name": "Pinga",
  "description": "da braba po tubão",
  "price": 4.5
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0a"),
  "name": "Uísque",
  "description": "Pra preiboi toma com energético",
  "price": 80
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0b"),
  "name": "Champagne",
  "description": "só podia ser saopaulino",
  "price": 130
}
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho",
  "price": 23,
  "description": "Suco de uva alcoolico"
}
Fetched 5 record(s) in 1ms -- Index[none]
```

Para alterarmos um valor com `save`, precisamos inicialmente buscar o objeto desejado com `findOne`, pois ele me retorna apenas o primeiro objeto achado. Caso eu usasse o `find`, mesmo retornando **um** objeto, ainda seria dentro de um *Array*.

Por isso usamos o `find` para listagem de registros e o `findOne` para consulta de registros.

Veja a diferença de retorno das duas funções:

```
var query = {name: 'Vinho'}
suissacorp(mongod-2.4.8) be-mean> var p = db.products.find(query)
suissacorp(mongod-2.4.8) be-mean> p
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho",
  "price": 23,
  "description": "Suco de uva alcoolico"
}
Fetched 1 record(s) in 1ms -- Index[none]
suissacorp(mongod-2.4.8) be-mean> p.price
```

Não conseguimos acessar diretamente nosso objeto pois ele é retornado na forma de [cursor](http://docs.mongodb.org/manual/core/cursors/), que possui métodos especiais para acessar seus valores, [como visto aqui](http://docs.mongodb.org/manual/tutorial/iterate-a-cursor/).

Então precisamos utilizar o `findOne` pois ele retorna um objeto comum.

```
var p = db.products.findOne(query)

suissacorp(mongod-2.4.8) be-mean> p
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho",
  "price": 12,
  "description": "Suco de uva alcoolico"
}

suissacorp(mongod-2.4.8) be-mean> p.price
12

suissacorp(mongod-2.4.8) be-mean> p.price = 23
23

suissacorp(mongod-2.4.8) be-mean> db.products.save(p)
Updated 1 existing record(s) in 1ms

```

Voltando na alteração com `save`, vamos buscar nosso objeto a ser modificado e modificar o valor do preço:

```
var p = db.products.findOne()

suissacorp(mongod-2.4.8) be-mean> p
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23
}

suissacorp(mongod-2.4.8) be-mean> p.price
23

suissacorp(mongod-2.4.8) be-mean> p.price = 12
12

suissacorp(mongod-2.4.8) be-mean> p
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 12
}
```


Depois salvamos o objeto modificado:

```
db.products.save(p)
Updated 1 existing record(s) in 50ms

suissacorp(mongod-2.4.8) be-mean> db.products.find({name: 'Cachaça'})
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 12
}
Fetched 1 record(s) in 1ms -- Index[none]

```

###Busca

```
var query = {name: 'Vinho'}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho",
  "price": 12,
  "description": "Suco de uva alcoolico"
}
Fetched 1 record(s) in 1ms -- Index[none]

suissacorp(mongod-2.4.8) be-mean> var query = {name: 'vinho'}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
Fetched 0 record(s) in 0ms -- Index[none]
```

**Dica**: para fazermos uma busca *case insensitive* usamos **REGEX**. Como no exemplo abaixo:

```
var query = {name: /vinho/i}
// o "i" que torna insensitive
```


```
var query = {name: /vinho/i}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho",
  "price": 12,
  "description": "Suco de uva alcoolico"
}
Fetched 1 record(s) in 1ms -- Index[none]

```

**Nota**: caso você não passe uma query para o `findOne`, ele irá retornar o primeiro registro inserido.

Para limitarmos quais campos queremos trazer, passamos um objeto com o nome dos campos a serem retornados, no **segundo parâmetro** das funções `find` e `findOne`.

É a mesma função do `SELECT` do SQL.

```
var fields = {name: 1}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query, fields)
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho"
}
Fetched 1 record(s) in 43ms -- Index[none]

suissacorp(mongod-2.4.8) be-mean> var fields = {name: 1, _id: 0}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query, fields)
{
  "name": "Vinho"
}
Fetched 1 record(s) in 1ms -- Index[none]

```
##Operadores Aritméticos

Utilizamos esses operadores especiais como operadores de busca, já que não temos uma linguagem de query como a SQL e sim objetos JSON, para isso foi criado esse formato de query.

```
< ou $lt
Retorna objetos com valores menores que value.

db.collection.find({ "campo" : { $lt: value } } ); 

<= ou $lte
Retorna objetos com valores menores ou igual que value.

db.collection.find({ "campo" : { $lte: value } } );

> ou $gt
Retorna objetos com valores maiores que value.

db.collection.find({ "campo" : { $gt: value } } ); 

>= ou $gte
Retorna objetos com valores maiores ou igual que value

db.collection.find({ "campo" : { $gte: value } } );

```

###`$lt` e `$lte` - "Menor que" e "Menor ou igual que"

```
var query = {price: {$lt: 12}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d09"),
  "name": "Pinga",
  "description": "da braba po tubão",
  "price": 4.5
}
Fetched 1 record(s) in 1ms -- Index[none]

suissacorp(mongod-2.4.8) be-mean> var query = {price: {$lte: 12}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d09"),
  "name": "Pinga",
  "description": "da braba po tubão",
  "price": 4.5
}
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho",
  "price": 12,
  "description": "Suco de uva alcoolico"
}
Fetched 2 record(s) in 1ms -- Index[none]
```

###`$gt` e `$gte` - "Maior que" e "Maior ou igual que"

```
var query = {price: {$gt: 12}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0a"),
  "name": "Uísque",
  "description": "Pra preiboi toma com energético",
  "price": 80
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0b"),
  "name": "Champagne",
  "description": "só podia ser saopaulino",
  "price": 130
}
Fetched 3 record(s) in 2ms -- Index[none]

suissacorp(mongod-2.4.8) be-mean> var query = {price: {$gte: 12}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0a"),
  "name": "Uísque",
  "description": "Pra preiboi toma com energético",
  "price": 80
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0b"),
  "name": "Champagne",
  "description": "só podia ser saopaulino",
  "price": 130
}
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho",
  "price": 12,
  "description": "Suco de uva alcoolico"
}
Fetched 4 record(s) in 1ms -- Index[none]

```

##Operadores Lógicos

###`$or` - OR

```
var query = {$or: [{name: /vinho/i},{price: {$gte: 40}}]}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0a"),
  "name": "Uísque",
  "description": "Pra preiboi toma com energético",
  "price": 80
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0b"),
  "name": "Champagne",
  "description": "só podia ser saopaulino",
  "price": 130
}
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho",
  "price": 12,
  "description": "Suco de uva alcoolico"
}

```

###`$nor` - Not OR

```
var query = {$nor: [{name: /vinho/i},{price: {$gte: 40}}]}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d09"),
  "name": "Pinga",
  "description": "da braba po tubão",
  "price": 4.5
}
Fetched 2 record(s) in 1ms -- Index[none]
```

Para buscarmos uma faixa específica de preços podemos fazer a seguinte query:

###`$and`

```
// maior ou igual que 12 E menor que 80

var query = {$and: [{price: {$lt: 80}},{price: {$gte: 12}}]}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23
}
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho",
  "price": 12,
  "description": "Suco de uva alcoolico"
}
Fetched 2 record(s) in 28ms -- Index[none]
```

###`$ne` - Not equal

Não aceita REGEX.

```
var query = {name: {$ne: /vinho/i}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
error: {
  "$err": "invalid regular expression operator",
  "code": 13454
}

suissacorp(mongod-2.4.8) be-mean> var query = {name: {$ne: 'Vinho'}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d09"),
  "name": "Pinga",
  "description": "da braba po tubão",
  "price": 4.5
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0a"),
  "name": "Uísque",
  "description": "Pra preiboi toma com energético",
  "price": 80
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0b"),
  "name": "Champagne",
  "description": "só podia ser saopaulino",
  "price": 130
}
```

##Busca em Arrays

###`$in` e `$nin` - In e Not In

Para isso vamos adicionar um `Array` de tags em um objeto utilizando a técnica do `finOne` e `save`.

```
var p = db.products.findOne()

suissacorp(mongod-2.4.8) be-mean> p
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23
}

suissacorp(mongod-2.4.8) be-mean> p.tags = ['branquinha', 'marvada']
[
  "branquinha",
  "marvada"
]

suissacorp(mongod-2.4.8) be-mean> db.products.save(p)
Updated 1 existing record(s) in 2ms

suissacorp(mongod-2.4.8) be-mean> db.products.findOne({name: 'Cachaça'})
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23,
  "tags": [
    "branquinha",
    "marvada"
  ]
}

```

###`$in` - IN

Retorna todos os objetos que possuem algum dos valores do `Array`.

```
db.products.find(query)
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23,
  "tags": [
    "branquinha",
    "marvada"
  ]
}
Fetched 1 record(s) in 1ms -- Index[none]

suissacorp(mongod-2.4.8) be-mean> var query = {tags: {$in: ['branquinha', 'asduihasuihduia']}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23,
  "tags": [
    "branquinha",
    "marvada"
  ]
}
Fetched 1 record(s) in 0ms -- Index[none]
```

###`$nin` - Not IN

Retorna todos os objetos que não possuem aqueles valores do `Array`.

```
var query = {tags: {$nin: ['branquinha']}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d09"),
  "name": "Pinga",
  "description": "da braba po tubão",
  "price": 4.5
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0a"),
  "name": "Uísque",
  "description": "Pra preiboi toma com energético",
  "price": 80
}
{
  "_id": ObjectId("54614d5c5b9f2b586cb31d0b"),
  "name": "Champagne",
  "description": "só podia ser saopaulino",
  "price": 130
}
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho",
  "price": 12,
  "description": "Suco de uva alcoolico"
}
Fetched 4 record(s) in 2ms -- Index[none]

```

###`$all` - Todos

Retorna todos os objetos que possuem todos os valores buscados. Se um não validar a busca, ele não retorna o objeto.

```
var query = {tags: {$all: ['branquinha', 'marvada']}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23,
  "tags": [
    "branquinha",
    "marvada"
  ]
}
Fetched 1 record(s) in 0ms -- Index[none]

suissacorp(mongod-2.4.8) be-mean> var query = {tags: {$all: ['branquinha', 'BAZINGA']}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
Fetched 0 record(s) in 1ms -- Index[none]

```

###`$exists` - Existe

Retorna os objetos que possuem aquele campo. Muito útil em um sistema **Schemaless** e principalmente nesse exemplo com **tags**.

**Por exemplo**: Em um blog onde você está servindo um JSON para montar uma nuvem de tags, com esse operador você irá retornar apenas os objetos que possuam tags, eliminando uma verificação adicional.

```
var query = {tags: {$exists: 1}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23,
  "tags": [
    "branquinha",
    "marvada"
  ]
}
Fetched 1 record(s) in 1ms -- Index[none]
```

###`$size` - Tamanho

Retorna os objetos que possuem o tamanho exato do *Array* buscado.

```
var query = {tags: {$size: 2}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
{
  "_id": ObjectId("54614a0a5b9f2b586cb31d08"),
  "name": "Cachaça",
  "description": "Mé brasileiro",
  "price": 23,
  "tags": [
    "branquinha",
    "marvada"
  ]
}
Fetched 1 record(s) in 2ms -- Index[none]

suissacorp(mongod-2.4.8) be-mean> var query = {tags: {$size: 1}}

suissacorp(mongod-2.4.8) be-mean> db.products.find(query)
Fetched 0 record(s) in 1ms -- Index[none]

```

##Alteração

Em vez de alterarmos um valor usando o `save` usaremos agora a função `update` que recebe 4 parâmetros:

- query
- modificação
- upsert = false
- multi = false

```
db.colecao.update(query, mod, upsert, multi);
```

###Query

É o objeto que representa qual registro queremos alterar.

```
var query = {name: /vinho/i};

db.colecao.update(query, mod);
```

###Modificação

É o objeto que contém a modificação desejada.

```
var mod = {$inc: {views: 1}};

db.colecao.update({}, mod);
```

###Upsert

É o parâmetro que vem `false` por padrão, mas se mudado para `true`, vai inserir o objeto de modificação caso não ache o registro com a query passada.

```
var query = {name: /vinho/i};
var mod = {name: 'Vinho', price: '23'};

db.colecao.update(query, mod, true, false);
```

###Multi

É o parâmetro que vem `false` por padrão, mas se mudado para `true` vai alterar todos os registro encontrados com a query passada. 

Sem ele o MongoDb só irá alterar o **primeiro registro encontrado**.

##Operadores de alteração

###$set

É usado para atualizar uma determinada parte do objeto. Quando o objeto não contiver os atributos para serem atualizados, essas novas propriedades serão criadas.

```
// vinho antes do $set
db.products.find({ name: 'Vinho' })
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "Vinho",
  "price": 12,
  "description": "Suco de uva alcoolico"
}

var query = { name: 'Vinho' };
var alt = { $set: {
  "name": "vinho",
  "price": 13
}};

db.products.update(query, alt)

db.products.find({ name: 'Vinho' })
// busca não retorna nada

db.products.find({ name: 'vinho' })
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "vinho",
  "price": 13,
  "description": "Suco de uva alcoolico"
}

```

###$unset

Deleta um campo em particular. Se não existir este campo, o operador não faz nada.

```
// vinho antes do $unset
db.products.find({ name: 'vinho' })
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "vinho",
  "price": 13,
  "description": "Suco de uva alcoolico"
}

var query = { name: 'vinho' };
var alt = { $unset: { "price": 13 }};

db.products.update(query, alt)

db.products.find({ name: 'vinho' })
{
  "_id": ObjectId("546157b75b9f2b586cb31d0c"),
  "name": "vinho",
  "description": "Suco de uva alcoolico"
}

```

###$inc

Incrementa um valor no campo. Caso o campo não exista, ele irá criar o campo e setar o valor. Para decrementar, basta passar um valor negativo.

```
{ $inc : { campo : valor } }
db.products.update( { name: 'Pinga'}, { $inc: { views: 1 } } );
```

##Operadores de alteração em arrays

###$push

Adiciona um valor ao campo se o campo for um array existente. Caso contrário, transforma o campo em um array com o valor como índice. Porém, se o campo existe e não for um array, irá retornar um erro.

```
{ $push : { campo : valor } }

db.professores.update( { name: 'Pinga' }, { $push: { tags: 'marvada'} } );
```

###$pushAll

Adiciona cada valor dentro de valor_array para o campo se o campo for um array existente. Caso contrário, seta o campo com o valor_array. Se o campo estiver presente mas não for um array, irá retornar um erro.

```
{ $pushAll : { campo : valor_array } }

db.professores.update( { nome: ‘Suissa’}, { $pushAll: { cursos: [‘MongoDb’, ’AngularJs’, ‘Node.js’]  } } );
```

###$pull

Remove um valor do campo se o campo for um array existente. Caso contrário, transforma o campo em um array com o valor como índice. Porém, se o campo existe e não for um array, irá retornar um erro.

```
{ $pull : { campo : valor } }

db.professores.update( { name: 'Pinga' }, { $pull: { tags: 'marvada'} } );
```

Arrays múltiplos podem ser alterados em uma única operação separando os pares de campo : valor por vírgula.

```
{ $pull : { campo1 : valor, campo2 : valor2 } }
```

###$pullAll

Adiciona cada valor dentro de valor_array para o campo se o campo for um array existente. Caso contrário, seta o campo com o valor_array. Se o campo estiver presente mas não for um array, irá retornar um erro.

```
{ $pullAll : { campo : valor_array } }

db.professores.update( { nome: ‘Suissa’}, { $pullAll: { cursos: [‘MongoDb’, ’AngularJs’, ‘Node.js’]  } } );
```

##Count

Assim como temos no Relacional, também temos a função *count* que serve para retornar a quantidade de registros encontrados naquela query.

```
select count(*) from products
db.products.count({})

select count(*) from products where price > 2
db.products.count({price:{$gt: 2}})
```

##Ordenação

Para ordenarmos uma consulta no MongoDB, precisamos apenas utilizar a função `sort()`, como no exemplo a seguir:

```
db.products.find({}).sort({price: 1});
```

Utilizamos o valor 1 para ordenação ASCENDENTE e -1 para ordenação DESCENDENTE.

```
select * from products order by name ASC
db.products.find().sort({name:1})

select * from products order by idade DESC
db.products.find().sort({price:-1})
```

###Limit

Serve para limitar a quantidade de valores retornados.

```
select * from products order by name ASC limit 0,2
db.products.find().sort({name:1}).limit(2)
```

###Skip

O `skip` serve para pular uma quantidade X de elementos. 

```
select * from products limit 2 offset 10
db.products.find().limit(2).skip(10)
```

Usando o `limit` com o `skip` podemos criar facilmente uma paginação. Basicamente só precisamos do número da página e quantidade de registros por página, com isso podemos usá-los da seguinte forma:

```
var numero_pagina = 0
var limit = 10

skip = numero_pagina * limit

//pag 0
db.products.find().limit(10).skip(0)

var numero_pagina = 1
//pag 1
db.products.find().limit(10).skip(10)
```

###Remove

Para remover os registros no MongoDb usamos o `remove`, passando uma query para remover apenas os registros desejados. 

Caso não seja passada nenhuma query, ele irá remover **TODOS OS REGISTROS DA COLEÇÃO**, então **muito cuidado**, pois o `remove` **não** é como o `update` que o `multi` é false, aqui se rodar sem a query **JÁ ERA**!

```
db.products.remove({name: "Champagne"}); 
// exclui todos os registro com name = Champagne
```

**Caso necessite remover um registro opte sempre pelo seu `_id`.**

##Índices

Os índices são responsáveis por indexar nossos registros a partir de um campo ou mais, para que sejam rapidamente acessados por esse(s) valor(es).

Eles fazem uma grande diferença no MongoDb, ainda mais se o caso for de criar indíces múltiplos.

Como dito anteriormente, na modelagem, nós pensamos nas perguntas do sistema para modelar o banco, no caso, quais serão suas buscas principais.

Para criarmos um índice usamos o `ensureIndex`.

```
db.products.ensureIndex({ name:1 }); 
db.products.ensureIndex({ name:1, price:-1 });
```

Para pegarmos todos os índices da nossa collection `professores` usamos getIndexes().
```
db.products.getIndexes()
```

Para pegar todos os índices do database usamos o `find()` em uma collection do sistema.

```
db.system.indexes.find()
```

Para deletar um índice usamos o seguinte comando
```
db.products.dropIndex("name_1")
```

Para criar índices únicos.
```
db.products.ensureIndex( { name: 1 }, { unique: true })
{
  "createdCollectionAutomatically": false,
  "numIndexesBefore": 1,
  "numIndexesAfter": 2,
  "ok": 1
}

db.products.getIndices()
[
  {
    ...
  },
  {
    "v": 1,
    "unique": true,
    "key": {
      "name": 1
    },
    "name": "name_1",
    "ns": "bemean.products"
  }
]
```
Veja que passamos como segundo parâmetro um JSON com a chave `unique` com valor `true`. Existem outras possibilidade para a criação de [índices](http://docs.mongodb.org/manual/reference/method/db.collection.ensureIndex/).

###Explain

Um ótimo comando para verificarmos como nossas queries estão sendo executadas. Podemos usar o conhecido `explain`, e ele será de grande utilidade quando precisarmos otimizar nossas queries.

```
db.products.find({}).explain();
{
    "cursor" : "BasicCursor",
    "indexBounds" : [ ],
    "nscanned" : 57594,
    "nscannedObjects" : 57594,
    "nYields" : 2 ,
    "n" : 3 ,
    "millis" : 108,
    "indexOnly" : false,
    "isMultiKey" : false,
    "nChunkSkips" : 0
}
```

Vamos entender um pouco melhor esses valores:

- cursor: tipo de índice usado
- BasicCursor: sem index, fez um tablescan
- BtreeCursor: uso de algum índice
- indexBounds: faixa de busca usada
- nscanned: número de itens(documentos e índices) scaneados
- nscannedObject: número de documentos scaneados
- nYields: número de vezes que esperou um lock de leitura
- n: número de documentos encontrados para a busca
- milis: tempo de execução da query em milisegundos
- indexOnly: verdadeiro se a busca pode ser feita apenas com índice
- isMultiKey: verdadeiro se um índice múltiplo foi usado
- nChunkSkips: número de documentos ignorados por causa da migração de chunks de sharding


##Relacionamentos

No MongoDb podemos utilizar 2 formas de relacionar os documentos. 

Podemos usar seu `ObjectId` ligando diretamente pelo seu `_id` e fazendo uma segunda busca para retornar o documento relacionado, ou podemos usar o `DBRef` que faz essa ligação automática.

`DBRef` é o esquema nativo de referência interna entre os documentos.

```
db.professores.insert({login: "suissa"})

db.professores.find()
{ "_id" : ObjectId("51ccffa2c49bec6fd946c929"), "login" : "suissa" }

db.workshop.insert({nome: "Be MEAN", professor: {"$ref": "professores", "$id": "51ccffa2c49bec6fd946c929"} })

var obj = db.workshop.findOne()
{
"_id" : ObjectId("51ccffe9c49bec6fd946c92a"),
"nome" : "Be MEAN",
"professor" : DBRef("professores", "51ccffa2c49bec6fd946c929")
}
```

##Sharding

Precisamos entender como é a arquitetura de um cluster com MongoDB, nele possuímos 3 serviços diferentes que são:

- shards
- config servers
- router

![](http://docs.mongodb.org/manual/_images/sharded-cluster.png)

###Shards

Cada shard é uma instância do MongoDb que guarda um pedaço dos dados da coleção.

###Config Servers

Cada config server é uma instância do MongoDb que guarda os metadados sobre o cluster. Os metadados mapeiam os pedaços de dados para os shards.

###Router

Cada router é uma instância `mongos` que faz o roteamento das escritas e leituras para os shards. A aplicação não acessa diretamente os shards.

##GridFS

GridFS é o sistema de arquivos do MongoDb e deve ser usado quando precisamos disponibilizar arquivos.

Para utilizar o GridFS usaremos o `mongofiles`:

```
mongofiles -d database put my_music.mp3

mongofiles -d myfiles put my_music.mp3
connected to: 127.0.0.1

added file: {
  _id: ObjectId('4ce9ddcb45d74ecaa7f5a029'),
  filename: "my_music.mp3",
  chunkSize: 262144,
  uploadDate: new Date(1290395084166),
  md5: "7872291d4e67ae8b8bf7aea489ab52c1",
  length: 1419631 }
```

Ele automaticamente irá gerar 2 coleções dentro do database informado:

- fs.chunks
- fs.files

Na coleção `fs.chunks` fica nosso arquivo binário divido em pequenas partes, chamadas de chunks, e na coleção `fs.files` temos os metadados do arquivo armazenado, como:

- _id
- filename
- chunkSize
- uploadDate
- md5
- lenght

Você deve ter notado que temos o campo md5, para que o md5 do arquivo pode ser interessante nesse caso? 

Bom, você pode fazer uma busca pelo md5 e caso encontre mais de 1 registro, é porque existem arquivos duplicados, ai você decide o que fazer com ele.

[Introdução](https://github.com/ericdouglas/be-MEAN-resources/blob/master/ebook/00-intro.md) | [Node.JS](https://github.com/ericdouglas/be-MEAN-resources/blob/master/ebook/02-nodejs.md)