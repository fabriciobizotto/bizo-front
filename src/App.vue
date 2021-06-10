<template>
  <div id="app">
    <header>
      <Navbar />
      <Messages />
    </header>
    
    <b-container fluid="lg">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Messages from './components/messages.vue'
import Navbar from './components/header/Navbar.vue'
export default {
  components: {Messages, Navbar}
};
</script>
