# Projeto Financeiro 

Esse projeto consiste em uma analise estatistica financeira dos seus gastos.
___

## Índice
1. [Organização de pastas](#organização-de-pastas)
2. [Tecnologias](#tecnologias)
3. [Endpoints](#endpoints)

___

### Organização de pastas

**Controllers**<br>
Na pasta _**controllers**_ estão organizados os End-points de criação/exibição de despesas e usuários.

**Models** <br>
Na pasta _**models**_ é onde se configura as tabelas de usuários e despesas no banco de dados da aplicação.

**Repositories** <br>
A pasta _**repositories**_ estão as lógicas responsaveis de salvar dados ou manipular dados que estão salvos no banco de dados de determinada tabela (usuários ou despesas)

**Services**<br>
Na pasta _**services**_ é onde estão os métodos responsaveis por ligar as requisições das controllers, com os dados que serão manipulados no banco de dados, como por exemplo, tratar os dados de um usuário, e salvar de forma correta no banco de dados. 

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
