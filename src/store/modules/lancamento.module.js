import LancamentoService from '@/services/lancamento.service';
import Lancamento from '@/models/lancamento';

import {
  BASE_SET_LOADING,
  BASE_SET_SUCCESS,
  BASE_SET_ERROR,
  BASE_RESET
} from '../mutations.types';
import {
  SET_LANCAMENTOS,
  UPDATE_LANCAMENTO,
  ADD_LANCAMENTO,
  REMOVE_LANCAMENTO
} from '../mutations.types';

import {
  FETCH_LANCAMENTOS,
  LANCAMENTO_CREATE,
  LANCAMENTO_EDIT,
  LANCAMENTO_DELETE,
  LANCAMENTO_UPDATE,
  LANCAMENTO_UPDATE_PAGAR
} from '../actions.type';

const state = {
  lancamentos: [],
  lancamento: new Lancamento()
};

const getters = {
  lancamento: state => state.lancamento,
  lancamentoList: state =>
    state.lancamentos.sort((a, b) => (a.title > b.title ? 1 : -1)),
  lancamentoListSize: state => state.lancamentos.length
};

const actions = {
  async [FETCH_LANCAMENTOS]({ commit }) {
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      const response = await LancamentoService.getAll();
      commit(SET_LANCAMENTOS, response.data);
    } catch (error) {
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async [LANCAMENTO_UPDATE]({ commit }, lancamento) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...lancamento, active: !lancamento.active };
      const response = await LancamentoService.updateItem(lancamento);
      commit(UPDATE_LANCAMENTO, response.data);
      commit(BASE_SET_SUCCESS, 'Lancamento atualizada com sucesso!', {
        root: true
      });
    } catch (error) {
      // console.log(error);
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async [LANCAMENTO_UPDATE_PAGAR]({ commit }, lancamento) {
    commit(BASE_SET_LOADING, null, { root: true });
    try {
      // const data = { ...lancamento, active: !lancamento.active };
      const response = await LancamentoService.updateItem(lancamento);
      commit(UPDATE_LANCAMENTO, response.data);
    } catch (error) {
      // console.log(error);
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async [LANCAMENTO_CREATE]({ commit }, lancamento) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      console.log(lancamento);
      // const data = { ...lancamento, active: !lancamento.active };
      const response = await LancamentoService.addItem(lancamento);
      state.lancamentos.push(response.data);
      state.lancamento = new Lancamento();
      commit(BASE_SET_SUCCESS, 'Lancamento criada com sucesso!', {
        root: true
      });
    } catch (error) {
      // console.log(error);
      commit(BASE_SET_ERROR, error, { root: true });
    } finally {
      commit(BASE_SET_LOADING, null, { root: true });
    }
  },

  async [LANCAMENTO_DELETE]({ commit }, lancamento) {
    commit(BASE_RESET, null, { root: true });
    commit(BASE_SET_LOADING, null, { root: true });

    try {
      // const data = { ...lancamento, active: !lancamento.active };
      const response = await LancamentoService.deleteItem(lancamento);
      state.lancamentos = state.lancamentos.filter(
        item => item.id != lancamento.id
      );
      commit(BASE_SET_SUCCESS, 'Lancamento removida com sucesso!', {
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
  [SET_LANCAMENTOS](state, payload) {
    state.lancamentos = payload;
  },
  [ADD_LANCAMENTO](state, payload) {
    state.lancamentos.push(payload);
    state.lancamento = new Lancamento();
  },
  [UPDATE_LANCAMENTO](state, payload) {
    console.log(payload);
    state.lancamentos = [
      ...state.lancamentos.filter(item => item.id !== payload.id),
      payload
    ];

    state.lancamento = new Lancamento();
  },
  [REMOVE_LANCAMENTO](state, payload) {
    state.lancamentos = state.lancamentos.filter(item => item.id != payload.id);
  },
  [LANCAMENTO_EDIT](state, payload) {
    console.log(payload);
    state.lancamento = payload ? payload : new Lancamento();
  }
};
export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
