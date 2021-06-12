<template>
  <b-card footer-tag="footer">
    <div class="mb-4">
      <b-button
        variant="outline-success"
        size="sm"
        class="mr-1 float-right"
        @click="show()"
        v-show="!showForm"
      >
        <font-awesome-icon icon="plus-square" /> Nova
      </b-button>
      <span class="h3 text-muted">Tags</span>
    </div>
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
    >
      <template #empty="">
        <em>{{ $t('table.emptyText') }}</em>
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
          <b-button
            variant="info"
            size="sm"
            @click="editar(row.item)"
            class="mr-1"
          >
            <font-awesome-icon icon="pen-square" /> Editar
          </b-button>
          <b-button
            variant="danger"
            size="sm"
            @click="excluir(row.item)"
            class="mr-1"
          >
            <font-awesome-icon icon="trash-alt" /> Excluir
          </b-button>
        </div>
      </template>
    </b-table>

    <template #footer>
      <b-row>
        <b-col cols="6">
          <b-pagination
            size="sm"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
        <b-col cols="6">
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
  TAG_CREATE,
  TAG_DELETE,
  TAG_UPDATE,
  FETCH_TAGS,
  TAG_EDIT,
} from '@/store/actions.type';

export default {
  name: 'TagTable',
  props: ['lista', 'rows', 'show', 'showForm'],
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      filter: null,
      filterOn: ['title'],
      fields: [
        { key: 'title', sortable: true, label: 'Tag' },
        { key: 'active', sortable: true, label: 'Status' },
        { key: 'actions', label: '' },
      ],
    };
  },
  methods: {
    editar(item) {
      store.commit(TAG_EDIT, { ...item });
      this.show();
    },
    updateItem(item) {
      store.dispatch(TAG_UPDATE, item);
    },
    excluir(item) {
      store.dispatch(TAG_DELETE, item);
    },
  },
};
</script>

<style>
</style>