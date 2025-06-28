var express = require("express");
var router = express.Router();
const factureController = require("../Controllers/factureController");

router.get("/", factureController.getAllFactures); 
router.post("/", factureController.createFacture); 
router.get("/:id", factureController.getFactureById);
router.put("/:id", factureController.updateFacture);
router.delete("/:id", factureController.deleteFactureById);
//router.post('/:id/prixtotal', auth, factureCtrl.calculateTotal);
router.post("/:id/calculateTotal", factureController.calculateTotal);
router.post("/:id/payer", factureController.payerFacture); 

module.exports = router;