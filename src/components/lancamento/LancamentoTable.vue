<template>
  <b-card footer-lancamento="footer">

    <div class="mb-4">
      <b-button
        variant="outline-success"
        size="sm"
        class="mr-1 float-right"
        @click="show()"
        v-show="!showForm"
      >
        <font-awesome-icon icon="plus-square" /> Adicionar
      </b-button>
      <b-button
        variant="light"
        @click="getLancamentosAtuais()"
      >
        <font-awesome-icon
          icon="sync"
          class="fa-sm text-primary"
        /> Lançamentos
      </b-button>
    </div>

    <b-button-group
      size="sm"
      class="nav nav-tabs nav-justified p-0"
    >
      <b-button
        class="p-1"
        v-for="mes in meses"
        :key="mes.key"
        :disabled="mes.key == currentMes"
        :variant="mes.key == currentMes ? 'success' : 'secondary'"
        @click="getLancamentosMes(mes.key)"
      >{{mes.title}}</b-button>
    </b-button-group>

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
      responsive="sm"
      head-variant="light"
    >

      <template #empty="">
        <em>{{ $t('table.emptyText') }}</em>
      </template>

      <template #cell(dtlcto)="row">
        {{(row.item.dtpgto || row.item.dtlcto) | toDate}}
      </template>

      <template #cell(tags)="{item}">
        <h5>
          <b-badge variant="info">{{item.tags.length || 0}}</b-badge>
        </h5>
      </template>

      <template #cell(vllcto)="row">
        <span :class="row.item.despesa ? 'text-danger' : 'text-primary'">{{(row.item.vlpgto || row.item.vllcto) | toCurrency}}</span>
        <b-link
          v-if="row.item.dtpgto !== null"
          @click="pagar(row.item)"
          class="ml-2"
          title="Cancelar Pagamento"
        >
          <font-awesome-icon
            icon="check-double"
            class="text-secondary"
          />
        </b-link>
        <b-link
          v-if="row.item.dtpgto == null"
          @click="pagar(row.item)"
          class="ml-2"
          title="Pagar"
        >
          <font-awesome-icon
            icon="check"
            class="text-success"
          />
        </b-link>

      </template>

      <template #row-details="row">
        <em>{{row.item.title}}</em>
        <span
          class="float-right"
          v-html="getTagTitle(row.item.tags)"
        >
        </span>
      </template>

      <template #cell(title)="row">
        <b-link
          class="text-secondary"
          @click="row.toggleDetails"
        >{{row.item.title | truncateText}}</b-link>
      </template>

      <template #cell(actions)="row">
        <b-row class="float-right mr-0">
          <span title="Pagar Automaticamente na data de vencimento?">
            <b-form-checkbox
              @change="automatizarPagamento(row.item)"
              v-model="row.item.pagar"
              class="mr-1"
              switch
            >
            </b-form-checkbox>
          </span>
          <b-link
            @click="editar(row.item)"
            class="mr-2"
          >
            <font-awesome-icon
              icon="edit"
              class="fa-lg text-warning"
            />
          </b-link>
          <b-link
            @click="excluir(row.item)"
            class="mr-2 text-danger"
          >
            <font-awesome-icon
              icon="trash"
              class="fa-lg"
            />
          </b-link>
        </b-row>
      </template>
    </b-table>

    <template #footer>
      <b-row>
        <b-col cols="4">
          <b-button-group size="sm">
            <b-button
              variant="dark"
              @click="getLancamentosPrev()"
            >
              <font-awesome-icon icon="arrow-left" />
            </b-button>
            <b-button
              disabled
              variant="success"
            >{{currentAno}}</b-button>
            <b-button
              variant="dark"
              @click="getLancamentosNext()"
            >
              <font-awesome-icon icon="arrow-right" />
            </b-button>
          </b-button-group>
        </b-col>
        <b-col cols="4">
          <b-pagination
            size="sm"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
        <b-col cols="4">
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
import moment from 'moment';
import store from '@/store';
import {
  LANCAMENTO_UPDATE_PAGAR,
  LANCAMENTO_DELETE,
  LANCAMENTO_UPDATE,
  LANCAMENTO_EDIT,
  FETCH_LANCAMENTOS,
} from '@/store/actions.type';

export default {
  name: 'LancamentoTable',
  props: ['lista', 'rows', 'show', 'showForm'],
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      filter: null,
      filterOn: ['title'],
      fields: [
        {
          key: 'dtlcto',
          sortable: false,
          label: 'Data',
        },
        { key: 'category.title', sortable: false, label: 'Categoria' },
        { key: 'account.title', sortable: false, label: 'Conta' },
        {
          key: 'title',
          sortable: false,
          label: 'Descrição',
          _showDetails: true,
        },
        {
          key: 'vllcto',
          sortable: false,
          label: 'Valor',
          class: 'text-right',
          // formatter: 'formatCurrency',
        },
        { key: 'tags', sortable: false, label: 'Tags', class: 'text-center' },
        // { key: 'pagar', sortable: false, label: 'Pagar?' },
        { key: 'actions', label: '' },
      ],
      currentMes: store.getters.lancamentoParams['mes'],
      currentAno: store.getters.lancamentoParams['ano'],
      meses: [
        { key: 1, title: 'Janeiro' },
        { key: 2, title: 'Fevereiro' },
        { key: 3, title: 'Março' },
        { key: 4, title: 'Abril' },
        { key: 5, title: 'Maio' },
        { key: 6, title: 'Junho' },
        { key: 7, title: 'Julho' },
        { key: 8, title: 'Agosto' },
        { key: 9, title: 'Setembro' },
        { key: 10, title: 'Outubro' },
        { key: 11, title: 'Novembro' },
        { key: 12, title: 'Dezembro' },
      ],
    };
  },
  computed: {
    // activeMes() {
    //   return this.meses.filter((item) => item.key == this.currentMes);
    // },
  },
  methods: {
    automatizarPagamento(item) {
      store.dispatch(LANCAMENTO_UPDATE_PAGAR, item);
    },
    pagar(item) {
      let pagar = item.vlpgto == null;
      item.vlpgto = pagar ? item.vllcto : null;
      item.dtpgto = pagar ? item.dtlcto : null;

      store.dispatch(LANCAMENTO_UPDATE_PAGAR, item);
    },
    editar(item) {
      store.commit(LANCAMENTO_EDIT, { ...item });
      this.show();
    },
    updateItem(item) {
      store.dispatch(LANCAMENTO_UPDATE, item);
    },
    excluir(item) {
      store.dispatch(LANCAMENTO_DELETE, item);
    },
    formatDate(value) {
      return moment(value).format('DD/MM/YYYY');
    },
    getTagTitle(tags) {
      return tags
        .map((item) => `<span class="badge badge-info">${item.title}</span>`)
        .join(' ');
    },
    getLancamentosAtuais() {
      this.currentMes = new Date().getMonth() + 1;
      this.currentAno = new Date().getFullYear();
      store.dispatch(FETCH_LANCAMENTOS, {
        ano: this.currentAno,
        mes: this.currentMes,
      });
    },
    getLancamentosMes(mes) {
      this.currentMes = mes;
      store.dispatch(FETCH_LANCAMENTOS, {
        ano: this.currentAno,
        mes: this.currentMes,
      });
    },
    getLancamentosPrev() {
      this.currentAno -= 1;
      store.dispatch(FETCH_LANCAMENTOS, {
        ano: this.currentAno,
        mes: this.currentMes,
      });
    },
    getLancamentosNext() {
      this.currentAno += 1;
      store.dispatch(FETCH_LANCAMENTOS, {
        ano: this.currentAno,
        mes: this.currentMes,
      });
    },
  },
  filters: {
    toCurrency(value) {
      if (isNaN(value)) {
        return value;
      }

      return Number(value).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      });
    },
    toDate(value) {
      return moment(value).format('DD/MM/YYYY');
    },
    truncateText(value) {
      let size = 25;
      if (value != null && value.length > size) {
        return value.substring(0, size).concat('...');
      }
      return value;
    },
  },
};
</script>

<style>
</style>