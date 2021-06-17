import TagService from '@/services/tag.service';
import Tag from '@/models/tag';

import {
  BASE_SET_LOADING,
  BASE_SET_SUCCESS,
  BASE_SET_ERROR,
  BASE_RESET,
  SET_TAGS_ACTIVE
} from '../mutations.types';
import { SET_TAGS, UPDATE_TAG, ADD_TAG, REMOVE_TAG } from '../mutations.types';

import {
  FETCH_TAGS,
  FETCH_TAGS_ACTIVE,
  TAG_CREATE,
  TAG_EDIT,
  TAG_DELETE,
  TAG_UPDATE
} from '../actions.type';

const state = {
  tags: [],
  tagsActive: [],
  tag: new Tag()
};

const getters = {
  tag: state => state.tag,
  tagList: state => state.tags.sort((a, b) => (a.title > b.title ? 1 : -1)),
  tagListSize: state => state.tags.length,
  tagsActive: state => state.tagsActive.filter(item => item.active == true)
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

  async [FETCH_TAGS_ACTIVE]({ commit }) {
    try {
      const response = await TagService.getAll();
      commit(SET_TAGS_ACTIVE, response.data);
    } catch (error) {
      commit(BASE_SET_ERROR, error, { root: true });
    }
  },

  async [TAG_UPDATE]({ commit }, tag) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...tag, active: !tag.active };
      const response = await TagService.updateItem(tag);
      commit(UPDATE_TAG, response.data);
      commit(BASE_SET_SUCCESS, 'Tag atualizada com sucesso!', {
        root: true
      });
    } catch (error) {
      // console.log(error);
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async [TAG_CREATE]({ commit }, tag) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...tag, active: !tag.active };
      const response = await TagService.addItem(tag);
      state.tags.push(response.data);
      state.tag = new Tag();
      commit(BASE_SET_SUCCESS, 'Tag criada com sucesso!', {
        root: true
      });
    } catch (error) {
      // console.log(error);
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async [TAG_DELETE]({ commit }, tag) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...tag, active: !tag.active };
      const response = await TagService.deleteItem(tag);
      state.tags = state.tags.filter(item => item.id != tag.id);
      commit(BASE_SET_SUCCESS, 'Tag removida com sucesso!', {
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
    state.tags = payload;
  },
  [SET_TAGS_ACTIVE](state, payload) {
    state.tagsActive = payload;
  },
  [ADD_TAG](state, payload) {
    state.tags.push(payload);
    state.tag = new Tag();
  },
  [UPDATE_TAG](state, payload) {
    state.tags = [
      ...state.tags.filter(item => item.id !== payload.id),
      payload
    ];
    state.tag = new Tag();
  },
  [REMOVE_TAG](state, payload) {
    state.tags = state.tags.filter(item => item.id != payload.id);
  },
  [TAG_EDIT](state, payload) {
    state.tag = payload ? payload : new Tag();
  }
};
export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
