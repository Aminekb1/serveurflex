const Ressource = require("../models/ressourceModel");
const Panier = require("../models/panierModel");
const Catalogue = require("../models/catalogueModel");

module.exports.GetAllRessources = async (req, res) => {
  try {
    const ressources = await Ressource.find();
    if (ressources.length == 0) {
      throw new Error("ressources not found");
    }
    res.status(200).json(ressources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createRessource = async (req, res) => {
  try {
    const { cpu, typeRessource, ram, stockage, nombreHeure, disponibilite, statut } = req.body;
    const ressource = new Ressource({ cpu, typeRessource, ram, stockage, nombreHeure, disponibilite, statut });
    await ressource.save();
    res.status(201).json(ressource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getRessourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const ressource = await Ressource.findById(id);
    if (!ressource) {
      return res.status(404).json({ message: "Ressource introuvable" });
    }
    res.status(200).json(ressource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteRessourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const ressource = await Ressource.findByIdAndDelete(id);
    if (!ressource) {
      return res.status(404).json({ message: "Ressource introuvable" });
    }
    await Panier.updateMany({}, { $pull: { ressourcesDisponibles: ressource._id } });
    await Catalogue.updateMany({}, { $pull: { ressourcesDisponibles: ressource._id } });
    res.status(200).json(ressource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};