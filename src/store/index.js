import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

import * as modules from './modules';

Vue.use(Vuex);
// Vue.prototype.$http = axios;

export default new Vuex.Store({
  modules
});
