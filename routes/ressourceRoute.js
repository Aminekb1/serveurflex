var express = require('express');
var router = express.Router();
const ressourceController = require("../Controllers/ressourceController");
/* GET home page. */
router.get('/getAllRessources', carController.getAllCars );
router.get('/getRessourceById/:id', carController.getCarById );
router.post('/addRessource', carController.addCar );
router.put('/updateRessource/:id', carController.updateCar );
router.put('/affect', carController.affect );
router.put('/desaffect', carController.desaffect );
router.delete('/deleteRessourceById/:id', carController.deleteCarById );

module.exports = router;