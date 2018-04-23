const json2csv = require('json2csv').parse;
const json2csv_opts = { header: false, quote: '', doubleQuote: '' };

module.exports = {

  gerarCsv: function(data, fields, header, trade_symbol) {
    json2csv_opts.header = header;
    
    const opts = Object.assign({ fields: fields }, json2csv_opts); // Object.assign é a maneira "antiga" de fazer Spread (...{}) mas acho que essa versão do node/ecma nao aceita spread em object literals
  
    return json2csv(parseJson(data, trade_symbol), opts);
  }
}

function parseJson(data, trade_symbol)
{
  if(typeof data === 'string') {
    let jsonData = JSON.parse(data);
    adicionarParDeMoedas(jsonData, trade_symbol);
    return jsonData;
  }
  return data;
}

function adicionarParDeMoedas(data, trade_symbol)
{
  data.forEach(element => {
    element.pair = trade_symbol;
  });
}