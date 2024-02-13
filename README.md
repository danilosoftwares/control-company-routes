# Aplicação de gerenciamento de clientes e gerador de rotas

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Esta aplicação tem por objeto permitir o gerenciamento de clientes e uma funcionalidade para organizar a ordem de rotas de visitas de clientes.

## Baixando e executando aplicaçao sem clonar repositorio
```sh
curl --remote-name https://raw.githubusercontent.com/danilosoftwares/control-company-routes/main/.env
curl --remote-name https://raw.githubusercontent.com/danilosoftwares/control-company-routes/main/docker-compose.yml
docker-compose up -d
```

## Clonando repositorio
```sh
git clone https://github.com/danilosoftwares/control-company-routes.git
```

## Baixando e Excutando aplicação no Docker
Somente com o docker instalado é possivel rodar a aplicação que irá gerar um banco de dados postgres com uma tabela previamente criada e com backend em nodejs e frontend em reactjs.

```sh
docker-compose up -d
```

## Buildando e Executando a aplicação no Docker Local
Somente com o docker instalado é possivel buildar e rodar a aplicação local diretamente do repositorio, onde a mesma irá subir o banco de dados em postgres e gerar a tabela necessária para o uso da api e do frontend.
Basta estar com o terminal na pasta do repositorio do arquivo docker-compose e rodar o seguinte comando:

```sh
docker-compose -f docker-compose-local.yml up -d
```

## Usando a aplicação local
Apos executar ou buildar/excutar a aplicação local é possivel acessar a api no host http://localhost:3003/ e acessar o frontend da aplicação no host http://localhost:3004/

# BackEnd
O BackEnd foi desenvolvido em NodeJS utilizando o framework express para montagem da api e conectando-se a um banco de dados postgres.
A Aplicação utilizou dos seguintes itens:
- Frameworks
    - [Express](https://expressjs.com/)
    - [Postgres](https://www.npmjs.com/package/pg)
- Banco de Dados
    - [Postgres](https://www.postgresql.org/)  

### A Aplicação tem os seguintes endpoints:
## Get /
Rota utilizada para verificar se servidor esta ativo

Exemplo de Request:
```sh
curl --location 'http://localhost:3003/'
```
Exemplo de Response:
```json
{
    "status": true,
    "message": "server control company routes online!"
}
```
## Get /Clients
Rota utilizada para buscar todos ou alguns clientes

Exemplo de Request:
```sh
curl --location 'http://localhost:3003/clients'
```
Exemplo de Response:
```json
[
    {
        "id": 3,
        "name": "João Santos",
        "document": "09876543210",
        "positionx": "-23.54947300",
        "positiony": "-46.63511500",
        "email": "joao.santos@email.com",
        "phone": "(11) 8888-8888"
    },
    {
        "id": 4,
        "name": "Maria Oliveira",
        "document": "23456789012",
        "positionx": "-23.55156500",
        "positiony": "-46.63206000",
        "email": "maria.oliveira@email.com",
        "phone": "(11) 7777-7777"
    }
]
```
 É possível com esse mesmo endopint fazer filtros

Exemplo de Request:
```sh
curl --location 'http://localhost:3003/clients?filter=maria.oliveira'
```
Exemplo de Response:
```json
[
    {
        "id": 4,
        "name": "Maria Oliveira",
        "document": "23456789012",
        "positionx": "-23.55156500",
        "positiony": "-46.63206000",
        "email": "maria.oliveira@email.com",
        "phone": "(11) 7777-7777"
    }
]
```
## Get /Clients/:id
Rota utilizada para buscar um cliente especifico

Exemplo de Request:
```sh
curl --location 'http://localhost:3003/clients/4'
```
Exemplo de Response:
```json
[
    {
        "id": 4,
        "name": "Maria Oliveira",
        "document": "23456789012",
        "positionx": "-23.55156500",
        "positiony": "-46.63206000",
        "email": "maria.oliveira@email.com",
        "phone": "(11) 7777-7777"
    }
]
```

## Post /Clients
Rota utilizada para gravar um cliente no banco de dados

Exemplo de Request:
```sh
curl --location 'http://localhost:3003/clients' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Nome do Cliente2",
  "document": "315156465464",
  "positionx": -77.6359,
  "positiony": -10.5478,
  "email": "cliente@email.com",
  "phone": "(11) 9999-8888"
}
'
```
Exemplo de Response:
```json
{
    "id": 13,
    "name": "Nome do Cliente2",
    "document": "315156465464",
    "positionx": -77.6359,
    "positiony": -10.5478,
    "email": "cliente@email.com",
    "phone": "(11) 9999-8888"
}
```

## Put /Clients
Rota utilizada para alterar um cliente no banco de dados

Exemplo de Request:
```sh
curl --location --request PUT 'http://localhost:3003/clients/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Ana Silva",
    "document": "12345678900",
    "positionx": "-23.55052000",
    "positiony": "-46.63330900",
    "email": "ana.silva@email.com",
    "phone": "(11) 9999-9999"
}'
'
```
Exemplo de Response:
```json
{
    "id": 2,
    "name": "Ana Silva",
    "document": "12345678900",
    "positionx": "-23.55052000",
    "positiony": "-46.63330900",
    "email": "ana.silva@email.com",
    "phone": "(11) 9999-9999"
}
```

## Delete /Clients/:id
Rota utilizada para deletar um cliente no banco de dados

Exemplo de Request:
```sh
curl --location --request DELETE 'http://localhost:3000/clients/13'
```
Exemplo de Response:
```json
{
    "message": "Client deleted successfully."
}
```
## Get /Clients/Route
Rota utilizada para trazer em ordem de distancia os clientes mais proximos do estabelecimento com coordenada (x:0,y:0)

Exemplo de Request:
```sh
curl --location 'http://localhost:3003/clients/route'
```
Exemplo de Response:
```json
[
    {
        "id": 11,
        "name": "Rafael Silva",
        "document": "90123456789",
        "positionx": "-23.54526900",
        "positiony": "-46.62970600",
        "email": "rafael.silva@email.com",
        "phone": "(11) 0000-0000",
        "distance": 52.2370479059527
    },
    {
        "id": 9,
        "name": "Eduardo Pereira",
        "document": "78901234567",
        "positionx": "-23.54633000",
        "positiony": "-46.63077900",
        "email": "eduardo.pereira@email.com",
        "phone": "(11) 2222-2222",
        "distance": 0.001508989728260562
    },
    {
        "id": 7,
        "name": "Bruno Ferreira",
        "document": "56789012345",
        "positionx": "-23.54739100",
        "positiony": "-46.63185300",
        "email": "bruno.ferreira@email.com",
        "phone": "(11) 4444-4444",
        "distance": 0.0015097009637692227
    }
]
```
# FrontEnd
O FrontEnd foi desenvolvido em ReactJS utilizando de um framework visual chamado rsuite que permite a montagem de componentes visuais com estilização pronta.
A Aplicação utilizou os seguintes itens:
- Frameworks
    - [RSuite](https://rsuitejs.com/)
    
## Demonstração de Uso
![](demonstracao.gif)    

## License

MIT

