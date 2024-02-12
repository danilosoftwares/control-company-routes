const clientModel = require('../models/ClientsModel');

const getAllClients = async (filter) => {
  return await clientModel.getAllClients(filter);
};

const getClientById = async (id) => {
  return await clientModel.getClientById(id);
};

const createClient = async (client) => {
  return await clientModel.createClient(client);
};

const updateClient = async (id, client) => {
  return await clientModel.updateClient(id, client);
};

const deleteClient = async (id) => {
  return await clientModel.deleteClient(id);
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
