<template>
  <div>
      <h1>Accounts</h1>
      <b-overlay :show="isLoading" rounded="sm">
          <b-table striped :items="accountList" :fields="fields">
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
          </b-table>
      </b-overlay>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Account',
    data() {
      return {
        fields: [
            {key: 'title', sortable: true},
            {key: 'active', sortable: true},
            {key: 'investment', sortable: true},
        ],
      }
    },
    methods: {
        ...mapActions(['accountAll', 'updateAccount'])
    },
    computed: {
        ...mapGetters(['isLoading','accountList'])
    },
    created() {
        this.accountAll()
        // this.$store.dispatch('account/fetchAll')
    }
}
</script>

<style>

</style>