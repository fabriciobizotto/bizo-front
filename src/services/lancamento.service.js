import axios from 'axios';
import { API_URL } from './index';
import authHeader from './auth-header';

const PATH_NAME = 'lancamentos';

class TagService {
  getAll(params) {
    return axios.get(API_URL + PATH_NAME, {
      params,
      headers: authHeader()
    });
  }

  addItem(item) {
    // const { title, active } = item;

    return axios.post(API_URL + PATH_NAME, item, { headers: authHeader() });
  }

  updateItem(item) {
    const { id, created_at, updated_at, ...rest } = item;

    return axios.patch(API_URL + `${PATH_NAME}/${item.id}`, rest, {
      headers: authHeader()
    });
  }

  deleteItem(item) {
    const { id } = item;

    return axios.delete(API_URL + `${PATH_NAME}/${id}`, {
      headers: authHeader()
    });
  }
}

export default new TagService();
