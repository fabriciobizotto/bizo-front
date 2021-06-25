<template>
  <b-alert
    class="border-0"
    :variant="message.error ? 'danger' : 'success'"
    :show="message.errors.length > 0"
    fade
    dismissible
  >
    <small
      class="mb-0"
      v-for="(item, index) in message.errors"
      :key="index"
    >
      {{item}}
    </small>
  </b-alert>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('BaseModule');

export default {
  name: 'Messages',
  computed: mapGetters(['isLoading', 'message']),
};
</script>

<style>
</style>