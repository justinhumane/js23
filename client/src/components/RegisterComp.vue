<template>
  <div class="p-10 rounded-b bg-slate-100 dark:bg-slate-700">
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
        label="Förnamn"
        placeholder="Anders"
        label-class="text-sm font-bold"
        input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
        v-model="credentials.firstName"
      />
      <FormKit
        type="text"
        label="Efternamn"
        placeholder="Svensson"
        label-class="text-sm font-bold"
        input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
        v-model="credentials.lastName"
      />
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
import Api from "../services/api";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const router = useRouter();
const toast = useToast();

const credentials = reactive({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
});

const register = () => {
  Api.post("/users/register", {
    firstName: credentials.firstName,
    lastName: credentials.lastName,
    email: credentials.email,
    password: credentials.password,
  })
    .then(() => {
      toast.success("Registration succeeded!", {
        position: "bottom-left",
        duration: 1000,
      });
      router.push("/login");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Registration failed!", {
        position: "bottom-left",
        duration: 1000,
      });
    });
};
</script>
