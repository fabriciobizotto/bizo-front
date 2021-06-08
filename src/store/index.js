import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

import { auth } from './auth.module';

Vue.use(Vuex);
Vue.prototype.$http = axios

export default new Vuex.Store({
  modules: {
    auth
  }
});
