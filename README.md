# Talker Manager

Este é um projeto que foi desenvolvido como parte do curso de Desenvolvimento de Software da Trybe, com o objetivo de praticar o uso das ferramentas Express, FS e regras de negócio.

O projeto consiste na implementação de um CRUD para o arquivo talker.json, que contém informações sobre os palestrantes. Os dados estão organizados em um formato JSON.

## Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- JavaScript ES6
- Node.js
- Express

## Instalação do projeto localmente

Para instalar este projeto na sua máquina localmente siga estes passos

1. Clone este repositório usando 

```javascript
  git clone git@github.com:gabrielMatosBoubee/backend-talker-manager.git
```

2. Instale as dependências usando 

```javascript
  npm install
```
3. Execute o docker-compose && entre no terminal

```javascript
  docker-compose up -d &&
  docker exec -it talker_manager bash && 
  npm run dev
```
4. Execute outro terminal para os testes

```javascript
  docker exec -it talker_manager bash
```

5. Execute os testes usando 

```javascript
  npm test
```

## Requisitos do projeto

1 - Crie o endpoint GET /talker

2 - Crie o endpoint GET /talker/:id

3 - Crie o endpoint POST /login

4 - Adicione as validações para o endpoint /login

5 - Crie o endpoint POST /talker

6 - Crie o endpoint PUT /talker/:id

7 - Crie o endpoint DELETE /talker/:id

8 - Crie o endpoint GET /talker/search?q=searchTerm

## Agradecimentos

Agradeço à Trybe pela oportunidade de aprender sobre Express neste projeto.
