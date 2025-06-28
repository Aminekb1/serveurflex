const commandeModel = require("../models/commandeModel");
const factureModel = require("../models/factureModel");
const notificationModel = require("../models/notificationModel");
const ressourceModel = require("../models/ressourceModel");

module.exports = {
  getCommandeStats: async (req, res) => {
    try {
      const stats = await commandeModel.aggregate([
        { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $group: { _id: null, total: { $sum: "$count" }, avgMontant: { $avg: "$montant" }, commandesParMois: { $push: { mois: "$_id", count: "$count" } } } }
      ]);
      res.status(200).json({
        totalCommandes: stats[0]?.total || 0,
        montantMoyen: stats[0]?.avgMontant || 0,
        commandesParMois: Object.fromEntries(stats[0]?.commandesParMois || [])
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getFactureStats: async (req, res) => {
    try {
      const stats = await factureModel.aggregate([
        { $group: { _id: "$statutPaiement", count: { $sum: 1 }, total: { $sum: "$montant" } } },
        { $group: { _id: null, totalFactures: { $sum: "$count" }, totalPaye: { $sum: "$total" }, parStatut: { $push: { statut: "$_id", count: "$count" } } } }
      ]);
      const totalPaye = stats[0]?.totalPaye || 0;
      const totalFactures = stats[0]?.totalFactures || 0;
      const tauxPaiement = totalFactures > 0 ? (totalPaye / totalFactures) * 100 : 0;
      res.status(200).json({
        totalFactures,
        totalPaye,
        tauxPaiement,
        parStatut: Object.fromEntries(stats[0]?.parStatut.map(s => [s.statut, s.count]) || [])
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getNotificationStats: async (req, res) => {
    try {
      const stats = await notificationModel.aggregate([
        { $group: { _id: "$type", count: { $sum: 1 }, luCount: { $sum: { $cond: ["$lu", 1, 0] } } } },
        { $group: { _id: null, totalNotifications: { $sum: "$count" }, tauxLu: { $avg: "$luCount" }, parType: { $push: { type: "$_id", count: "$count" } } } }
      ]);
      res.status(200).json({
        totalNotifications: stats[0]?.totalNotifications || 0,
        tauxLu: stats[0]?.tauxLu || 0,
        parType: Object.fromEntries(stats[0]?.parType.map(t => [t.type, t.count]) || [])
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getRessourceStats: async (req, res) => {
    try {
      const stats = await ressourceModel.aggregate([
        { $group: { _id: "$typeRessource", count: { $sum: 1 }, disponible: { $sum: { $cond: ["$disponibilite", 1, 0] } } } },
        { $group: { _id: null, totalRessources: { $sum: "$count" }, tauxDisponibilite: { $avg: "$disponible" }, parType: { $push: { type: "$_id", count: "$count" } } } }
      ]);
      res.status(200).json({
        totalRessources: stats[0]?.totalRessources || 0,
        tauxDisponibilite: stats[0]?.tauxDisponibilite || 0,
        parType: Object.fromEntries(stats[0]?.parType.map(t => [t.type, t.count]) || [])
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};