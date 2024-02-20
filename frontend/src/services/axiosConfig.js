import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // La URL base de tu servidor backend
});

export default instance;
