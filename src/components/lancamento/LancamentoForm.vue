<template>
  <b-card
    v-show="showForm"
    class="mb-1"
    bg-variant="light"
  >
    <b-form
      name="form"
      ref="form"
      @submit.prevent="submit"
    >
      <b-row>
        <b-col sm="6">
          <b-form-group
            label="Categoria"
            label-for="category"
          >
            <vue-simple-suggest
              id="category"
              ref="category"
              data-vv-name="categoria"
              placeholder="Categoria"
              v-model="lancamento.category"
              display-attribute="title"
              value-attribute="id"
              :list="categoriesDisponiveis"
              v-validate="'required'"
              autofocus
            ></vue-simple-suggest>

            <div
              v-if="submitted && errors.has('categoria')"
              class="text-danger"
            >
              {{errors.first('categoria')}}
            </div>

          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group
            label="Conta"
            label-for="account_id"
          >
            <vue-simple-suggest
              id="conta"
              ref="account"
              data-vv-name="conta"
              placeholder="Conta"
              v-model="lancamento.account"
              display-attribute="title"
              value-attribute="id"
              :list="accountsActive"
              v-validate="'required'"
              mode="select"
            >
            </vue-simple-suggest>
            <div
              v-if="submitted && errors.has('conta')"
              class="text-danger"
            >
              {{errors.first('conta')}}
            </div>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group
            label="Descrição"
            label-for="title"
          >
            <b-form-input
              id="título"
              ref="title"
              data-vv-name="título"
              class="mb-2 mr-sm-2 mb-sm-0 form-control"
              placeholder="Descrição"
              name="título"
              v-validate="'required|min:1|max:20'"
              v-model="lancamento.title"
            ></b-form-input>
            <div
              v-if="submitted && errors.has('título')"
              class="text-danger"
            >
              {{errors.first('título')}}
            </div>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group
            label="Tags"
            label-for="tags"
          >

            <tags-input
              id-field="id"
              text-field="title"
              element-id="tags"
              v-model="lancamento.tags"
              :existing-tags="tagsActive"
              :typeahead="true"
              :typeahead-hide-discard="true"
              placeholder="Tag..."
              :typeahead-always-show="true"
              :typeahead-max-results="5"
              :limit="5"
              :only-existing-tags="true"
              :typeahead-style="'badges'"
            ></tags-input>

            <div
              v-if="submitted && errors.has('tags')"
              class="text-danger"
            >
              {{errors.first('tags')}}
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-card>
        <b-row>
          <b-col
            sm="6"
            md="3"
            lg="3"
          >
            <b-form-group
              label="Informe a Data"
              label-for="dtlcto"
            >
              <date-picker
                id="dtlcto"
                data-vv-name="dtlcto"
                v-model="lancamento.dtlcto"
                :config="options"
                v-validate="'required|date_format:dd/MM/yyyy'"
                placeholder="___/___/______"
              >

              </date-picker>
              <div
                v-if="submitted && errors.has('dtlcto')"
                class="text-danger"
              >
                {{errors.first('dtlcto')}}
              </div>
            </b-form-group>

          </b-col>
          <b-col
            sm="6"
            md="3"
            lg="3"
          >
            <b-form-group
              label="Informe o Valor"
              label-for="vllcto"
            >

              <b-input-group>
                <currency-input
                  data-vv-name="valor"
                  v-model="lancamento.vllcto"
                  currency="BRL"
                  locale="pt-BR"
                  class="form-control"
                  placeholder="Valor"
                  v-validate="'required'"
                ></currency-input>

                <b-input-group-append>
                  <b-button
                    data-vv-name=""
                    size="sm"
                    class="p-1"
                    text="Despesa"
                    @click="lancamento.despesa = !lancamento.despesa"
                    :variant="lancamento.despesa ? 'danger' : 'success'"
                  >{{lancamento.despesa ? 'Despesa' : 'Receita'}}</b-button>
                </b-input-group-append>

              </b-input-group>
              <div
                v-if="submitted && errors.has('valor')"
                class="text-danger"
              >
                {{errors.first('valor')}}
              </div>
            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            md="2"
            lg="2"
          >
            <b-form-group
              label="Está Pago?"
              label-for="pago"
            >
              <b-form-checkbox
                data-vv-name=""
                id="pago"
                switch
                v-model="pago"
                @change="setPago"
                class="success"
              >
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            md="4"
            lg="4"
          >
            <b-form-group
              label="Pagar Automaticamente?"
              label-for="pagar"
            >
              <b-form-checkbox
                data-vv-name=""
                id="pagar"
                switch
                v-model="lancamento.pagar"
                class=""
              />
            </b-form-group>
          </b-col>

        </b-row>

      </b-card>

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
import VueSimpleSuggest from 'vue-simple-suggest';
import 'vue-simple-suggest/dist/styles.css'; // Optional CSS
import VoerroTagsInput from '@voerro/vue-tagsinput';
import '@voerro/vue-tagsinput/dist/style.css';

import { Escapable } from '@/plugins/Escapable';
import { mapGetters } from 'vuex';
import store from '@/store';

import {
  LANCAMENTO_EDIT,
  FETCH_CATEGORIES_DISPONIVEIS,
  FETCH_ACCOUNTS_ACTIVE,
  FETCH_TAGS_ACTIVE,
} from '@/store/actions.type';

export default {
  name: 'LancamentoForm',
  mixins: [Escapable],
  components: {
    VueSimpleSuggest,
    'tags-input': VoerroTagsInput,
  },
  props: ['show', 'showForm', 'submitted', 'submit'],
  computed: {
    ...mapGetters([
      'lancamento',
      'categoriesDisponiveis',
      'accountsActive',
      'tagsActive',
    ]),
  },
  data() {
    return {
      pago: false,
      options: {
        format: 'DD/MM/YYYY',
        useCurrent: true,
      },
    };
  },
  methods: {
    escapeHandler() {
      store.commit(LANCAMENTO_EDIT, null);
      this.show();
    },
    setPago() {
      if (this.pago) {
        this.lancamento.dtpgto = this.lancamento.dtlcto;
        this.lancamento.vlpgto = this.lancamento.vllcto;
      } else {
        this.lancamento.dtpgto = null;
        this.lancamento.vlpgto = null;
      }
    },
    // formatDate(value, event) {
    //   return moment(value).format('DD/MM/YYYY ');
    // },
  },
  created() {
    store.dispatch(FETCH_CATEGORIES_DISPONIVEIS, null);
    store.dispatch(FETCH_ACCOUNTS_ACTIVE, null);
    store.dispatch(FETCH_TAGS_ACTIVE, null);
  },
};
</script>
