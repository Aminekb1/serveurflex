const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  id: { type: String, require: true, unique: true },
  idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ressources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ressource' }],
  dateCommande: { type: Date, require: true },
},{ timestamps: true });

module.exports = mongoose.model('Commande', commandeSchema);