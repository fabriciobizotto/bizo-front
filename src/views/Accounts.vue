<template>
  <div class="mt-2">
    <div class="mb-2">
        <b-button variant="outline-success" class="mr-1 float-right" @click="show(false)">
            <font-awesome-icon icon="plus-square" /> Nova
        </b-button>
        <span class="h2">Contas</span>
    </div>
    
    <b-overlay :show="isLoading" rounded="sm">
        <b-card v-show="showForm">
            <form name="form" @submit.prevent="submit">
                <div class="form-group">
                    <input
                        id="title"
                        ref="title"
                        class="mb-2 mr-sm-2 mb-sm-0 form-control"
                        placeholder="Ex. BB"
                        name="title"
                        v-validate="'required|min:3|max:20'"
                        v-model="account.title"
                    />
                    <div v-if="submitted && errors.has('title')" class="text-danger">
                        {{errors.first('title')}}
                    </div>
                </div>

                <b-form-checkbox v-model="account.active" class="">Ativa?</b-form-checkbox>
                <b-form-checkbox v-model="account.investment" class="">Investimento?</b-form-checkbox>

                <b-button type="submit" class="mt-3" variant="dark">Salvar</b-button>
            </form>
        </b-card>

        <b-table striped 
            :items="accountList" :fields="fields" sort-icon-left
            :per-page="perPage"
            :current-page="currentPage"
            small
            >
            <template #cell(active)="data">
                <b-form-checkbox 
                    class="text-center"
                    @change="updateAccount(data.item)"
                    v-model="data.item.active">
                </b-form-checkbox>
                <!-- <font-awesome-icon :icon="data.item.active ? 'check-square' : 'check-square'" /> -->
            </template>

            <template #cell(investment)="data">
                <b-form-checkbox 
                class="text-center"
                @change="updateAccount(data.item)"
                v-model="data.item.investment">
                </b-form-checkbox>
            </template>

             <template #cell(actions)="row">
                 <div class="float-right">
                    <b-button size="sm" @click="editAccount(row.item) && show(true)" class="mr-1 btn btn-info">
                        Editar
                    </b-button>
                    <b-button size="sm" @click="deletarConta(row.item, row.index, $event.target)" class="mr-1 btn btn-danger">
                        Excluir
                    </b-button>
                 </div>
            </template>
        </b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            ></b-pagination>
    </b-overlay>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'AccountPage',
    data() {
      return {
        submitted: false,
        mensagem: '',
        showForm: false,
        perPage: 10,
        currentPage: 1,
        fields: [
            {key: 'title', sortable: true, label: 'Conta'},
            {key: 'active', sortable: true, label: 'Status'},
            {key: 'investment', sortable: true, label: 'Investimento?'},
            { key: 'actions', label: '' },
        ],
      }
    },
    methods: {
        ...mapActions(['accountAll', 'updateAccount', 'saveAccount', 'deletarConta', 'editAccount']),
        show(mostrar = false) {
            console.log(mostrar);
            this.showForm = mostrar ? mostrar : !this.showForm
            this.$nextTick(() => {
                this.$refs.title.focus();
            })
        },
        submit() {
            this.mensagem = '';
            this.submitted = true;
            this.$validator.validate().then(isValid => {
                if (isValid) {
                    const metodo = this.account.id ? this.updateAccount : this.saveAccount
                    metodo(this.account).then(() => {
                        // this.message = data.message;
                        this.showForm = false;
                        this.submitted = false;
                    },error => {
                        this.mensagem =
                            (error.response && error.response.data && error.response.data.message) ||
                            error.mensagem ||
                            error.toString();
                        this.showForm = true;
                    });
                } else {
                    this.$nextTick(() => {
                        this.$refs.title.focus();
                    })
                }
            });
        }
    },
    computed: {
        ...mapGetters(['isLoading','accountList', 'account']),
        rows() {
            return this.accountList.length
        }
    },
    created() {
        this.accountAll()
        // this.$store.dispatch('account/fetchAll')
    }
}
</script>

<style>

</style>