<template>
  <div class="mt-2">
    <b-overlay
      :show="isLoading"
      rounded="sm"
    >
      <b-row class="align-items-start">
        <b-col
          v-show="showForm"
          lg="12"
        >
          <b-card>
            <b-form
              name="form"
              @submit.prevent="submit"
            >
              <b-row>
                <b-col sm="9">
                  <b-form-input
                    id="title"
                    ref="title"
                    class="mb-2 mr-sm-2 mb-sm-0 form-control"
                    placeholder="Ex. Mercado"
                    name="title"
                    v-validate="'required|min:1|max:20'"
                    v-model="item.title"
                  ></b-form-input>
                  <div
                    v-if="submitted && errors.has('title')"
                    class="text-danger"
                  >
                    {{errors.first('title')}}
                  </div>
                </b-col>

                <b-col sm="3">
                  <b-form-checkbox
                    v-model="item.active"
                    class=""
                  >Ativa?</b-form-checkbox>
                </b-col>
              </b-row>

              <b-row class="mb-3">
                <b-col>
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
                    @click="cancelEdit()"
                    v-show="showForm"
                  >
                    <font-awesome-icon icon="minus-square" /> Cancelar
                  </b-button>

                </b-col>

              </b-row>
            </b-form>
          </b-card>
        </b-col>

        <b-col lg="12">
          <b-card footer-tag="footer">
            <div class="mb-2">
              <b-button
                variant="outline-success"
                size="sm"
                class="mr-1 float-right"
                @click="show(false)"
                v-show="!showForm"
              >
                <font-awesome-icon icon="plus-square" /> Nova
              </b-button>
              <span class="h3 text-muted">Contas</span>
            </div>
            <b-table
              :items="itemList"
              :fields="fields"
              sort-icon-left
              :per-page="perPage"
              :current-page="currentPage"
              :filter="filter"
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
                <!-- <font-awesome-icon :icon="data.item.active ? 'check-square' : 'check-square'" /> -->
              </template>

              <template #cell(investment)="data">
                <b-form-checkbox
                  @change="updateItem(data.item)"
                  v-model="data.item.investment"
                >
                </b-form-checkbox>
              </template>

              <template #cell(actions)="row">
                <div class="float-right">
                  <b-button
                    variant="info"
                    size="sm"
                    @click="editItem(row.item)"
                    class="mr-1"
                  >
                    <font-awesome-icon icon="pen-square" /> Editar
                  </b-button>
                  <b-button
                    variant="danger"
                    size="sm"
                    @click="deletarItem(row.item, row.index, $event.target)"
                    class="mr-1"
                  >
                    <font-awesome-icon icon="trash-alt" /> Excluir
                  </b-button>
                </div>
              </template>
            </b-table>

            <template #footer>
              <b-row>
                <b-col cols="7">
                  <b-pagination
                    size="sm"
                    v-model="currentPage"
                    :total-rows="quantidade"
                    :per-page="perPage"
                    aria-controls="my-table"
                  ></b-pagination>
                </b-col>
                <b-col cols="5">
                  <b-form-group
                    label=""
                    label-for="filter-input"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
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
        </b-col>
      </b-row>

    </b-overlay>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Tag from '../models/tag';

const { mapActions, mapGetters } = createNamespacedHelpers('TagModule');

export default {
  name: 'TagPage',
  data() {
    return {
      edited: null,
      item: new Tag(),
      submitted: false,
      showForm: false,
      perPage: 5,
      currentPage: 1,
      filter: null,
      filterOn: [],
      fields: [
        { key: 'title', sortable: true, label: 'Tag' },
        { key: 'active', sortable: true, label: 'Status' },
        { key: 'actions', label: '' },
      ],
    };
  },
  methods: {
    ...mapActions(['itemAll', 'updateItem', 'saveItem', 'deletarItem']),
    show(mostrar = false) {
      console.log(mostrar);
      this.showForm = mostrar ? mostrar : !this.showForm;
      this.$nextTick(() => {
        this.$refs.title.focus();
      });
    },
    submit() {
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          console.log(this.item);
          const metodo = this.item.id ? this.updateItem : this.saveItem;
          metodo(this.item).then(
            () => {
              // this.message = data.message;
              this.showForm = false;
              this.submitted = false;
              this.item = new Tag();
            },
            (error) => {
              this.showForm = true;
            }
          );
        } else {
          this.$nextTick(() => {
            this.$refs.title.focus();
          });
        }
      });
    },
    editItem(item) {
      this.item = { ...item };
      this.show(true);
    },
    cancelEdit() {
      this.item = new Tag();
      this.show(false);
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'itemList', 'quantidade']),
  },
  created() {
    this.itemAll();
    // this.$store.dispatch('item/fetchAll')
  },
};
</script>

<style>
</style>