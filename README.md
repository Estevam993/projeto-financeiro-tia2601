# Projeto Financeiro

Esse projeto consiste em uma analise estatistica financeira dos seus gastos.
___

## Índice

1. [Organização de pastas](#organização-de-pastas)
2. [Tecnologias](#tecnologias)
3. [Endpoints](#endpoints)
3. [Como funciona?](#como-funciona)

___

### Organização de pastas

**Controllers**<br>
Na pasta _**controllers**_ estão organizados os End-points de criação/exibição de despesas e usuários.

**Models** <br>
Na pasta _**models**_ é onde se configura as tabelas de usuários e despesas no banco de dados da aplicação.

**Repositories** <br>
A pasta _**repositories**_ estão as lógicas responsaveis de salvar dados ou manipular dados que estão salvos no banco de
dados de determinada tabela (usuários ou despesas)

**Services**<br>
Na pasta _**services**_ é onde estão os métodos responsaveis por ligar as requisições das controllers, com os dados que
serão manipulados no banco de dados, como por exemplo, tratar os dados de um usuário, e salvar de forma correta no banco
de dados.

___

### Tecnologias

Tecnologias utilizadas:

**Linguagem**<br>

- Python

**Banco de dados**<br>

- SQLite
- SQLAlchemy (ORM)

**WSGI (Web Server Gateway Interface)** <br>

- Flask

**Analise Estatistica**<br>

- scikit-learn
- NumPy

**Testes de API**<br>

- postman

___

### Endpoints

**Criar Usuário** _POST_<br>
URL: `{{url}}usuarios` <br><br>
Body:

```json
{
  "nome": "Joãozitos",
  "email": "jonas@gmail.com"
}
```

Retorno:

```json
{
  "email": "jonaaas@gmail.com",
  "id": 2,
  "nome": "Joãozitos"
}
```

**Login** _POST_<br>
URL: `{{url}}/usuarios/login`
Body:

```json
{
  "email": "jonas@gmail.com"
}
```

Retorno:

```json
{
  "message": "sucesso ao realizar login",
  "user": 1
}
```

> [!info]
> Os dados após o login são armazenados via Session pelo Flask

**Criar Despesas** _POST_ <br>
URL: `{{url}}/despesas/` <br><br>
Body:

```json
{
  "valor": 21.3,
  "tipo": "Comida",
  "descricao": "Almoço"
}
```

Retorno:

```json
{
  "id": 9,
  "message": "Despesa criada com sucesso"
}
```

**Pegar Despesas** _GET_ <br>
URL: `{{url}}/despesas/` <br><br>
Retorno:

```json
{
  "despesa": {
    "despesas": [
      {
        "date": "2026-03-02",
        "descricao": "Aluguel",
        "id": 6,
        "tipo": "Aluguel",
        "user_id": 1,
        "valor": 800.0
      },
      {
        "date": "2026-02-09",
        "descricao": "Aluguel",
        "id": 7,
        "tipo": "Aluguel",
        "user_id": 1,
        "valor": 800.0
      },
      {
        "date": "2026-04-09",
        "descricao": "Aluguel",
        "id": 8,
        "tipo": "Aluguel",
        "user_id": 1,
        "valor": 800.0
      }
    ],
    "total": 2400,
    "valores": {
      "Aluguel": 2400.0
    }
  },
  "status": "OK"
}
```

**Media e Previsões de Despesas** _GET_ <br>
URL: `{{url}}/despesas/mensal?limite=2000` <br>
Parametros:

- *limite*: limite de gastos que o usuário estabeleceu <br>

Retorno:

```json
{
  "dados": [
    {
      "date": "2026-04-09",
      "descricao": "Aluguel",
      "id": 8,
      "tipo": "Aluguel",
      "user_id": 1,
      "valor": 800.0
    },
    {
      "date": "2026-04-09",
      "descricao": "Almoço",
      "id": 9,
      "tipo": "Comida",
      "user_id": 1,
      "valor": 21.3
    }
  ],
  "despesa": {
    "media_diaria": 91.26,
    "previsao_final": 1798.77,
    "previsao_linear": 2737.67,
    "previsao_modelo": 859.88,
    "vai_estourar": false
  },
  "status": "OK"
}
```

___

### Como funciona?

> [!WARNING]
> Sera necessario criar um usuário, e fazer login para que funcione corretamente!

Ao criar uma despesa, o usuario vai acumulando gastos mensais, e com gastos o suficiente, o aplicativo conseguira criar
uma média mensal. <br>
Por exemplo: <br>
Um usuário com essas despesas:

| data       | descricao        | id | tipo    | user_id | valor |
|------------|------------------|----|---------|---------|-------|
| 2026-02-09 | Aluguel          | 7  | Aluguel | 1       | 800   |
| 2026-03-02 | Aluguel          | 6  | Aluguel | 1       | 800   |
| 2026-03-01 | Cinema           | 1  | Lazer   | 1       | 17.8  |
| 2026-03-01 | Parquinho        | 2  | Lazer   | 1       | 10.8  |
| 2026-03-01 | Bauru            | 3  | Comida  | 1       | 5.8   |
| 2026-03-02 | Almoço           | 4  | Comida  | 1       | 23.04 |
| 2026-03-02 | parque diversões | 5  | Lazer   | 1       | 37    |
| 2026-04-09 | Aluguel          | 8  | Aluguel | 1       | 800   |
| 2026-04-09 | Almoço           | 9  | Comida  | 1       | 21.3  |

Terá esses valores:

| Nome    | Valor |
|---------|-------|
| Aluguel | 2400  |
| Comida  | 50.14 |
| Lazer   | 65.6  |

E esse total:
**R$ 2515,74** <br>

Quando for requisitado o endpoint de Despesas Mensais, sera analisado primeiro as despesas
do mês atual:

| data       | descricao | id | tipo    | user_id | valor |
|------------|-----------|----|---------|---------|-------|
| 2026-04-09 | Aluguel   | 8  | Aluguel | 1       | 800   |
| 2026-04-09 | Almoço    | 9  | Comida  | 1       | 21.3  |

Fazendo a média diaria, e a previsão linear, que resultara nos seguintes valores:

| Previsão        | Valor   |
|-----------------|---------|
| media diaria    | 91.26   |
| previsao linear | 2737.67 |

Só após isso, é realizada uma previsão de gastos futuros utilizando regressão linear com base no histórico de despesas
do usuário.

- X representa a sequência temporal dos meses
- y representa os valores totais gastos em cada mês

O modelo é treinado com os totais mensais e projeta o valor para o próximo período.

Resultado final das previsões:

| Previsão        | Valor   |
|-----------------|---------|
| media_diaria    | 91.26   |
| previsao_final  | 1798.77 |
| previsao_linear | 2737.67 |
| previsao_modelo | 859.88  |
| vai_estourar    | false   |

