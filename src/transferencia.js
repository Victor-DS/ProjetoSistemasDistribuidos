const AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
  event.headers = event.headers || [];
  event.headers['X-FORWARDED-USER'] = 'username';
  main(event, context, callback);
}


function main(event, context, callback) {
  if(event.path === '/api/v1/transferencia' && event.httpMethod == 'POST' 
      && event.conta_origem != undefined && event.conta_destino != undefined && event.valor > 0) {
    return transferencia(callback, event.conta_origem, event.conta_destino, event.valor);
  } else {
    return done(500, JSON.stringify({error: 'Parametros errados'}), 'application/json', callback);
  }
}

function transferencia(callback, id_origem, id_destino, valor) {
  var contas = contasDummy();

  var conta_origem = contas[id_origem];
  var conta_destino = contas[id_destino];

  if(conta_origem == undefined || conta_destino == undefined) {
    return done(404, JSON.stringify({
        error: 'Verifique os parametros, uma das contas nao existe!'
      }), 'application/json', callback);
  }

  conta_origem.saldo -= valor;
  conta_destino.saldo += valor;

  return done(200, JSON.stringify({
    message: 'Sucesso',
    contas: { 
      id_origem: conta_origem.id, 
      saldo_novo_origem: conta_origem.saldo,
      id_destino: conta_destino.id,
      saldo_novo_destino: conta_destino.saldo
    }
  }), 'application/json', callback);
}


function done(statusCode, body, contentType, callback) {
  callback(null, {
    statusCode: statusCode,
    body: body,
    headers: {
      'Content-Type': contentType
    }
  });
}


function contasDummy() {
  var map = {};
  var count = 10;

  var conta;
  while(count > 0) {
    conta = new Conta(count, Math.floor(Math.random() * (100000 - 100 + 1)) + 100);

    map[conta.id] = conta;
    count--;
  }

  return map;
}

function Conta(id, saldo) {
  this.id = id;
  this.saldo = saldo;
}