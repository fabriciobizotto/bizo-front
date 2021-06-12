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
      <b-form-input
        id="title"
        ref="title"
        class="mb-2 mr-sm-2 mb-sm-0 form-control"
        placeholder="Ex. BB"
        name="title"
        v-validate="'required|min:1|max:20'"
        v-model="account.title"
      ></b-form-input>
      <div
        v-if="submitted && errors.has('title')"
        class="text-danger"
      >
        {{errors.first('title')}}
      </div>

      <b-form-checkbox
        v-model="account.active"
        class=""
      >Ativa?</b-form-checkbox>
      <b-form-checkbox
        v-model="account.investment"
        class=""
      >Investimento?</b-form-checkbox>

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
import { ACCOUNT_EDIT } from '@/store/actions.type';

export default {
  name: 'AccountForm',
  mixins: [Escapable],
  props: ['show', 'showForm', 'submitted', 'submit'],
  computed: {
    ...mapGetters(['account']),
  },
  methods: {
    escapeHandler() {
      store.commit(ACCOUNT_EDIT, null);
      this.show();

      //   console.log(this.$refs);
    },
  },
};
</script>

<style>
</style>