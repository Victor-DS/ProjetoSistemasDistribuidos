# Projeto Sistemas Distribuidos


## Arquitetura

Para este projeto, foi escolhido uma arquitetura **Serverless**, baseado no **AWS Lambda** e implementado em **Javascript**.

### Serverless

Basicamente, uma arquitetura Serverless refere-se à aplicações onde o servidor é gerenciado por um provedor de serviços cloud. Em outras palavras, um modelo onde você não precisa se preocupar com o servidor. Isto torna a aplicação altamente escalável e por isto foi selecionado esta arquitetura.


### AWS Lambda

Com isso em mente, a escolha mais popular para este tipo de aplição é o AWS Lambda, onde você consegue definir funções e criar microserviços e endpoints ao redor delas.

O *Lambda* está disponível em diversas lingaguens, e a escolha foi o Javascript pela velocidade. As instâncias das máquinas são inicializadas quando há um request para o endpoint, e a inicialização do Javascript é mais rápida que de outras linguagens como Java. 

O processo todo leva milissegundos independente da linguagem, mas a idéia era fazer um sistema que fosse o mais rápido e escalável possível.


## Projeto

O projeto contém três pastas:

- **src**: Aqui estão os scripts de cada um dos microserviços. Todos independentes, como funciona no *Lambda*, por isso há uma repetição de código;

- **sample_events**: Contém exemplos das entradas de cada um dos serviços. Podem ser usados para testar e verificar o JSON de entrada de cada um;

- **node_modules**: Módulos e libs necessários para o *Lambda*, como por exemplo o SDK da AWS;


## Como rodar

1. Instale o ``lambda-local`` para testar localmente:
```
npm install -g lambda-local
```

2. Depois disso, basta ir até a pasta, e executar o serviço desejado com o JSON correspondente que está na pasta ``sample_events``. Por exemplo, para consultar o saldo:
```
lambda-local -l src/saldo.js -e sample_events/saldo.json
```
Substitua saldo, pelo nome de qualquer outro serviço que queira testar.


## Leia mais

- [AWS Lambda](https://aws.amazon.com/pt/lambda/)
- [lambda-local](https://www.npmjs.com/package/lambda-local)
- [Serverless Architectures](https://martinfowler.com/articles/serverless.html)


## Observações

- Como dito anteriormente, as instâncias das máquinas são inicializadas no request, isto significa que como não temos um banco persistindo os dados, e o valor das contas é inicializado junto ao script aleatoriamente, as operações são feitas na conta, mas os valores não vão bater se você puxar o saldo duas vezes seguidas, ou o saldo e fazer uma operação de saque/depósito/transferência.
