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
            label="Categoria Superior"
            label-for="category_id"
          >
            <b-form-select
              id="category_id"
              autofocus
              v-model="category.category_id"
              :options="categoryOptions"
              ref="category_id"
            />
          </b-form-group>

        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Título"
            label-for="title"
          >
            <b-form-input
              id="title"
              ref="title"
              placeholder="Categoria"
              name="title"
              v-validate="'required|min:1|max:20'"
              v-model="category.title"
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

      <b-form-checkbox v-model="category.active">Ativa?</b-form-checkbox>

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
import { CATEGORY_EDIT } from '@/store/actions.type';

export default {
  name: 'CategoryForm',
  mixins: [Escapable],
  props: ['show', 'showForm', 'submitted', 'submit'],
  computed: {
    ...mapGetters(['category', 'categoryOptions']),
  },
  methods: {
    escapeHandler() {
      store.commit(CATEGORY_EDIT, null);
      this.show();

      //   console.log(this.$refs);
    },
  },
};
</script>

<style>
</style>