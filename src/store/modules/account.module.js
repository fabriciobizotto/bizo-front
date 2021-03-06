import AccountService from '@/services/account.service';
import Account from '@/models/account';

import {
  BASE_SET_LOADING,
  BASE_SET_SUCCESS,
  BASE_SET_ERROR,
  BASE_RESET
} from '../mutations.types';
import {
  SET_ACCOUNTS,
  SET_ACCOUNTS_ACTIVE,
  UPDATE_ACCOUNT,
  ADD_ACCOUNT,
  REMOVE_ACCOUNT
} from '../mutations.types';

import {
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_ACTIVE,
  ACCOUNT_CREATE,
  ACCOUNT_EDIT,
  ACCOUNT_DELETE,
  ACCOUNT_UPDATE
} from '../actions.type';

const state = {
  accounts: [],
  accountsActive: [],
  account: new Account()
};

const getters = {
  account: state => state.account,
  accountList: state =>
    state.accounts.sort((a, b) => (a.title > b.title ? 1 : -1)),
  accountListSize: state => state.accounts.length,
  // accountsActive: state => state.accountsActive
  accountsActive: state => text => {
    if (text) {
      return state.accountsActive.filter(item =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      return state.accountsActive;
    }
  }
};

const actions = {
  async [FETCH_ACCOUNTS]({ commit }) {
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

  async [FETCH_ACCOUNTS_ACTIVE]({ commit }) {
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      const response = await AccountService.getAccounts();
      commit(
        SET_ACCOUNTS_ACTIVE,
        response.data.filter(item => item.active == true)
      );
    } catch (error) {
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async [ACCOUNT_UPDATE]({ commit }, account) {
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

  async [ACCOUNT_CREATE]({ commit }, account) {
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

  async [ACCOUNT_DELETE]({ commit }, account) {
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
  [SET_ACCOUNTS_ACTIVE](state, payload) {
    state.accountsActive = payload;
  },
  [ADD_ACCOUNT](state, payload) {
    state.accounts.push(payload);
    state.account = new Account();
  },
  [UPDATE_ACCOUNT](state, payload) {
    state.accounts = [
      ...state.accounts.filter(item => item.id !== payload.id),
      payload
    ];
    state.account = new Account();
  },
  [REMOVE_ACCOUNT](state, payload) {
    state.accounts = state.accounts.filter(item => item.id != payload.id);
  },
  [ACCOUNT_EDIT](state, payload) {
    state.account = payload ? payload : new Account();
  }
};
export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
