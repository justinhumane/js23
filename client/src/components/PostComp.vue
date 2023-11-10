<template>
  <div class="p-5 rounded my-10 bg-slate-100 dark:bg-slate-800">
    <div class="flex justify-between">
      <p class="mb-0 font-mono">{{ type }}</p>
      <time datetime="2023-10-06 12:00" class="font-mono">{{
        dayjs(createdAt).format("YYYY-MM-DD HH:mm")
      }}</time>
    </div>
    <h1>{{ title }}</h1>
    <div
      v-if="type === 'Lektion'"
      class="flex items-center font-bold mt-2 mb-4"
    >
      Kurs
      <router-link
        to="/asd"
        class="mx-2 px-2 py-1 font-semibold rounded text-sm transition duration-300 bg-amber-300 hover:bg-amber-400 dark:bg-sky-700 dark:hover:bg-sky-900"
        >{{ category }}</router-link
      >
    </div>

    <div
      v-if="tags.length > 0 && type === 'Lektion'"
      class="flex items-center font-bold my-4"
    >
      Taggar
      <router-link
        v-for="tag in tags"
        :key="tag"
        to="/asd"
        class="ml-2 px-2 py-1 font-semibold rounded text-sm transition duration-300 text-slate-100 bg-sky-700 hover:bg-sky-900 dark:bg-amber-300 dark:text-slate-800 dark:hover:bg-amber-500"
        >{{ tag }}</router-link
      >
    </div>
    <div class="mb-2 content" v-html="content"></div>
    <div v-if="links.length > 0">
      <h3 class="mb-1">Nyttiga länkar</h3>
      <a
        v-for="link in links"
        :key="link.index"
        :href="link.url"
        class="group flex items-center font-semibold hover:text-amber-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-right mr-2 group-hover:ml-1 group-hover:mr-1 transition-all"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
        {{ link.title }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          fill="currentColor"
          viewBox="0 0 512 512"
          class="ml-2"
        >
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"
          />
        </svg>
      </a>
    </div>
    <div v-if="user.level === 0" class="mt-4">
      <router-link :to="`/post/edit/${id}`" v-slot="{ href, navigate }">
        <button
          :href="href"
          @click="navigate"
          class="text-sm font-semibold transition duration-300 py-1 px-2 rounded-l text-slate-100 bg-emerald-700 hover:bg-emerald-900"
        >
          Editera
        </button></router-link
      >
      <button
        @click="deletePost"
        class="text-sm font-semibold transition duration-300 py-1 px-2 rounded-r text-slate-100 bg-red-600 hover:bg-red-900"
      >
        Ta bort
      </button>
    </div>
  </div>
</template>

<script setup>
import Api from "../services/api";
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

defineProps({
  id: String,
  title: String,
  type: String,
  category: String,
  tags: Array,
  content: String,
  links: Array,
  createdAt: String,
});

const deletePost = () => {
  Api.delete("/post/" + route.params.id);
};

const user = store.state.user;
</script>
