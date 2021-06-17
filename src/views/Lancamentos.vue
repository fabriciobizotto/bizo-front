<template>
  <b-overlay
    :show="isLoading"
    rounded="sm"
    class="mt-2"
  >
    <LancamentoForm
      :show="show"
      :showForm="showForm"
      :submitted="submitted"
      :submit="submit"
    />
    <LancamentoTable
      :lista="lancamentoList"
      :rows="lancamentoListSize"
      :showForm="showForm"
      :show="show"
      v-show="!showForm"
    />

  </b-overlay>
</template>

<script>
import LancamentoTable from '@/components/lancamento/LancamentoTable';
import LancamentoForm from '@/components/lancamento/LancamentoForm';
import { mapGetters, createNamespacedHelpers } from 'vuex';
import store from '@/store';
import {
  LANCAMENTO_CREATE,
  LANCAMENTO_UPDATE,
  FETCH_LANCAMENTOS,
} from '@/store/actions.type';
import { BASE_RESET } from '@/store/mutations.types';
const { mapGetters: mapGettersBase } = createNamespacedHelpers('BaseModule');

export default {
  name: 'LancamentoPage',
  components: { LancamentoTable, LancamentoForm },
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
          // this.$children[0].$children[0].$refs.title.focus();
        });
      } catch (error) {
        console.log(error);
      }
    },
    submit() {
      this.submitted = true;
      this.$children[0].$children[0].$validator.validate().then((isValid) => {
        console.log(isValid);
        console.log(this.lancamento);
        if (isValid) {
          this.lancamento.category_id = this.lancamento.category.id;
          this.lancamento.account_id = this.lancamento.account.id;

          const metodo = this.lancamento.id
            ? LANCAMENTO_UPDATE
            : LANCAMENTO_CREATE;
          store.dispatch(metodo, this.lancamento).then(
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
    ...mapGetters(['lancamento', 'lancamentoList', 'lancamentoListSize']),
  },
  created() {
    store.dispatch(FETCH_LANCAMENTOS);
    // this.$store.dispatch('lancamento/fetchAll')
  },
};
</script>