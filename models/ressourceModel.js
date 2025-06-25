const mongoose = require('mongoose');

const ressourceSchema = new mongoose.Schema({
  id: { type: String, require: true, unique: true },
  cpu: { type: String, require: true },
  type: { type: String, require: true },
  ram: { type: String, require: true },
  stockage: { type: String, require: true },
  nombreHeure: { type: Number, require: true },
  disponibilite: { type: Boolean, require: true },
  statut: { type: String, enum: ['En cours', 'Prêt', 'Arrêté'], require: true },
  typeRessource: { type: String,enum: ['server', 'vm'], require: true }, // Discriminator key
  commandes: [{type: mongoose.Schema.Types.ObjectId, ref:"Commande" }] // Many 
});

module.exports = mongoose.model('Ressource', ressourceSchema);