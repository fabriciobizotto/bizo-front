<template>
  <div>
      <h1>Accounts</h1>
        <p>{{lista}}</p>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Account',
    methods: {
        ...mapActions(['fetchAll'])
    },
    computed: 
        mapGetters(['account/accountList'])
    
        // lista() {
        //     return this.$store.state.account.accounts
        // }
    
    ,
    created() {
        this.fetchAll()
        // this.$store.dispatch('account/fetchAll')
    }
}
</script>

<style>

</style>