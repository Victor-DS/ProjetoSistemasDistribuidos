const AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
  event.headers = event.headers || [];
  event.headers['X-FORWARDED-USER'] = 'username';
  main(event, context, callback);
}


function main(event, context, callback) {
  if(event.path === '/api/v1/saldo' && event.httpMethod == 'GET' 
      && event.conta != undefined) {
    return saldo(callback, event.conta, event.valor);
  } else {
    return done(500, JSON.stringify({error: 'Parametros errados'}), 'application/json', callback);
  }
}

function saldo(callback, id, valor) {
  var contas = contasDummy();

  var conta = contas[id];

  if(conta == undefined) {
    return done(404, JSON.stringify({error: 'Conta inexistente'}), 'application/json', callback);
  }

  return done(200, JSON.stringify({
    message: 'Sucesso',
    saldo: conta.saldo
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