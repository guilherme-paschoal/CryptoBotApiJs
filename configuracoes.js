//const binance_fields = ["price", "qty", "time", "isBuyerMaker", "isBestMatch", "pair" ];

module.exports = {
  hitbtc_fields: ["price", "quantity", "side", "timestamp", "pair" ], //o campo "pair" é adicionado manualmente depois (voce nao vai encontra-lo na documentacao da api)
  bitfinex_fields: ["timestamp", "tid", "price", "amount", "exchange", "type", "pair" ],

  extensao_arquivo_gerado: ".csv", 

  api_bitfinex_trade_symbol: "btcusd",
  api_bitfinex_base_url: "https://api.bitfinex.com",
  api_bitfinex_trades_endpoint: "/v1/trades/",
  api_bitfinex_order_endpoint: "/v1/order/new",
  api_bitfinex_apiKey: "0sP4oP3JLUazaZB3bn9XsXQGPu5USnpaw3T6mjdJQTD",
  api_bitfinex_apiSecret: "1ccK5UjTdBbL0S7XjxLJUzHxo1G0IfwU1ea5tFj3Bxd",
  
  api_hitbtc_trade_symbol: "btcusd",
  api_hitbtc_base_url: "https://api.hitbtc.com/api/2/",
  api_hitbtc_trades_endpoint: "public/trades/",
  api_hitbtc_order_endpoint: "order",
  api_hitbtc_publicKey: "a700f6ecff1fa0b76d344d621925d34f",
  api_hitbtc_secretKey: "a526fcfc7ed0caf76fa8cff201f10518",

  // api_binance_trade_symbol: "LTCBTC", // A BINANCE EXIGE QUE O SYMBOL SEJA TODO EM LETRAS MAIUSCULAS
  // api_binance_base_url : "https://api.binance.com/api/",
  // api_binance_trades_endpoint: "v1/trades/",
  // api_binance_order_endpoint: "v3/allorders",
  // api_binance_apiKey: "LOLl9t3ZV1ELsPOkGEihW54S391BjudKcqKmeSuPWO0TL8bylgqAz1r9WZX83XTg",
  // api_binance_apiSecret: "bT0x2vXSs5VQS79cIB11It3jFrz5sFHGGySd87ae4A2AMGQPwcfaj9Ss41NRNQaY",

  tempo_intervalo_consulta : 10000, // em milisegundos
  // Para calcular as quantidades abaixo:
  // Tempo em segundos do intervalo: 10 segundos (10.000 milisegundos) 
  // Quanto tempo ate a parada a partir do inicio da execucao: 5 minutos
  // 5 (minutos) * 60 (segundos) = 300 (chamadas) / 10 (segundos) = 30 
  contador_parada_ordem_compra : 30, // quantas chamadas ate a primeira parada <- 5 minutos
  contador_parada_ordem_venda : 60, // quantas chamadas ate a segunda parada  <- 10 minutos
  contador_finalizar : 72 // quantas chamadas ate acabar a execução <- 12 minutos
}