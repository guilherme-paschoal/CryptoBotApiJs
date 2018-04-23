const configuracoes = require('./configuracoes.js');
const arquivo = require('./arquivo');
const bitfinexRequest = require('./bitfinex_request');
const hitbtcRequest = require('./hitbtc_request');

let arr = [];

let nome_arquivo_bitfinex = arquivo.comporNomeArquivo("bitfinex");
let nome_arquivo_hitbtc = arquivo.comporNomeArquivo("hitbtc");

arr.push(bitfinexRequest.trades());
arr.push(hitbtcRequest.trades());

executarConsulta(0);

function executarConsulta(contador)
{
  if(contador == configuracoes.contador_finalizar)
    return;
  
  console.log('Consulta: ' + contador);

  if(contador == configuracoes.contador_parada_ordem_compra)
  {
    console.log('Realizando ordem de compra bitfinex');
    bitfinexRequest.ordem(true).then((data) => {
      console.log('Ordem de compra bitfinex realizada. ');
    }).catch((err) => {
      console.log('Erro ao realizar ordem de compra bitfinex: ');
      console.log(err.message);
    });

    console.log('Realizando ordem de compra hitbtc');
    hitbtcRequest.ordem(true).then((data) => {
      console.log('Ordem de compra hitbtc realizada. ');
    }).catch((err) => {
      console.log('Erro ao realizar ordem de compra hitbtc: ');
      console.log(err.message);
    });
  }

  if(contador == configuracoes.contador_parada_ordem_venda)
  {
    console.log('Realizando ordem de venda bitfinex');
    bitfinexRequest.ordem(false).then((data) => {
      console.log('Ordem de venda bitfinex realizada: ');
      console.log(data);
    }).catch((err) => {
      console.log('Erro ao realizar ordem de venda bitfinex: ');
      console.log(err.message);
    });

    console.log('Realizando ordem de venda hitbtc');
    hitbtcRequest.ordem(false).then((data) => {
      console.log('Ordem de venda hitbtc realizada. ');
    }).catch((err) => {
      console.log('Erro ao realizar ordem de venda hitbtc: ');
      console.log(err.message);
    });
  }

  Promise.all(arr).then((dados) => {

    console.log('Dados obtidos. Escrevendo arquivo bitfinex.');
    arquivo.escrever(nome_arquivo_bitfinex, bitfinexRequest.parseData(dados[0], contador == 0).csv);

    console.log('Dados obtidos. Escrevendo arquivo hitbtc.');
    arquivo.escrever(nome_arquivo_hitbtc,   hitbtcRequest.parseData(dados[1], contador == 0).csv);
  
    console.log('Aguardando intervalo para próxima consulta.');
    console.log('===========================================');

    setTimeout(function (){  
      executarConsulta(contador + 1); 
    }, configuracoes.tempo_intervalo_consulta);
  }).catch((err) => {
    console.log('Erro ao executar consulta: ');
    console.log(err);
  });
}
