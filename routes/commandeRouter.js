const express = require("express");
const router = express.Router();
const commandeController = require("../Controllers/commandeController");

router.get("/", commandeController.getAllCommandes);
router.post("/", commandeController.createCommande);
router.get("/:id", commandeController.getCommandeById); 
router.delete("/:id", commandeController.deleteCommandeById);
router.post("/addRessource", commandeController.addRessourceToCommande);
router.put('/:id', commandeController.updateCommande );
module.exports = router;