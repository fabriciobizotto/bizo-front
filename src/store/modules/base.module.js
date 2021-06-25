import { BASE_RESET } from '@/store/mutations.types';

const state = {
  loading: false,
  message: {
    showDismissibleAlert: false,
    error: false,
    errors: []
  }
};
const getters = {
  message: state => state.message,
  isLoading: state => state.loading
};

const mutations = {
  reset: state => {
    state.message.error = null;
    state.message.showDismissibleAlert = false;
    state.message.errors = null;
  },
  setLoading: state => {
    state.loading = !state.loading;
  },
  setError(state, payload) {
    state.message.error = true;
    state.message.showDismissibleAlert = true;

    if (payload.response) {
      state.message.errors = payload.response.data.errors;
    } else {
      state.message.errors = payload;
    }
  },
  setSuccess(state, payload) {
    state.message.error = false;
    state.message.showDismissibleAlert = true;
    state.message.text = payload;
  }
};

export default { namespaced: true, state, getters, mutations };
