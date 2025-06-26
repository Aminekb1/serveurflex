const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  montant: { type: Number, required: true },
  statutPaiement: { type: String, enum: ['pending', 'payé', 'annulé'], default: 'pending' },
  effectuerPaiement: { type: Boolean, default: false },
  annulerPaiement: { type: Boolean, default: false },
});

module.exports = mongoose.model('Facture', factureSchema);