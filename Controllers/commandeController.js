const commandeModel = require('../models/commandeModel');

exports.createCommande = async (req, res) => {
  try {
    const { userId, adresseLivraison, resources } = req.body;
    const prixTotal = resources.reduce((sum, r) => sum + r.prix, 0);
    const commande = new Commande({ userId, adresseLivraison, prixTotal });
    await commande.save();
    res.status(201).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await Commande.findByIdAndUpdate(id, { annulerCommande: true }, { new: true });
    if (!commande) throw new Error('Commande non trouvée');
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
