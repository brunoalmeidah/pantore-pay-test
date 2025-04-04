
# Pantore Pay API

Api para cadastro de usuários


## Gerenciador de pacote

Para executar e instalar dependências é preciso ativar o gerenciador de pacotes pnpm

```bash
  corepack enable pnpm
```
## Instalação

Instale as dependencias do projeto

```bash
  cd pantore-pay-test
  pnpm install
```

## Migração

Para rodar a migração execute

```bash
  pnpm run:migration
```

pode ser necessário gerar as entidades e tipos do prisma, caso ocorra algum erro na execução do projeto por causa do prisma execute o seguinte comando

```bash
  pnpm run:generate
```

## Testes

Para executar o teste unitário execute o seguinte comando

```bash
  pnpm test
```

Para os testes de integração precisamos criar um banco de teste e um arquivo chamado .env.test.local na raiz do projeto colocando o DATABASE_URL com a url do banco de teste. Ao configurar o banco de teste e a env de teste, temos que executar a migração:

```bash
  pnpm test:migrate
```

Para executar os testes de integração

```bash
  pnpm test:e2e
```

## Executando

Para executar o projeto execute o comando    

```bash
  pnpm start:dev
```
## Documentação

Para acessar a documentação

```
http://localhost:3000/docs
```
## URL Online

http://ec2-52-67-32-98.sa-east-1.compute.amazonaws.com/

