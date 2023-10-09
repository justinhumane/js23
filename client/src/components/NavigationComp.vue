<template>
  <nav
    class="bg-slate-100 dark:bg-slate-800 flex justify-between items-center rounded sticky px-5 py-3 mb-5"
  >
    <router-link to="/">
      <h1 class="text-amber-300">JS23</h1>
    </router-link>
    <div class="flex gap-4">
      <router-link
        class="transition duration-300 hover:text-sky-700 dark:hover:text-amber-300"
        to="/lektioner"
        >Lektioner</router-link
      >
      <router-link
        class="transition duration-300 hover:text-sky-700 dark:hover:text-amber-300"
        to="/klassradsprotokoll"
        >Klassrådsprotokoll</router-link
      >
      <a
        href="https://folkuniversitetet-se.zoom.us/j/6095904719#success"
        class="transition flex items-center duration-300 hover:text-sky-700 dark:hover:text-amber-300"
        >Zoom
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          fill="currentColor"
          viewBox="0 0 512 512"
          class="ml-2"
        >
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"
          />
        </svg>
      </a>
    </div>
    <div class="relative">
      <button
        class="py-2 px-4 bg-amber-300 hover:bg-amber-400 dark:bg-sky-700 dark:hover:bg-sky-900 transition duration-300 rounded flex items-center gap-2 cursor-pointer"
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
          />
        </svg>
        {{ user.username }}
      </button>
      <div
        :class="{ 'max-h-52': menuOpen }"
        class="bg-amber-300 dark:bg-sky-700 rounded max-h-0 right-0 mt-2 transition-[max-height] duration-300 ease-in-out transform absolute overflow-hidden"
      >
        <div>
          <router-link
            v-if="user.level === 0"
            to="/post/new"
            class="my-2 px-3 flex items-center py-2 transition duration-300 hover:bg-amber-400 dark:hover:bg-sky-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle-fill mr-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
              />
            </svg>
            Nytt inlägg
          </router-link>
          <hr v-if="user.level === 0" class="mx-3" />
          <router-link
            to="/user"
            class="mt-2 px-3 flex items-center py-2 transition duration-300 hover:bg-amber-400 dark:hover:bg-sky-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-gear-fill mr-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
              />
            </svg>
            Inställningar
          </router-link>
          <a
            @click="logout"
            class="cursor-pointer flex items-center mb-2 px-3 py-2 transition duration-300 hover:bg-amber-400 dark:hover:bg-sky-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-door-open-fill mr-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"
              />
            </svg>
            Logga ut
          </a>
        </div>
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
nav {
  @apply font-bold;
}
.router-link-active {
  @apply text-sky-700 dark:text-amber-300;
}
</style>
