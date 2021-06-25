import CategoryService from '@/services/category.service';
import Category from '@/models/category';

import {
  BASE_SET_LOADING,
  BASE_SET_SUCCESS,
  BASE_SET_ERROR,
  BASE_RESET,
  SET_CATEGORY,
  SET_CATEGORIES_DISPONIVEIS
} from '../mutations.types';
import {
  SET_CATEGORIES,
  UPDATE_CATEGORY,
  ADD_CATEGORY,
  REMOVE_CATEGORY
} from '../mutations.types';

import {
  FETCH_CATEGORIES,
  CATEGORY_CREATE,
  CATEGORY_EDIT,
  CATEGORY_DELETE,
  CATEGORY_UPDATE,
  FETCH_CATEGORIES_DISPONIVEIS
} from '../actions.type';

const state = {
  categories: [],
  categoriesDisponiveis: [],
  category: new Category(),
  categoryOptions: []
};

const getters = {
  category: state => state.category,
  categoryList: state => state.categories,
  // categoryList: state =>
  //   state.categories.sort((a, b) => (a.title > b.title ? 1 : -1)),
  categoryListSize: state => state.categories.length,
  categoryOptions: state => {
    let padrao = [
      { value: null, text: '--- Selecione uma Categoria Superior ---' }
    ];
    return padrao.concat(
      state.categories.filter(c =>
        state.category.id == null ? c : c.id != state.category.id
      )
    );
  },
  categoriesDisponiveis: state => state.categoriesDisponiveis
};

const actions = {
  async [FETCH_CATEGORIES]({ commit }) {
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      const response = await CategoryService.getAll();
      commit(SET_CATEGORIES, response.data);
    } catch (error) {
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async [FETCH_CATEGORIES_DISPONIVEIS]({ commit }) {
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      const response = await CategoryService.getDisponiveis();
      commit(SET_CATEGORIES_DISPONIVEIS, response.data);
    } catch (error) {
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async [CATEGORY_UPDATE]({ commit }, category) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...category, active: !category.active };
      const response = await CategoryService.updateItem(category);
      commit(UPDATE_CATEGORY, response.data);
      commit(BASE_SET_SUCCESS, 'Category atualizada com sucesso!', {
        root: true
      });
    } catch (error) {
      // console.log(error);
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async [CATEGORY_CREATE]({ commit }, category) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...category, active: !category.active };
      const response = await CategoryService.addItem(category);
      commit(SET_CATEGORY, response.data);
      state.category = new Category();
      commit(BASE_SET_SUCCESS, 'Category criada com sucesso!', {
        root: true
      });
    } catch (error) {
      // console.log(error);
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async [CATEGORY_DELETE]({ commit }, category) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...category, active: !category.active };
      const response = await CategoryService.deleteItem(category);
      state.categories = state.categories.filter(
        item => item.id != category.id
      );
      commit(BASE_SET_SUCCESS, 'Category removida com sucesso!', {
        root: true
      });
    } catch (error) {
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  }
};

const mutations = {
  [SET_CATEGORIES](state, payload) {
    state.categories = payload.map(c => {
      return {
        ...c,
        value: c.id,
        text: c.title,
        category_title: c.category?.title
        // disabled: c.id == c.category_id
      };
    });
    console.log(state.categories);
  },
  [SET_CATEGORIES_DISPONIVEIS](state, payload) {
    state.categoriesDisponiveis = payload;
  },
  [SET_CATEGORY](state, payload) {
    state.categories = [
      ...state.categories,
      {
        ...payload,
        value: payload.id,
        text: payload.title,
        category_title: payload.category?.title
      }
    ];
    state.category = new Category();
  },
  [ADD_CATEGORY](state, payload) {
    state.categories.push(payload);
    state.category = new Category();
  },
  [UPDATE_CATEGORY](state, payload) {
    state.categories = [
      ...state.categories.filter(item => item.id !== payload.id),
      {
        ...payload,
        value: payload.id,
        text: payload.title,
        category_title: payload.category?.title
      }
    ];
    state.category = new Category();
  },
  [REMOVE_CATEGORY](state, payload) {
    state.categories = state.categories.filter(item => item.id != payload.id);
  },
  [CATEGORY_EDIT](state, payload) {
    state.category = payload ? payload : new Category();
    // state.categoryOptions = state.categories.filter(c => c.id != c.category_id)
  }
};
export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
