<template>
  <nav>
    <div class="nav-group">
      <router-link to="/">
        <div class="text-2xl font-bold text-blue-900">JS23</div>
      </router-link>
    </div>
    <div class="nav-group" v-if="!user">
      <router-link to="/login">
        <div class="login">Login</div>
      </router-link>
      <router-link to="/register">
        <div class="register">Register</div>
      </router-link>
    </div>
    <div class="nav-group" v-if="user">
      <router-link to="/user">
        <div class="login">{{ user.username }}</div>
      </router-link>
      <div @click="logout" class="register">Log out</div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationComp",
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        if (!this.isUserLoggedIn) {
          this.$toast.success("Successfully logged out.", {
            position: "bottom-left",
            duration: 1000,
          });
          await this.$router.push("/login");
        }
      } catch (e) {
        console.log(e);
        this.$toast.error("Couldn't log out.", {
          position: "bottom-left",
          duration: 1000,
        });
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
</style>