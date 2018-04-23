const request = require('request-promise-native');
const configuracoes = require('./configuracoes.js');
const csv = require('./csv.js');

module.exports = {

  trades: function() {
      const url = configuracoes.api_hitbtc_base_url + configuracoes.api_hitbtc_trades_endpoint + configuracoes.api_hitbtc_trade_symbol;
      return request.get(url);
  },

  parseData: function(data, header) {
    return { csv: csv.gerarCsv(data, configuracoes.hitbtc_fields, header, configuracoes.api_hitbtc_trade_symbol)};
  },

  ordem: function(compra) {

    const side = compra ? 'buy' : 'sell';

    let url = configuracoes.api_hitbtc_base_url + configuracoes.api_hitbtc_order_endpoint; 

    let options = {
      uri: url,
      body: {
        symbol:configuracoes.api_hitbtc_trade_symbol,
        side:side,
        quantity:'0.1',
        price:'1',
        type:'market'
      },
      auth: 
      {
        user : configuracoes.api_hitbtc_publicKey,
        pass : configuracoes.api_hitbtc_secretKey,
        sendImmediately: true
      },
      json: true  
    };

    return request.post(
      url,
      options);
  }
}