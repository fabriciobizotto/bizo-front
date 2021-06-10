import Vue from 'vue'
import VueI18n from 'vue-i18n';
import validationMessages from 'vee-validate/dist/locale/pt_BR';
import VeeValidate from 'vee-validate';

Vue.use(VueI18n);

const messages = {
    'pt_BR': {
        table: {
            emptyText: 'Nenhum Registro Encontrado'
        }
      }
}

const i18n = new VueI18n({
    locale: 'pt_BR',
    fallbackLocale: 'pt_BR',
    messages
});

Vue.use(VeeValidate, {
    fieldsBagName: 'vee-fields',
    i18nRootKey: 'validations', // customize the root path for validation messages.
    i18n,
    dictionary: {
      pt_BR: validationMessages
    }
});
  
export default i18n