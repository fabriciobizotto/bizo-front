import TagService from '../../services/tag.service';
import Tag from '../../models/tag';

import {
  BASE_SET_LOADING,
  BASE_SET_SUCCESS,
  BASE_SET_ERROR,
  BASE_RESET
} from '../mutations.types';
import { SET_TAGS, UPDATE_TAG, ADD_TAG, REMOVE_TAG } from '../mutations.types';

import { FETCH_TAGS } from '../actions.type';

const state = {
  items: []
};

const getters = {
  itemList: state => state.items.sort((a, b) => (a.title > b.title ? 1 : -1)),
  quantidade: state => state.items.length
};

const actions = {
  async [FETCH_TAGS]({ commit }) {
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      const response = await TagService.getAll();
      commit(SET_TAGS, response.data);
    } catch (error) {
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async updateItem({ commit }, item) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...item, active: !item.active };
      const response = await TagService.updateItem(item);
      // console.log(response);
      commit(UPDATE_TAG, response.data);
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

  async saveItem({ commit }, item) {
    try {
      commit(BASE_RESET, null, { root: true });
      commit(BASE_SET_LOADING, null, { root: true });
      // const data = { ...item, active: !item.active };
      const response = await TagService.addItem(item);
      commit(ADD_TAG, response.data);
      commit(BASE_SET_SUCCESS, 'Conta criada com sucesso!', {
        root: true
      });
    } catch (error) {
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async deletarItem({ commit }, item) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...item, active: !item.active };
      const response = await TagService.deleteItem(item);
      commit(REMOVE_TAG, item);
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
  [SET_TAGS](state, payload) {
    state.items = payload;
  },
  [ADD_TAG](state, payload) {
    state.items.push(payload);
  },
  [UPDATE_TAG](state, payload) {
    state.items = [
      ...state.items.filter(item => item.id !== payload.id),
      payload
    ];
  },
  [REMOVE_TAG](state, payload) {
    state.items = state.items.filter(item => item.id != payload.id);
  }
};
export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
