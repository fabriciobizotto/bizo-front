<template>
  <b-alert 
    class="border-0" 
    :variant="message.error ? 'danger' : 'success'" 
    :show="message.text != null"
    fade
    dismissible>
      {{message.text}}
  </b-alert>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Messages',
    computed: mapGetters(['isLoading', 'message']),
}
</script>

<style>

</style>