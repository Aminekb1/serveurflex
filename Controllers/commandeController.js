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

/* const Commande = require("../models/commandeModel");
const Client = require("../models/clientModel");
const Ressource = require("../models/ressourceModel");
*/
module.exports.GetAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate("client").populate("ressources");
    if (commandes.length === 0) {
      throw new Error("No commandes found");
    }
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*module.exports.createCommande = async (req, res) => {
  try {
    const { clientId, ressources, adresseLivraison } = req.body;
    const commande = new Commande({
      client: clientId,
      ressources: ressources || [],
      adresseLivraison
    });
    await commande.save();
    await Client.findByIdAndUpdate(clientId, { $push: { commandes: commande._id } });
    res.status(201).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCommandeById = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await Commande.findById(id).populate("client").populate("ressources");
    if (!commande) {
      return res.status(404).json({ message: "Commande not found" });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteCommandeById = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await Commande.findByIdAndDelete(id);
    if (!commande) {
      return res.status(404).json({ message: "Commande not found" });
    }
    await Client.updateMany({}, { $pull: { commandes: commande._id } });
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addRessourceToCommande = async (req, res) => {
  try {
    const { commandeId, ressourceId } = req.body;
    const commande = await Commande.findById(commandeId);
    if (!commande) {
      return res.status(404).json({ message: "Commande not found" });
    }
    const ressource = await Ressource.findById(ressourceId);
    if (!ressource) {
      return res.status(404).json({ message: "Ressource not found" });
    }
    commande.ressources.push(ressource._id);
    await commande.save();
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */