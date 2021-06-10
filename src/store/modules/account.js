import AccountService from '../../services/account.service';

const state = {
  loading: false,
  account: null,
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
  }
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

  async updateAccount({ commit }, account) {
    commit('reset');
    commit('setLoading');

    try {
      // const data = { ...account, active: !account.active };
      const response = await AccountService.updateAccount(account);
      // console.log(response);
      commit('setSuccess', 'Conta atualizada com sucesso!');
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
  setAccounts: (state, payload) => {
    state.accounts = payload;
    state.message.error = false;
  },
  setError(state, payload) {
    state.accounts = [];
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
