<template>
  <nav
    class="bg-slate-800 flex justify-between items-center rounded sticky px-5 py-3 mb-5"
  >
    <router-link to="/">
      <div class="text-2xl text-slate-200 font-bold">JS23</div>
    </router-link>
    <div class="flex gap-4">
      <router-link
        class="transition duration-300 dark:hover:text-amber-300"
        to="/"
        >Hem</router-link
      >
      <router-link
        class="transition duration-300 dark:hover:text-amber-300"
        to="/asd"
        >Hem</router-link
      >
      <router-link
        class="transition duration-300 dark:hover:text-amber-300"
        to="/asd"
        >Hem</router-link
      >
    </div>
    <!--     <div class="flex gap-4" v-if="user">
      <router-link to="/user">
        <div class="login">{{ user.username }}</div>
      </router-link>
      <a @click="logout" class="cursor-pointer">Log out</a>
    </div> -->
    <div class="relative">
      <button
        class="py-2 px-4 bg-amber-700 rounded flex items-center gap-2 cursor-pointer"
        @click="menuOpen = !menuOpen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-person-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          /></svg
        >{{ user.username }}
      </button>
      <div
        :class="{ 'max-h-52': menuOpen }"
        class="bg-amber-700 rounded-b max-h-0 rounded-tl right-0 mt-2 transition-[max-height] duration-300 ease-in-out transform absolute overflow-hidden"
      >
        <ul>
          <li class="my-1 px-3 py-1">Inställningar</li>
          <li class="my-1 px-3 py-1">Logga ut</li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationComp",
  data() {
    return {
      menuOpen: false,
    };
  },
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
.router-link-active {
  @apply dark:text-amber-300;
}
</style>