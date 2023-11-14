<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />

    <div class="p-5 rounded my-10 bg-slate-100 dark:bg-slate-800">
      <h1 class="mb-2">Inställningar</h1>
      <h3>Ändra användarinformation</h3>
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
      <h3 class="mt-4">Ändra lösenord</h3>
      <FormKit
        type="form"
        submit-label="Spara lösenord"
        :submit-attrs="{
          inputClass:
            'transition duration-300 font-bold p-2 rounded bg-amber-300 hover:bg-amber-400 text-slate-700 dark:bg-sky-700 dark:hover:bg-sky-500 dark:text-slate-200',
        }"
        @submit="savePassword()"
      >
        <FormKit
          type="text"
          label="Ditt gamla lösenord"
          label-class="text-sm font-bold"
          input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
          v-model="password.oldPassword"
        />
        <FormKit
          type="text"
          label="Nytt lösenord"
          label-class="text-sm font-bold"
          input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
          v-model="password.newPassword"
        />
        <FormKit
          type="text"
          label="Bekräfta lösenord"
          label-class="text-sm font-bold"
          input-class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
          v-model="password.confirmationPassword"
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
  firstName: store.state.user.firstName,
  lastName: store.state.user.lastName,
  email: store.state.user.email,
});

const password = ref({
  oldPassword: "",
  newPassword: "",
  confirmationPassword: "",
});

const saveUser = async () => {
  await Api.put(`/users/edit/${store.state.user._id}`, {
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.email,
  });
};

const savePassword = async () => {
  await Api.put(`/users/edit/${store.state.user._id}/password`, {
    oldPassword: password.value.oldPassword,
    newPassword: password.value.newPassword,
    confirmationPassword: password.value.confirmationPassword,
  });
};
</script>

<style scoped></style>
