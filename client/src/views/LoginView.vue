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
      <LoginComp :class="{ hidden: !loginActive, visible: loginActive }" />
      <RegisterComp
        :class="{ hidden: !registerActive, visible: registerActive }"
      />
    </div>
  </div>
</template>

<script setup>
import LoginComp from "../components/LoginComp.vue";
import RegisterComp from "../components/RegisterComp.vue";
import { ref } from "vue";

const loginActive = ref(true);
const registerActive = ref(false);
</script>

<style scoped></style>
