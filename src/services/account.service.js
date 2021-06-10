import axios from 'axios';
import { API_URL } from './index';
import authHeader from './auth-header';

class AccountSerice {
  getAccounts() {
    return axios.get(API_URL + 'accounts', { headers: authHeader() });
  }

  addAccount(account) {
    const { title, active, investment } = account;

    return axios.post(
      API_URL + `accounts`,
      { title, active, investment },
      { headers: authHeader() }
    );
  }

  updateAccount(account) {
    const { title, active, investment, id } = account;

    return axios.patch(
      API_URL + `accounts/${id}`,
      { title, active, investment },
      { headers: authHeader() }
    );
  }

  deleteAccount(account) {
    const { id } = account;

    return axios.delete(API_URL + `accounts/${id}`, {
      headers: authHeader()
    });
  }
}

export default new AccountSerice();
