import axios from 'axios'
import {API_URL} from './index'
import authHeader from './auth-header'

class AccountSerice {
    getAccounts() {
        return axios.get(API_URL + 'accounts')
    }
}

export default new AccountSerice