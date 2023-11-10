<template>
  <div class="flex justify-center">
    <a
      @click="$emit('goToPreviousPage')"
      v-if="currentPage != 1"
      class="left px-2 py-1 dark:bg-sky-700 bg-amber-300 mx-1 rounded font-bold"
    >
      &lt;
    </a>
    <a
      v-for="i in numberOfPages"
      @click="$emit('goToPage', i)"
      :key="i"
      class="px-2 py-1 mx-1 rounded font-bold"
      :class="[
        i == currentPage
          ? 'dark:bg-amber-300 bg-sky-700 text-slate-100 dark:text-slate-800'
          : 'dark:bg-sky-700 bg-amber-300',
      ]"
    >
      {{ i }}
    </a>
    <a
      @click="$emit('goToNextPage')"
      v-if="currentPage != lastPage"
      class="right px-2 py-1 dark:bg-sky-700 bg-amber-300 mx-1 rounded font-bold"
    >
      &gt;
    </a>
  </div>
</template>

<script setup>
defineProps({
  postCount: Number,
  numberOfPages: Number,
  currentPage: Number,
  lastPage: Number,
});

const emit = defineEmits(["goToPage", "goToNextPage", "goToPreviousPage"]);
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
