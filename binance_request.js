const request = require('request-promise-native');
const crypto = require('crypto');
const configuracoes = require('./configuracoes.js');
const api = require('binance');

const binanceRest = new api.BinanceRest({
  key: configuracoes.api_binance_apiKey, // Get this from your account on binance.com
  secret: configuracoes.api_binance_apiSecret, // Same for this
  timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
  recvWindow: 5000, // Optional, defaults to 5000, increase if you're getting timestamp errors
  disableBeautification: false,
  /*
   * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
   * default those keys will be replaced with more descriptive, longer ones.
   */
  handleDrift: false
  /* Optional, default is false.  If turned on, the library will attempt to handle any drift of
   * your clock on it's own.  If a request fails due to drift, it'll attempt a fix by requesting
   * binance's server time, calculating the difference with your own clock, and then reattempting
   * the request.
   */
});


module.exports = {

  getTrades: function() {
    return binanceRest.trades({
      symbol: configuracoes.api_binance_trade_symbol
    });
  },

  get: function() {
    return request.get(
      configuracoes.api_binance_base_url + configuracoes.api_binance_trades_endpoint + configuracoes.api_binance_trade_symbol);
  },

  post: function() {

    const signature = crypto
    .createHmac('sha384', apiSecret)
    .update(payload)
    .digest('hex')
    
    var url = configuracoes.api_binance_url + configuracoes.api_binance_order_endpoint;

    var querystring = "?symbol=LTCBTC&timestamp=1499827319559";

    return request.get({
      url: url + querystring,

    },
      function(error, response, body) {
        console.log('response:', JSON.stringify(body, 0, 2))
      });

  }
}