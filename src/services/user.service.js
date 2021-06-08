import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v1/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'beers');
  }

  getUserBoard() {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }

  getModeratorBoard() {
    // return axios.get(API_URL + 'mod', { headers: authHeader() });
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }

  getAdminBoard() {
    // return axios.get(API_URL + 'admin', { headers: authHeader() });
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }
}

export default new UserService();
