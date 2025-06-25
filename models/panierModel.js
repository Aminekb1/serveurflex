const mongoose = require('mongoose');

const panierSchema = new mongoose.Schema({
  id: { type: String, require: true, unique: true },
  prixTotal: { type: Number, require: true },
  ressourcesDisponibles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ressource' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
});

module.exports = mongoose.model('Panier', panierSchema);