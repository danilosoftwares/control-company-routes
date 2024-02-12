import axios from 'axios';
import { AllClientsResponse } from './response';

const BASE_URL = 'http://localhost:3003';

export const getAllClients = async (filter?:string) => {
  const response = await axios.get<AllClientsResponse[]>(`${BASE_URL}/clients${filter?`?filter=${filter}`:''}`);
  return response.data;
};

export const getAllClientsRoute = async () => {
  const response = await axios.get<AllClientsResponse[]>(`${BASE_URL}/clients/route`);
  return response.data;
};


export const getClientById = async (id: number) => {
  const response = await axios.get<AllClientsResponse>(`${BASE_URL}/clients/${id}`);
  return response.data;
};

export const createClient = async (client: any) => {
  const response = await axios.post<AllClientsResponse>(`${BASE_URL}/clients`, client);
  return response;
};

export const updateClient = async (client: any) => {
  const response = await axios.put<AllClientsResponse>(`${BASE_URL}/clients/${client.id}`, client);
  return response;
};

export const deleteClient = async (id: number) => {
  await axios.delete(`${BASE_URL}/clients/${id}`);
};
