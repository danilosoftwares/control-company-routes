const Connector = require('../bases/connector');

const getAllClients = async (filter) => {
  const filterNormalized = filter ? filter.replace(/'/g, "''") : '';
  
  const sql = `
    SELECT *
    FROM clients
    ${filterNormalized !== "" ? `
    WHERE (
      name LIKE $1
      OR document LIKE $1
      OR email LIKE $1
      OR phone LIKE $1
    )` : ''}
    ORDER BY ID
  `;
  
  const params = filterNormalized !== "" ? ['%'+filterNormalized+'%'] : [];  
  const results = await Connector.query(sql, params);
  return results.rows;
};

const getClientById = async (id) => {
  const results = await Connector.query('SELECT * FROM clients WHERE id = $1', [id]);
  if (!results.rows.length) {
    throw new Error('Cliente não encontrado!');
  }
  return results.rows[0];
};

const createClient = async (client) => {
  const { name, document, positionx, positiony, email, phone } = client;

  const errors = [];

  if (!name) {
    errors.push('Nome é obrigatório.');
  }

  if (!document) {
    errors.push('Documento é obrigatório.');
  }

  if (!positionx) {
    errors.push('Posição X é obrigatória.');
  }

  if (!positiony) {
    errors.push('Posição Y é obrigatória.');
  }

  if (!email) {
    errors.push('E-mail é obrigatório.');
  }

  if (!phone) {
    errors.push('Telefone é obrigatório.');
  }

  if (errors.length) {
    throw new Error(errors.join('\n'));
  }

  const results = await Connector.query(
    'INSERT INTO clients (name, document, positionx, positiony, email, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, document, positionx, positiony, email, phone]
  );
  return results.rows[0];
};

const updateClient = async (id, client) => {
  const { name, document, positionx, positiony, email, phone } = client;

  const errors = [];

  if (!name) {
    errors.push('Nome é obrigatório.');
  }

  if (!document) {
    errors.push('Documento é obrigatório.');
  }

  if (!positionx) {
    errors.push('Posição X é obrigatória.');
  }

  if (!positiony) {
    errors.push('Posição Y é obrigatória.');
  }

  if (!email) {
    errors.push('E-mail é obrigatório.');
  }

  if (!phone) {
    errors.push('Telefone é obrigatório.');
  }

  if (errors.length) {
    throw new Error(errors.join('\n'));
  }

  const results = await Connector.query(
    'UPDATE clients SET name = $1, document = $2, positionx = $3, positiony = $4, email = $5, phone = $6 WHERE id = $7 RETURNING *',
    [name, document, positionx, positiony, email, phone, id]
  );
  if (!results.rows.length) {
    throw new Error('Cliente não encontrado!');
  }
  return results.rows[0];
};

const deleteClient = async (id) => {
  await Connector.query('DELETE FROM clients WHERE id = $1', [id]);
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
