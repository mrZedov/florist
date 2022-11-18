<template>
  <div id="app">
    <div class="card">
      <TabMenu :model="items" />
    </div>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
  import { ref } from "vue";

  export default {
    setup() {
      const items = ref([
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          to: "/",
        },
        {
          label: "Sign Up",
          icon: "pi pi-fw pi-pencil",
          to: "/register",
        },
        {
          label: "Login",
          icon: "pi pi-fw pi-sign-in",
          to: "/login",
        },
      ]);
      return { items };
    },

    data() {
      return {};
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      showAdminBoard() {
        if (this.currentUser && this.currentUser["roles"]) {
          return this.currentUser["roles"].includes("ROLE_ADMIN");
        }

        return false;
      },
      showModeratorBoard() {
        if (this.currentUser && this.currentUser["roles"]) {
          return this.currentUser["roles"].includes("ROLE_MODERATOR");
        }

        return false;
      },
    },
    methods: {
      logOut() {
        this.$store.dispatch("auth/logout");
        this.$router.push("/login");
      },
    },
  };
</script>

<style scoped lang="scss">
  ::v-deep(.tabmenudemo-content) {
    padding: 2rem 1rem;
  }
</style>
