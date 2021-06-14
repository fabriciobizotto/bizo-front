<template>
  <b-navbar
    toggleable="sm"
    type="light"
    variant="light"
  >
    <b-navbar-brand
      @click.prevent
      to="home"
    >BizoCash</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>

    <b-collapse
      id="navbar-toggle-collapse"
      is-nav
    >
      <b-navbar-nav class="mr-auto">

        <b-nav-item
          to="admin"
          v-if="showAdminBoard"
        >
          <font-awesome-icon icon="user-lock" /> Admin
        </b-nav-item>

        <b-nav-item
          to="user"
          v-if="currentUser"
        >
          <font-awesome-icon icon="user" /> User
        </b-nav-item>

        <b-nav-item
          to="accounts"
          v-if="currentUser"
        >
          <font-awesome-icon icon="file-invoice" /> Contas
        </b-nav-item>

        <b-nav-item
          to="tags"
          v-if="currentUser"
        >
          <font-awesome-icon icon="tags" /> Tags
        </b-nav-item>

        <b-nav-item
          to="categories"
          v-if="currentUser"
        >
          <font-awesome-icon icon="file-invoice" /> Categorias
        </b-nav-item>

      </b-navbar-nav>
    </b-collapse>
    <b-navbar-nav
      class="ml-auto"
      v-if="!currentUser"
    >

      <b-nav-item-dropdown right>
        <template #button-content>
          <em>User</em>
        </template>

        <b-dropdown-item
          href
          to="register"
        >
          <font-awesome-icon icon="user-plus" />Sign Up
        </b-dropdown-item>

        <b-dropdown-item
          href
          to="login"
        >
          <font-awesome-icon icon="sign-in-alt" />Login
        </b-dropdown-item>

      </b-nav-item-dropdown>
    </b-navbar-nav>
    <b-navbar-nav
      class="ml-auto"
      v-if="currentUser"
    >
      <b-nav-item-dropdown right>
        <template #button-content>
          <em>{{ currentUser.email }}</em>
        </template>

        <b-dropdown-item
          href
          @click.prevent="logOut"
        >
          <font-awesome-icon icon="sign-out-alt" /> LogOut
        </b-dropdown-item>

        <b-dropdown-item
          to="profile"
          href
        >
          <font-awesome-icon icon="user" />
          Perfil
        </b-dropdown-item>

      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    currentUser() {
      console.log(this.$store.state.auth);
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style></style>
