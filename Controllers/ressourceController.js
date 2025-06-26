const Ressource = require("../models/ressourceModel");
const ressourceModel = require("../models/ressourceModel");
const panierModel = require("../models/panierModel");
const catalogueModel = require("../models/catalogueModel");

module.exports.getAllRessources = async (req, res) => {
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

module.exports.addRessource = async (req, res) => {
  try {
    const { id, nom, cpu, typeRessource, ram, stockage, nombreHeure, disponibilite, statut } = req.body;
    const ressource = new Ressource({ id, nom, cpu, typeRessource, ram, stockage, nombreHeure, disponibilite, statut });
    await ressource.save(); 
    res.status(201).json('ressource'); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateRessource = async (req,res)=>{
    try {
        const { nom, cpu, typeRessource, ram, stockage, nombreHeure, disponibilite, statut } = req.body;
    const ressourceModel = new Ressource({ nom, cpu, typeRessource, ram, stockage, nombreHeure, disponibilite, statut });
    await ressourceModel.save();     
        if(! user){
            throw new Error("User not found");            
        }

        const updated = await userModel.findByIdAndUpdate(
            id,
            {
                $set : {name,age}
            }
        )

        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
} 



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
   // await Panier.updateMany({}, { $pull: { ressourcesDisponibles: ressource._id } });
    await Catalogue.updateMany({}, { $pull: { ressourcesDisponibles: ressource._id } });
    res.status(200).json(ressource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 /*affect(req, res) {
  // Exemple : { ressourceId, commandeId }
  try {
    const { ressourceId, commandeId } = req.body;
    const r = await Ressource.findById(ressourceId);
    if (!r) retasyncurn res.status(404).json({ message: "Ressource introuvable" });
    r.commandes.push(commandeId);
    r.disponibilite = false;
    await r.save();
    res.json(r);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
},

  async desaffect(req, res) {
  const { ressourceId, commandeId } = req.body;
  try {
    const r = await Ressource.findById(ressourceId);
    if (!r) return res.status(404).json({ message: "Ressource introuvable" });
    r.commandes.pull(commandeId);
    if (r.commandes.length === 0) r.disponibilite = true;
    await r.save();
    res.json(r);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
 
}; */