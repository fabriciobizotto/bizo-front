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
            ></vue-simple-suggest>

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
              v-validate="'required'"
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
            sm="12"
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
            sm="12"
            md="3"
            lg="3"
          >
            <b-form-group
              label="Informe o Valor"
              label-for="vllcto"
            >

              <b-form-input
                id="vllcto"
                data-vv-name="vllcto"
                v-model="lancamento.vllcto"
                :config="options"
                v-validate="'required'"
                placeholder="Valor"
              >

              </b-form-input>

            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            md="2"
            lg="2"
          >
            <b-label>Está Pago?</b-label>
            <b-form-checkbox
              switch
              v-model="pago"
              @change="setPago"
            >
            </b-form-checkbox>
          </b-col>

          <b-col
            sm="6"
            md="4"
            lg="4"
          >
            <b-label>Pagar Automaticamente?</b-label>
            <b-form-checkbox
              switch
              v-model="lancamento.pagar"
              class=""
            />
          </b-col>

          <!-- <b-col
            sm="12"
            md="6"
            lg="4"
          >
            <b-input-group>
              <b-form-input
                id="vllcto"
                data-vv-name="vllcto"
                v-model="lancamento.vllcto"
                :config="options"
                v-validate="'required'"
                placeholder="Valor"
              >

              </b-form-input>
              <b-input-group-prepend is-text>
                <b-form-checkbox
                  switch
                  v-model="pago"
                  @change="setPago"
                >
                </b-form-checkbox>
              </b-input-group-prepend>
              <b-form-input
                id="vlpgto"
                data-vv-name="vlpgto"
                v-model="lancamento.vlpgto"
                :config="options"
                v-validate="'required'"
                placeholder="Valor Pago"
              >

              </b-form-input>

            </b-input-group>
            <div
              v-if="submitted && errors.has('dtlcto')"
              class="text-danger"
            >
              {{errors.first('dtlcto')}}
            </div>
          </b-col> -->
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
import moment from 'moment';

export default {
  name: 'LancamentoForm',
  mixins: [Escapable],
  components: { VueSimpleSuggest, 'tags-input': VoerroTagsInput },
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
        useCurrent: false,
      },
    };
  },
  methods: {
    escapeHandler() {
      store.commit(LANCAMENTO_EDIT, null);
      this.show();

      //   console.log(this.$refs);
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
    // onContext(ctx) {
    //   // The date formatted in the locale, or the `label-no-date-selected` string
    //   this.formatted = ctx.selectedFormatted;
    //   // The following will be an empty string until a valid date is entered
    //   console.log(ctx);
    //   this.lancamento.dtlcto = ctx.selectedYMD;
    // },
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
