const express = require("express");
const router = express.Router();
const commandeController = require("../Controllers/commandeController");

router.get("/", commandeController.GetAllCommandes);
router.post("/", commandeController.createCommande);
//router.get("/:id", commandeController.getCommandeById);
//router.delete("/:id", commandeController.deleteCommandeById);
router.post("/addRessource", commandeController.addRessourceToCommande);

module.exports = router;