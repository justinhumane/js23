<template>
  <div class="flex justify-center">
    <a
      @click="$emit('goToPreviousPage')"
      v-if="currentPage != 1"
      class="left px-2 py-1 bg-sky-700 mx-1 rounded font-bold"
    >
      &lt;
    </a>
    <a
      v-for="i in numberOfPages"
      @click="$emit('goToPage', i)"
      :key="i"
      class="px-2 py-1 mx-1 rounded font-bold"
      :class="[i == currentPage ? 'bg-amber-300 text-slate-800' : 'bg-sky-700']"
    >
      {{ i }}
    </a>
    <a
      @click="$emit('goToNextPage')"
      v-if="currentPage != lastPage"
      class="right px-2 py-1 bg-sky-700 mx-1 rounded font-bold"
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
