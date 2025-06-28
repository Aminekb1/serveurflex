const commandeModel = require('../models/commandeModel');
const userModel = require('../models/userModel'); 
const ressourceModel = require('../models/ressourceModel');
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await commandeModel.find().populate("client ressources");
    if (commandes.length === 0) {
      throw new Error("No commandes found");
    }
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 exports.getCommandeById =  async (req, res) => { // Ajouté
    try {
      const { id } = req.params;
      const commande = await commandeModel.findById(id).populate("client ressources");
      if (!commande) {
        return res.status(404).json({ message: "Commande not found" });
      }
      res.status(200).json(commande);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
/* exports.createCommande = async (req, res) => {
  try {
    const { userId, adresseLivraison, resources } = req.body;
   // const prixTotal = resources.reduce((sum, r) => sum + r.prix, 0);
    const commande = new commandeModel({ userId, adresseLivraison, ressources: ressources || []});
    await commande.save();
    res.status(201).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

/* exports.createCommande = async (req, res) => {
  try {
    const {id, client, dateCommande, ressources } = req.body;
    const commande = new commandeModel({ id, client, dateCommande, ressources: ressources || [] });
    await commande.save();
    await userModel.findByIdAndUpdate(client, { $push: { commandes: commande._id } });
    res.status(201).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */
exports.createCommande = async (req, res) => {
  try {
     const { client, dateCommande, ressources } = req.body; 
   
    const commande = new commandeModel({ 
      client, 
      dateCommande, 
      ressources: ressources || [] 
    });
    
    await commande.save();
    
    // Mise à jour de l'utilisateur
    await userModel.findByIdAndUpdate(client, { 
      $push: { commandes: commande._id } 
    });
    
    res.status(201).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteCommandeById = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await commandeModel.findByIdAndDelete(id);
    if (!commande) {
      return res.status(404).json({ message: "Commande not found" });
    }
    await userModel.updateMany({}, { $pull: { commandes: commande._id } });
    res.status(200).json(commande);
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
/* exports.addRessourceToCommande = async (req, res) => {
  try {
    const { commandeId, ressourceId } = req.body;
    const commande = await commandeModel.findById(commandeId);
    if (!commande) {
      return res.status(404).json({ message: "Commande not found" });
    }
    const ressource = await ressourceModel.findById(ressourceId);
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
exports.addRessourceToCommande = async (req, res) => {
  try {
    const { commandeId, ressourceId } = req.body;
    const commande = await commandeModel.findById(commandeId);
    if (!commande) return res.status(404).json({ message: 'Commande not found' });
    
    const ressource = await ressourceModel.findById(ressourceId);
    if (!ressource) return res.status(404).json({ message: 'Ressource not found' });
    
    commande.ressources.push(ressource._id);
    await commande.save();
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const { adresseLivraison, ressources } = req.body;
    const commande = await commandeModel.findByIdAndUpdate(id, { $set: { adresseLivraison, ressources } }, { new: true });
    if (!commande) {
      throw new Error("Commande not found");
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* const Commande = require("../models/commandeModel");
const Client = require("../models/clientModel");
const Ressource = require("../models/ressourceModel");
*/
/* module.exports.GetAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate("client").populate("ressources");
    if (commandes.length === 0) {
      throw new Error("No commandes found");
    }
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

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