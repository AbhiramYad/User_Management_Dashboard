import axios from 'axios';
import { API_URL } from '../utils/constants';

// Configure axios instance if needed, but a simple Axios usage is fine for this mock API.
export const getUsers = () => {
  return axios.get(API_URL);
};

export const createUser = (userData) => {
  return axios.post(API_URL, userData);
};

export const updateUser = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
