import axios from 'axios';
import { API_URL } from './index';
import authHeader from './auth-header';

const PATH_NAME = 'categories';

class CategoryService {
  getAll() {
    return axios.get(API_URL + PATH_NAME, { headers: authHeader() });
  }

  getDisponiveis() {
    return axios.get(API_URL + PATH_NAME + '/disponiveis', {
      headers: authHeader()
    });
  }

  addItem(item) {
    const { title, active, category_id } = item;

    return axios.post(
      API_URL + PATH_NAME,
      { title, active, category_id },
      { headers: authHeader() }
    );
  }

  updateItem(item) {
    const { title, active, category_id, id } = item;

    return axios.patch(
      API_URL + `${PATH_NAME}/${id}`,
      { title, active, category_id },
      { headers: authHeader() }
    );
  }

  deleteItem(item) {
    const { id } = item;

    return axios.delete(API_URL + `${PATH_NAME}/${id}`, {
      headers: authHeader()
    });
  }
}

export default new CategoryService();
