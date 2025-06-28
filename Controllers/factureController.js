const factureModel = require("../models/factureModel");
const userModel = require("../models/userModel");
const commandeModel = require("../models/commandeModel");
const ressourceModel = require("../models/ressourceModel");

module.exports.getAllFactures = async (req, res) => {
  try {
    const factures = await factureModel.find().populate("client commande");
    if (factures.length === 0) {
      throw new Error("Factures not found");
    }
    res.status(200).json(factures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createFacture = async (req, res) => {
  try {
    const { id, montant, methodePaiement, statutPaiement, client, commande } = req.body;
    const facture = new factureModel({id, montant, methodePaiement, statutPaiement, client, commande });
    await facture.save();
    await userModel.findByIdAndUpdate(client, { $push: { factures: facture._id } });
    res.status(201).json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getFactureById = async (req, res) => {
  try {
    const { id } = req.params;
    const facture = await factureModel.findById(id)
      .populate({
        path: 'commande',
        populate: { path: 'ressources', model: 'Ressource' }
      })
      .populate('client');
    if (!facture) {
      return res.status(404).json({ message: 'Facture introuvable' });
    }
    res.json(facture);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports.deleteFactureById = async (req, res) => {
  try {
    const { id } = req.params;
    const facture = await factureModel.findByIdAndDelete(id);
    if (!facture) {
      return res.status(404).json({ message: "Facture not found" });
    }
    await userModel.updateMany({}, { $pull: { factures: facture._id } });
    res.status(200).json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateFacture = async (req, res) => {
  try {
    const { id } = req.params;
    const { montant, methodePaiement, statutPaiement, effectuerPaiement, annulerPaiement } = req.body;
    const facture = await factureModel.findByIdAndUpdate(id, {
      $set: { montant, methodePaiement, statutPaiement, effectuerPaiement, annulerPaiement }
    }, { new: true });
    if (!facture) {
      return res.status(404).json({ message: "Facture not found" });
    }
    res.status(200).json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateStatutPaiement = async (req, res) => {
  try {
    const { id } = req.params;
    const { statutPaiement } = req.body;
    const facture = await factureModel.findByIdAndUpdate(id, {
      $set: { statutPaiement }
    }, { new: true });
    if (!facture) {
      return res.status(404).json({ message: "Facture not found" });
    }
    res.status(200).json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.calculateTotal = async (req, res) => {
  try {
    const { id } = req.params;
    const facture = await factureModel.findById(id).populate({
      path: 'commande',
      populate: { path: 'ressources', model: 'Ressource' }
    });
    if (!facture || !facture.commande) {
      return res.status(404).json({ message: 'Facture ou commande introuvable' });
    }
    const total = facture.commande.ressources.reduce((sum, r) => {
      const prixUnitaire = r.prix || 0;
      const heures = r.nombreHeure || 1;
      return sum + (prixUnitaire * heures);
    }, 0);
    res.json({ total });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports.payerFacture = async (req, res) => {
  try {
    const { id } = req.params;
    const { methodePaiement } = req.body;
    const facture = await factureModel.findById(id);
    if (!facture) {
      return res.status(404).json({ message: 'Facture introuvable' });
    }
    if (facture.statutPaiement === 'payé') {
      return res.status(400).json({ message: 'Facture déjà payée' });
    }
    facture.methodePaiement = methodePaiement || facture.methodePaiement;
    facture.statutPaiement = 'payé';
    facture.effectuerPaiement = true;
    await facture.save();
    res.status(200).json(facture);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
