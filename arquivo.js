const fs = require('fs');
const constantes = require('./configuracoes.js');

const timestamp = require('./timestamp')
const agora = timestamp.flat();

module.exports = {

  comporNomeArquivo: function(nome) {
    return nome + "_" + agora + constantes.extensao_arquivo_gerado;
  },

  escrever: function(nomeArquivo, dados) {
    if(dados[dados.length-1] != '\n') {
      dados += '\n';
    }
    fs.appendFileSync('./csvs/' + nomeArquivo, dados);
  }

}