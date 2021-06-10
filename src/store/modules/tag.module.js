import TagService from '../../services/tag.service';
import Tag from '../../models/tag';

const state = {
  items: [],
  loading: false,
  message: {
    showDismissibleAlert: false,
    error: false,
    text: null
  }
};

const getters = {
  message: state => state.message,
  isLoading: state => state.loading,
  itemList: state => state.items.sort((a, b) => (a.title > b.title ? 1 : -1)),
  quantidade: state => state.items.length
};

const actions = {
  async itemAll({ commit }) {
    commit('setLoading');

    try {
      const response = await TagService.getAll();
      commit('setitems', response.data);
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setLoading');
    }
  },

  async updateItem({ commit }, item) {
    commit('reset');
    commit('setLoading');

    try {
      // const data = { ...item, active: !item.active };
      const response = await TagService.updateItem(item);
      // console.log(response);
      commit('updateitem', response.data);
      commit('setSuccess', 'Conta atualizada com sucesso!');
    } catch (error) {
      // console.log(error);
      commit('setError', error);
    } finally {
      commit('setLoading');
    }
  },

  async saveItem({ commit }, item) {
    try {
      commit('reset');
      commit('setLoading');
      // const data = { ...item, active: !item.active };
      const response = await TagService.addItem(item);
      commit('additem', response.data);
      commit('setitem', new Tag());
      commit('setSuccess', 'Conta criada com sucesso!');
    } catch (error) {
      console.log(error);
      commit('setError', error);
    } finally {
      commit('setLoading');
    }
  },

  async deletarItem({ commit }, item) {
    commit('reset');
    commit('setLoading');

    try {
      // const data = { ...item, active: !item.active };
      const response = await TagService.deleteItem(item);
      commit('removeitem', item);
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
  setitem: (state, item) => {
    state.item = item;
  },
  additem: (state, payload) => {
    state.items.push(payload);
  },
  removeitem: (state, payload) => {
    state.items = state.items.filter(item => item.id != payload.id);
  },
  updateitem: (state, payload) => {
    state.items = [
      ...state.items.filter(item => item.id !== payload.id),
      payload
    ];
  },
  setitems: (state, payload) => {
    state.items = payload;
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
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

// export const item = {
//     namespaced: true,
//     state: initialState,
//     actions: {

//     },
//     getters: {},
//     mutations: {

//     },
// }
