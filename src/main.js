import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import datePicker from 'vue-bootstrap-datetimepicker';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import '@/assets/styles/_variables.scss';
import '@/assets/styles/_bootstrap.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  fas,
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import i18n from '@/plugins/i18n';

library.add(fas, faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(datePicker);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
