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
          Logga in
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
          Registera
        </button>
      </div>
      <div
        :class="{ hidden: !loginActive, visible: loginActive }"
        class="p-10 rounded-b bg-slate-100 dark:bg-slate-700"
      >
        <FormKit
          type="form"
          submit-label="Logga in"
          :submit-attrs="{
            inputClass:
              'transition w-full duration-300 font-bold p-2 rounded bg-amber-300 hover:bg-amber-400 text-slate-700 dark:bg-sky-700 dark:hover:bg-sky-500 dark:text-slate-200',
          }"
          @submit="login()"
        >
          <FormKit
            type="text"
            label="Email"
            placeholder="anders@svensson.se"
            label-class="text-sm font-bold"
            input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
            v-model="loginEmail"
          />
          <FormKit
            type="password"
            label="Lösenord"
            placeholder="**********"
            label-class="text-sm font-bold"
            input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
            v-model="loginPassword"
          />
        </FormKit>
      </div>
      <div
        :class="{ hidden: !registerActive, visible: registerActive }"
        class="p-10 rounded-b bg-slate-100 dark:bg-slate-700"
      >
        <FormKit
          type="form"
          submit-label="Registrera"
          :submit-attrs="{
            inputClass:
              'transition w-full duration-300 font-bold p-2 rounded bg-amber-300 hover:bg-amber-400 text-slate-700 dark:bg-sky-700 dark:hover:bg-sky-500 dark:text-slate-200',
          }"
          @submit="register()"
        >
          <FormKit
            type="text"
            label="Användarnamn"
            placeholder="anderssvensson"
            label-class="text-sm font-bold"
            input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
            v-model="registerUsername"
          />
          <FormKit
            type="text"
            label="Email"
            placeholder="anders@svensson.se"
            label-class="text-sm font-bold"
            input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
            v-model="registerEmail"
          />
          <FormKit
            type="password"
            label="Lösenord"
            placeholder="**********"
            label-class="text-sm font-bold"
            input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
            v-model="registerPassword"
          />
        </FormKit>
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
      loginEmail: "",
      loginPassword: "",
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
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
          email: this.loginEmail,
          password: this.loginPassword,
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
        username: this.registerUsername,
        email: this.registerEmail,
        password: this.registerPassword,
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
