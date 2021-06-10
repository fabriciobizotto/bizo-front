import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

import * as modules from './modules';

Vue.use(Vuex);
// Vue.prototype.$http = axios;

export default new Vuex.Store({
  state: {
    loading: false,
    message: {
      showDismissibleAlert: false,
      error: false,
      text: null
    }
  },
  getters: {
    message: state => state.message,
    isLoading: state => state.loading
  },
  modules
});
