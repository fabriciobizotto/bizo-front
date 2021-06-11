import AccountService from '../../services/account.service';
import Account from '../../models/account';

import {
  BASE_SET_LOADING,
  BASE_SET_SUCCESS,
  BASE_SET_ERROR,
  BASE_RESET
} from '../mutations.types';
import {
  SET_ACCOUNTS,
  UPDATE_ACCOUNT,
  ADD_ACCOUNT,
  REMOVE_ACCOUNT
} from '../mutations.types';

const state = {
  accounts: []
};

const getters = {
  accountList: state =>
    state.accounts.sort((a, b) => (a.title > b.title ? 1 : -1)),
  quantidade: state => state.accounts.length
};

const actions = {
  async accountAll({ commit }) {
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      const response = await AccountService.getAccounts();
      commit(SET_ACCOUNTS, response.data);
    } catch (error) {
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async updateAccount({ commit }, account) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...account, active: !account.active };
      const response = await AccountService.updateAccount(account);
      commit(UPDATE_ACCOUNT, response.data);
      commit(BASE_SET_SUCCESS, 'Conta atualizada com sucesso!', {
        root: true
      });
    } catch (error) {
      // console.log(error);
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async saveAccount({ commit }, account) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...account, active: !account.active };
      const response = await AccountService.addAccount(account);
      state.accounts.push(response.data);
      state.account = new Account();
      commit(BASE_SET_SUCCESS, 'Conta criada com sucesso!', {
        root: true
      });
    } catch (error) {
      // console.log(error);
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async deletarConta({ commit }, account) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...account, active: !account.active };
      const response = await AccountService.deleteAccount(account);
      state.accounts = state.accounts.filter(item => item.id != account.id);
      commit(BASE_SET_SUCCESS, 'Conta removida com sucesso!', {
        root: true
      });
    } catch (error) {
      // console.log(error);
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  }
};

const mutations = {
  [SET_ACCOUNTS](state, payload) {
    state.accounts = payload;
  },
  [ADD_ACCOUNT](state, payload) {
    state.accounts.push(payload);
  },
  [UPDATE_ACCOUNT](state, payload) {
    state.accounts = [
      ...state.accounts.filter(item => item.id !== payload.id),
      payload
    ];
  },
  [REMOVE_ACCOUNT](state, payload) {
    state.accounts = state.accounts.filter(item => item.id != payload.id);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
