const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
 // id: { type: String, required: true, unique: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ressources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ressource' }],
  //facture : {type : mongoose.Schema.Types.ObjectId, ref: 'Facture',}, //one
  dateCommande: { type: Date, required: true },
},{ timestamps: true });


module.exports = mongoose.model('Commande', commandeSchema);