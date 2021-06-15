<template>
  <b-card
    v-show="showForm"
    class="mb-1"
    bg-variant="light"
  >
    <b-form
      name="form"
      @submit.prevent="submit"
    >
      <b-row>
        <b-col sm="6">
          <b-form-group
            label="Categoria"
            label-for="category_id"
          >
            <b-form-input
              id="category_id"
              name="category_id"
              list="categories-data"
              placeholder="Ex. Alimentação"
              v-validate="'required'"
              v-model="lancamento.category_id"
            ></b-form-input>
            <b-form-datalist
              id="categories-data"
              :options="categoriesDisponiveis"
              text-field="title"
              value-field="id"
            />
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group
            label="Conta"
            label-for="account_id"
          >
            <b-form-input
              id="account_id"
              list="accounts-data"
              placeholder="Ex. BB"
              v-validate="'required'"
              v-model="lancamento.account_id"
            ></b-form-input>
            <b-form-datalist
              id="accounts-data"
              :options="accountsActive"
              text-field="title"
              value-field="id"
            >

            </b-form-datalist>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group
            label="Descrição"
            label-for="title"
          >
            <b-form-input
              id="title"
              ref="title"
              class="mb-2 mr-sm-2 mb-sm-0 form-control"
              placeholder="Ex. Mercado"
              name="title"
              v-validate="'required|min:1|max:20'"
              v-model="lancamento.title"
            ></b-form-input>
            <div
              v-if="submitted && errors.has('title')"
              class="text-danger"
            >
              {{errors.first('title')}}
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-checkbox
        v-model="lancamento.active"
        class=""
      >Ativa?</b-form-checkbox>

      <b-button
        type="submit"
        size="sm"
        class="mt-3"
        variant="primary"
      >
        <font-awesome-icon icon="plus-square" /> Salvar
      </b-button>
      <b-button
        variant="outline-dark"
        size="sm"
        class="mt-3 ml-1"
        @click="escapeHandler()"
        v-show="showForm"
      >
        <font-awesome-icon icon="minus-square" /> Cancelar
      </b-button>

    </b-form>
  </b-card>
</template>

<script>
import { Escapable } from '@/plugins/Escapable';
import { mapGetters } from 'vuex';
import store from '@/store';
import {
  LANCAMENTO_EDIT,
  FETCH_CATEGORIES_DISPONIVEIS,
  FETCH_ACCOUNTS_ACTIVE,
} from '@/store/actions.type';

export default {
  name: 'LancamentoForm',
  mixins: [Escapable],
  props: ['show', 'showForm', 'submitted', 'submit'],
  computed: {
    ...mapGetters(['lancamento', 'categoriesDisponiveis', 'accountsActive']),
  },
  methods: {
    escapeHandler() {
      store.commit(LANCAMENTO_EDIT, null);
      this.show();

      //   console.log(this.$refs);
    },
  },
  created() {
    store.dispatch(FETCH_CATEGORIES_DISPONIVEIS, null);
    store.dispatch(FETCH_ACCOUNTS_ACTIVE, null);
  },
};
</script>

<style>
</style>