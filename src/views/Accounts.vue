<template>
  <b-overlay
    :show="isLoading"
    rounded="sm"
    class="mt-2"
  >
    <AccountForm
      :show="show"
      :showForm="showForm"
      :submitted="submitted"
      :submit="submit"
    />
    <AccountTable
      :lista="accountList"
      :rows="accountListSize"
      :showForm="showForm"
      :show="show"
    />

  </b-overlay>
</template>

<script>
import AccountTable from '@/components/account/AccountTable';
import AccountForm from '@/components/account/AccountForm';
import { mapGetters, createNamespacedHelpers } from 'vuex';
import store from '@/store';
import {
  ACCOUNT_CREATE,
  ACCOUNT_UPDATE,
  FETCH_ACCOUNTS,
} from '@/store/actions.type';
import { BASE_RESET } from '@/store/mutations.types';
const { mapGetters: mapGettersBase } = createNamespacedHelpers('BaseModule');

export default {
  name: 'AccountPage',
  components: { AccountTable, AccountForm },
  data() {
    return {
      showForm: false,
      submitted: false,
    };
  },
  methods: {
    show() {
      try {
        this.showForm = !this.showForm;
        if (this.showForm) {
          store.commit(BASE_RESET, null, { root: true });
        }
        this.$nextTick(() => {
          this.$children[0].$children[0].$refs.title.focus();
        });
      } catch (error) {
        console.log(error);
      }
    },
    submit() {
      this.submitted = true;
      this.$children[0].$children[0].$validator.validate().then((isValid) => {
        if (isValid) {
          const metodo = this.account.id ? ACCOUNT_UPDATE : ACCOUNT_CREATE;
          store.dispatch(metodo, this.account).then(
            () => {
              this.showForm = false;
              this.submitted = false;
            },
            (error) => {
              this.showForm = true;
            }
          );
        }
      });
    },
  },
  computed: {
    ...mapGettersBase(['isLoading']),
    ...mapGetters(['account', 'accountList', 'accountListSize']),
  },
  created() {
    store.dispatch(FETCH_ACCOUNTS);
    // this.$store.dispatch('account/fetchAll')
  },
};
</script>