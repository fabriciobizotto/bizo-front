<template>
  <div class="container" v-if="isLoggedIn">
    <header class="jumbotron p-3 mb-2 mt-2">
      <h3 class="text-center">
        <strong>{{currentUser.first_name}}</strong>
      </h3>
      <!-- <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p> -->
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <!-- <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul> -->
    <p v-show="currentUser.must_change_password" class="mt-3 alert alert-danger">Aviso: Recomenda-se criar uma senha mais forte</p>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>