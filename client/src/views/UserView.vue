<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />

    <div class="p-5 rounded my-10 bg-slate-100 dark:bg-slate-800">
      <h3 class="mb-2">
        {{ store.state.user.firstName + " " + store.state.user.lastName }}
      </h3>
      <FormKit
        type="form"
        submit-label="Spara ändringar"
        :submit-attrs="{
          inputClass:
            'transition duration-300 font-bold p-2 rounded bg-amber-300 hover:bg-amber-400 text-slate-700 dark:bg-sky-700 dark:hover:bg-sky-500 dark:text-slate-200',
        }"
        @submit="saveUser()"
      >
        <FormKit
          type="text"
          label="Användarnamn"
          label-class="text-sm font-bold"
          input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
          v-model="user.username"
        />
        <FormKit
          type="text"
          label="Förnamn"
          label-class="text-sm font-bold"
          input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
          v-model="user.firstName"
        />
        <FormKit
          type="text"
          label="Efternamn"
          label-class="text-sm font-bold"
          input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
          v-model="user.lastName"
        />
        <FormKit
          type="text"
          label="Email"
          label-class="text-sm font-bold"
          input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
          v-model="user.email"
        />
      </FormKit>
    </div>
    <FooterComp />
  </div>
</template>

<script setup>
import NavigationComp from "../components/NavigationComp.vue";
import FooterComp from "../components/FooterComp.vue";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import Api from "../services/api";

const store = useStore();

const user = ref({
  username: store.state.user.username,
  firstName: store.state.user.firstName,
  lastName: store.state.user.lastName,
  email: store.state.user.email,
});

const saveUser = () => {
  Api.put(`/users/edit/${store.state.user._id}`, {
    username: user.value.username,
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.email,
  });
};
</script>

<style scoped></style>
