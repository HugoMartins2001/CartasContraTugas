const mongoose = require("mongoose");

const baralhoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    descricao: { type: String },
    cartas: {
        pretas: [{type: String}],
        brancas: [{type: String}],
    },
    ativo: { type: Boolean, default: true },
    temas: [{type: String}],
  }
);

module.exports = mongoose.model("Baralho", baralhoSchema);
