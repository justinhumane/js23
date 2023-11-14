<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />

    <div class="p-5 rounded my-10 bg-slate-100 dark:bg-slate-800">
      <h1 class="mb-2">Godkänn användare</h1>
      <div
        v-for="(user, index) in users"
        class="mb-3 class flex justify-between items-center p-5 rounded"
        :class="{ 'dark:bg-slate-700 bg-slate-200': index % 2 }"
      >
        <div>{{ user.firstName }} {{ user.lastName }}</div>
        <div>
          <button
            class="font-semibold transition duration-300 py-1 px-2 rounded text-slate-100 bg-emerald-700 hover:bg-emerald-900"
            @click="approveUser(user._id)"
          >
            Godkänn användare
          </button>
        </div>
      </div>
    </div>
    <FooterComp />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import NavigationComp from "../components/NavigationComp.vue";
import FooterComp from "../components/FooterComp.vue";
import Api from "../services/api";

const users = ref([]);

onMounted(async () => {
  const response = await Api.get("/users/unapproved");
  users.value = response.data;
});

const approveUser = (id) => {
  Api.put("/users/approve/" + id);
};
</script>
