import axios from 'axios';
import { API_URL } from './index';
import authHeader from './auth-header';

class AccountSerice {
  getAccounts() {
    return axios.get(API_URL + 'accounts', { headers: authHeader() });
  }

  addAccount(account) {}

  updateAccount(account) {
    const { title, active, investment, id } = account;

    return axios.patch(
      API_URL + `accounts/${id}`,
      { title, active, investment },
      { headers: authHeader() }
    );
  }
}

export default new AccountSerice();
