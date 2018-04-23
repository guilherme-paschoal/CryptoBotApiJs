const request = require('request-promise-native');
const crypto = require('crypto');
const configuracoes = require('./configuracoes.js');
const csv = require('./csv.js');

module.exports = {

  trades: function() {
    const url = configuracoes.api_bitfinex_base_url  + configuracoes.api_bitfinex_trades_endpoint + configuracoes.api_bitfinex_trade_symbol;
    return request.get(url);
  },

  parseData: function(data, header) {
    return { csv: csv.gerarCsv(data, configuracoes.bitfinex_fields, header, configuracoes.api_bitfinex_trade_symbol)};
  },

  ordem: function(compra) {

    const nonce = Date.now().toString()
    const body = {
      request: configuracoes.api_bitfinex_order_endpoint,
      nonce,
      symbol: configuracoes.api_bitfinex_trade_symbol,
      amount: '0.1',
      price: '1',
      exchange: 'bitfinex',
      side: compra ? 'buy' : 'sell',
      type: 'exchange market'
    }

    const payload = new Buffer(JSON.stringify(body)).toString('base64')
    const signature = crypto.createHmac('sha384', configuracoes.api_bitfinex_apiSecret).update(payload).digest('hex')

    const options = {
      url: configuracoes.api_bitfinex_base_url + configuracoes.api_bitfinex_order_endpoint,
      headers: {
        'X-BFX-APIKEY': configuracoes.api_bitfinex_apiKey,
        'X-BFX-PAYLOAD': payload,
        'X-BFX-SIGNATURE': signature
      },
      body: JSON.stringify(body)
    }

    return request.post( 
      options);
  }

}
