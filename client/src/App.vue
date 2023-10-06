<template>
  <div
    class="min-h-screen bg-slate-300 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
  >
    <router-view class="py-4" />
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
@import url("https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&family=Montserrat:wght@400;500;600;700;900&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;

#app {
  font-family: "Montserrat", sans-serif;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: "Arvo", serif;
  @apply font-bold;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
}

h3 {
  font-size: 1.17rem;
}

h4 {
  font-size: 1.33rem;
}

p {
  @apply mb-4;
}
</style>
