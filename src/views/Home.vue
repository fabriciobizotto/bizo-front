<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Cervejas</h3>
      <b-list-group>
        <b-list-group-item v-for="beer in content" :key="beer.id">
          {{beer.name}} - {{beer.abv}}
        </b-list-group-item>
      </b-list-group>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>

<style scoped>
header.jumbotron {
  padding: 1rem 2rem;
}
</style>