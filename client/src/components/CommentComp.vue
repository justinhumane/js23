<template>
  <div class="bg-slate-100 dark:bg-slate-800 rounded sticky p-5 mt-10">
    <h3 class="flex">
      {{ comments.length }} kommentar<span v-if="comments.length != 1">er</span>
    </h3>
    <div
      v-for="(comment, index) in comments"
      :key="comment.index"
      class="mt-5 p-5 rounded"
      :class="{ 'dark:bg-slate-700 bg-slate-200': index % 2 }"
    >
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2 font-bold">
          <img
            src="https://avatars.githubusercontent.com/u/86984290?v=4"
            class="w-8 h-8 rounded-full"
            alt=""
          />
          {{ comment.user.username }}
        </div>
        <div class="font-mono">
          {{ dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm") }}
        </div>
      </div>
      <div class="mt-4">
        <p class="mb-0">
          {{ comment.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";

defineProps({
  comments: Array,
});
</script>
