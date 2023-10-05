<template>
  <div
    class="h-screen bg-slate-300 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
  >
    <router-view />
  </div>
</template>

<script>
import NavigationComp from "./components/NavigationComp.vue";

export default {
  name: "JS23",
  components: { NavigationComp },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Fira+Sans:wght@500;600;700&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;

#app {
  font-family: "Fira Sans", sans-serif;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: "Bree Serif", serif;
}
</style>