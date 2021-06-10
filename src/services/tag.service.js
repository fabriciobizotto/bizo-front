import axios from 'axios';
import { API_URL } from './index';
import authHeader from './auth-header';

const PATH_NAME = 'tags';

class TagService {
  getAll() {
    return axios.get(API_URL + PATH_NAME, { headers: authHeader() });
  }

  addItem(item) {
    console.log('addItem');
    const { title, active } = item;

    return axios.post(
      API_URL + PATH_NAME,
      { title, active },
      { headers: authHeader() }
    );
  }

  updateItem(item) {
    const { title, active, id } = item;

    return axios.patch(
      API_URL + `${PATH_NAME}/${id}`,
      { title, active },
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

export default new TagService();
