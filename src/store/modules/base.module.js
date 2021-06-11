const state = {
  loading: false,
  message: {
    showDismissibleAlert: false,
    error: false,
    text: null
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
    state.message.text = null;
  },
  setLoading: state => {
    state.loading = !state.loading;
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

export default { namespaced: true, state, getters, mutations };
