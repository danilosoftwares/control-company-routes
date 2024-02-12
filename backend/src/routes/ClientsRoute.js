const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/ClientsController');

router.get('/route', clientsController.getAllClientsWithSortDistance);
router.get('/', clientsController.getAllClients);
router.get('/:id', clientsController.getClientById);
router.post('/', clientsController.createClient);
router.put('/:id', clientsController.updateClient);
router.delete('/:id', clientsController.deleteClient);

module.exports = router;
