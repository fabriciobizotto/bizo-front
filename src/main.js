import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import validationMessages from 'vee-validate/dist/locale/pt_BR';
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

library.add(fas, faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;
Vue.use(VueI18n);

const i18n = new VueI18n();
i18n.locale = 'pt_BR';
Vue.use(VeeValidate, {
  fieldsBagName: 'vee-fields',
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  dictionary: {
    pt_BR: validationMessages
  }
});

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
