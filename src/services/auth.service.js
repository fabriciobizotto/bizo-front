import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v1/';

class AuthService {
  login(user) {
    return axios
      .post(
        API_URL + 'users/sign_in/',
        {
          user: {
            email: user.email,
            password: user.password
          }
        },
        { headers: authHeader() }
      )
      .then(response => {
        let headers = response.headers;
        let user = response.data.data;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem(
            'access-token',
            JSON.stringify(headers['access-token'])
          );
          localStorage.setItem('client', JSON.stringify(headers['client']));
          localStorage.setItem('uid', JSON.stringify(user.uid));
        }

        return user;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
  }

  register(user) {
    return axios.post(API_URL + 'users', {
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password
      }
    });
  }

  async verificarToken() {
    let user = JSON.parse(localStorage.getItem('user'));
    let accessToken = JSON.parse(localStorage.getItem('access-token'));
    let client = JSON.parse(localStorage.getItem('client'));
    let uid = JSON.parse(localStorage.getItem('uid'));

    if (user) {
      return await axios.get(API_URL + 'users/validate_token', {
        headers: authHeader()
      });
    }
  }
}

export default new AuthService();
