import AccountService from '../../services/account.service';
import Account from '../../models/account';

const state = {
  loading: false,
  account: new Account(),
  accounts: [],
  message: {
    showDismissibleAlert: false,
    error: false,
    text: null
  }
};

const getters = {
  message: state => state.message,
  isLoading: state => state.loading,
  accountList: state => {
    console.log(state);
    return state.accounts;
  },
  account: state => state.account
};

const actions = {
  async accountAll({ commit }) {
    commit('setLoading');

    try {
      const response = await AccountService.getAccounts();
      commit('setAccounts', response.data);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading');
    }
  },

  editAccount({ commit }, account) {
    commit('setAccount', account);
  },

  async updateAccount({ commit }, account) {
    commit('reset');
    commit('setLoading');

    try {
      // const data = { ...account, active: !account.active };
      const response = await AccountService.updateAccount(account);
      // console.log(response);
      commit('setAccount', new Account());
      commit('setSuccess', 'Conta atualizada com sucesso!');
    } catch (error) {
      // console.log(error);
      commit('setError', error);
    } finally {
      commit('setLoading');
    }
  },

  async saveAccount({ commit }, account) {
    commit('reset');
    commit('setLoading');

    try {
      // const data = { ...account, active: !account.active };
      const response = await AccountService.addAccount(account);
      commit('addAccount', response.data);
      commit('setAccount', new Account());
      commit('setSuccess', 'Conta criada com sucesso!');
    } catch (error) {
      // console.log(error);
      commit('setError', error);
    } finally {
      commit('setLoading');
    }
  },

  async deletarConta({ commit }, account) {
    commit('reset');
    commit('setLoading');

    try {
      // const data = { ...account, active: !account.active };
      const response = await AccountService.deleteAccount(account);
      commit('removeAccount', account);
      commit('setSuccess', 'Conta removida com sucesso!');
    } catch (error) {
      // console.log(error);
      commit('setError', error);
    } finally {
      commit('setLoading');
    }
  }
};

const mutations = {
  reset: state => {
    state.message.error = null;
    state.message.showDismissibleAlert = false;
    state.message.text = null;
  },
  setLoading: state => {
    state.loading = !state.loading;
  },
  setAccount: (state, account) => {
    state.account = account;
  },
  addAccount: (state, payload) => {
    state.accounts.push(payload);
  },
  removeAccount: (state, payload) => {
    state.accounts = state.accounts.filter(item => item.id != payload.id);
  },
  setAccounts: (state, payload) => {
    state.accounts = payload;
    state.message.error = false;
  },
  setError(state, payload) {
    state.message.error = true;
    state.message.showDismissibleAlert = true;
    state.message.text = payload;
  },
  setSuccess(state, payload) {
    state.message.error = false;
    state.message.showDismissibleAlert = true;
    state.message.text = payload;
  }
};
export default {
  //   namespaced: true,
  state,
  getters,
  actions,
  mutations
};

// export const account = {
//     namespaced: true,
//     state: initialState,
//     actions: {

//     },
//     getters: {},
//     mutations: {

//     },
// }
