var express = require('express');
var router = express.Router();
const ressourceController = require("../Controllers/ressourceController");
/* GET home page. */

router.get('/getAllRessources', ressourceController.getAllRessources );
router.get('/getRessourceById/:id', ressourceController.getRessourceById );
router.post('/addRessource', ressourceController.addRessource );
router.put('/updateRessource/:id', ressourceController.updateRessource );
//router.put('/affect', ressourceController.affect );
//router.put('/desaffect', ressourceController.desaffect );
router.delete('/deleteRessourceById/:id', ressourceController.deleteRessourceById );

module.exports = router;
