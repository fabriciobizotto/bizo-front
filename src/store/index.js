import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

import { auth } from './auth.module';
import { AccountModule } from './account.module';

Vue.use(Vuex);
Vue.prototype.$http = axios

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    auth,
    AccountModule
  }
});
