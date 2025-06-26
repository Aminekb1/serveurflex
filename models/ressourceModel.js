const mongoose = require('mongoose');

const ressourceSchema = new mongoose.Schema({
 id: { type: String, required: true, unique: true },
//id: { type: String, required: true },
  
  nom: { type: String, required: true },
  cpu: { type: String, required: true },
  //type: { type: String, required: true },
  ram: { type: String, required: true },
  stockage: { type: String, required: true },
  nombreHeure: { type: Number, required: true },
  disponibilite: { type: Boolean, required: true },
  statut: { type: String, enum: ['En cours', 'Prêt', 'Arrêté'], required: true },
  typeRessource: { type: String,enum: ['server', 'vm'], require: true }, // Discriminator key
  commandes: [{type: mongoose.Schema.Types.ObjectId, ref:"Commande" }] // Many 
});

module.exports = mongoose.model('Ressource', ressourceSchema);