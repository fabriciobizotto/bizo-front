<template>
  <b-card footer-account="footer">
    <b-table
      :items="lista"
      :fields="fields"
      sort-icon-left
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      small
      striped
      show-empty
      head-variant="light"
      :busy="showForm"
      caption-top
    >
      <template #empty="">
        <em>{{ $t('table.emptyText') }}</em>
      </template>

      <template #table-caption>
        <b-row>
          <b-col sm="6">
            <b-button
              variant="outline-success"
              size="sm"
              class="mb-2"
              @click="show()"
              v-show="!showForm"
            >
              <font-awesome-icon icon="plus-square" /> Nova Conta
            </b-button>
          </b-col>
          <b-col
            sm="6"
            class="text-right"
          >
            Contas
          </b-col>
        </b-row>
      </template>

      <template #cell(id)="data">
        <b-link
          href
          @click="editar(data.item)"
        >
          {{data.item.id}}
        </b-link>
      </template>

      <template #cell(active)="data">
        <b-form-checkbox
          @change="updateItem(data.item)"
          v-model="data.item.active"
        >
        </b-form-checkbox>
      </template>

      <template #cell(actions)="row">
        <div class="float-right">
          <b-link
            size="sm"
            @click="excluir(row.item)"
            class="mr-1 text-danger"
          >
            <font-awesome-icon icon="trash-alt" />
          </b-link>
        </div>
      </template>
    </b-table>

    <template #footer>
      <b-row>
        <b-col sm="6">
          <b-pagination
            size="sm"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            align="fill"
          ></b-pagination>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label=""
            label-for="filter-input"
            label-align-sm="right"
            label-size="sm"
            class="m-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Pesquisar..."
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
    </template>
  </b-card>
</template>

<script>
import store from '@/store';
import {
  ACCOUNT_CREATE,
  ACCOUNT_DELETE,
  ACCOUNT_UPDATE,
  FETCH_CATEGORIES,
  ACCOUNT_EDIT,
} from '@/store/actions.type';

export default {
  name: 'AccountTable',
  props: ['lista', 'rows', 'show', 'showForm'],
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      filter: null,
      filterOn: ['id', 'account_title', 'title'],
      fields: [
        { key: 'id', sortable: true, label: '#' },
        { key: 'title', sortable: true, label: 'Conta' },
        { key: 'active', sortable: true, label: 'Status' },
        { key: 'actions', label: '' },
      ],
    };
  },
  methods: {
    editar(item) {
      store.commit(ACCOUNT_EDIT, { ...item });
      this.show(true);
    },
    updateItem(item) {
      store.dispatch(ACCOUNT_UPDATE, item);
    },
    excluir(item) {
      store.dispatch(ACCOUNT_DELETE, item);
    },
  },
};
</script>

<style>
</style>