const clientsService = require('../services/ClientsService');
const distanceService = require('../services/DistanceService');

const getAllClients = async (req, res) => {
  try {
    const { filter } = req.query;
    const clients = await clientsService.getAllClients(filter);
    res.json(clients);
  } catch (error) {
    res.status(400).json({ error: error.message.split('\n') });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await clientsService.getClientById(id);
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: error.message.split('\n') });
  }
};

const createClient = async (req, res) => {
  try {
    const client = req.body;
    const newClient = await clientsService.createClient(client);
    res.json(newClient);
  } catch (error) {
    res.status(400).json({ error: error.message.split('\n') });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = req.body;
    const updatedClient = await clientsService.updateClient(id, client);
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ error: error.message.split('\n') });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await clientsService.deleteClient(id);
    res.json({ message: 'Client deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message.split('\n') });
  }
};

const getAllClientsWithSortDistance = async (req, res) => {
  try {
    const clients = await distanceService.getAllBetterRoutes();
    res.json(clients);
  } catch (error) {
    res.status(400).json({ error: error.message.split('\n') });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getAllClientsWithSortDistance,
};
