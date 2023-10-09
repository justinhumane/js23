<template>
  <div class="p-10 rounded-b bg-slate-100 dark:bg-slate-700">
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
        v-model="credentials.email"
      />
      <FormKit
        type="password"
        label="Lösenord"
        placeholder="**********"
        label-class="text-sm font-bold"
        input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
        v-model="credentials.password"
      />
    </FormKit>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const store = useStore();
const router = useRouter();
const toast = useToast();

const credentials = reactive({
  email: "",
  password: "",
});

const isUserLoggedIn = computed(() => {
  return store.state.userLoggedIn;
});

const login = async () => {
  try {
    await store.dispatch("login", {
      email: credentials.email,
      password: credentials.password,
    });
    if (isUserLoggedIn.value) {
      toast.success("Authentication succeeded.", {
        position: "bottom-left",
        duration: 10000,
      });
      await router.push("/");
    }
  } catch (err) {
    console.log(err);
    toast.error(`Authentication failed! Error: ${err}`, {
      position: "bottom-left",
      duration: 1000,
    });
  }
};
</script>