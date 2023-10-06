<template>
  <div class="w-full h-screen flex flex-col items-center justify-center">
    <h1 class="text-6xl mb-6 font-bold text-sky-700 dark:text-amber-300">
      JS23
    </h1>
    <div class="rounded">
      <div class="rounded-t bg-slate-400 font-bold dark:bg-slate-800">
        <button
          @click="
            loginActive = true;
            registerActive = false;
          "
          :class="{
            'bg-slate-100 dark:bg-slate-700': loginActive,
            'bg-slate-400 dark:bg-slate-800 dark:text-slate-200': !loginActive,
          }"
          class="w-2/4 p-3 rounded-t"
        >
          Log in
        </button>
        <button
          @click="
            loginActive = false;
            registerActive = true;
          "
          :class="{
            'bg-slate-100 dark:bg-slate-700': registerActive,
            'bg-slate-400 dark:bg-slate-800 dark:text-slate-200':
              !registerActive,
          }"
          class="w-2/4 p-3 rounded-t"
        >
          Register
        </button>
      </div>
      <div
        :class="{ hidden: !loginActive, visible: loginActive }"
        class="p-10 rounded-b bg-slate-100 dark:bg-slate-700"
      >
        <form @submit.prevent="login()" class="flex flex-col">
          <label for="email" class="text-sm font-bold">Email</label>
          <input
            class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
            type="email"
            v-model="email"
            id="email"
            placeholder="anders@svensson.se"
            required
          />
          <label for="password" class="text-sm font-bold">Password</label>
          <input
            class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
            type="password"
            v-model="password"
            id="password"
            placeholder="*********"
            required
          />

          <button
            class="transition duration-300 font-bold p-2 rounded bg-amber-300 hover:bg-amber-400 text-slate-700 dark:bg-sky-700 dark:hover:bg-sky-500 dark:text-slate-200"
          >
            Login
          </button>
        </form>
      </div>
      <div
        :class="{ hidden: !registerActive, visible: registerActive }"
        class="p-10 rounded-b bg-slate-100 dark:bg-slate-700"
      >
        <form @submit.prevent="register" class="flex flex-col">
          <label for="username" class="text-sm font-bold">Username</label>
          <input
            class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
            type="text"
            v-model="username"
            id="username"
            placeholder="anderssvensson"
            required
          />
          <label for="email" class="text-sm font-bold">Email</label>
          <input
            class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
            type="email"
            v-model="email"
            id="email"
            placeholder="anders@svensson.se"
            required
          />
          <label for="password" class="text-sm font-bold">Password</label>
          <input
            class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
            type="password"
            v-model="password"
            id="password"
            placeholder="*********"
            required
          />

          <button
            class="transition duration-300 font-bold p-2 rounded bg-amber-300 hover:bg-amber-400 text-slate-700 dark:bg-sky-700 dark:hover:bg-sky-500 dark:text-slate-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../services/api";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      loginActive: true,
      registerActive: false,
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.state.userLoggedIn;
    },
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        if (this.isUserLoggedIn) {
          this.$toast.success("Authentication succeeded.", {
            position: "bottom-left",
            duration: 1000,
          });
          await this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
        this.$toast.error(`Authentication failed! Error: ${err}`, {
          position: "bottom-left",
          duration: 1000,
        });
      }
    },
    register() {
      Api.post("/users/register", {
        username: this.username,
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.$toast.success("Registration succeeded!", {
            position: "bottom-left",
            duration: 1000,
          });
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Registration failed!", {
            position: "bottom-left",
            duration: 1000,
          });
        });
    },
  },
};
</script>

<style scoped></style>
