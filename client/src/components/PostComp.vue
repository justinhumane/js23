<template>
  <div class="p-5 rounded my-10 bg-slate-100 dark:bg-slate-800">
    <time datetime="2023-10-06 12:00" class="font-mono"></time>
    <h1>{{ title }}</h1>
    <div class="flex items-center font-bold my-2">
      Kurs
      <router-link
        to="/asd"
        class="mx-2 px-2 py-1 font-semibold rounded text-sm transition duration-300 bg-amber-300 hover:bg-amber-400 dark:bg-sky-700 dark:hover:bg-sky-900"
        >{{ category }}</router-link
      >
    </div>

    <div v-if="tags.length > 0" class="flex items-center font-bold my-2">
      Taggar
      <router-link
        to="/asd"
        class="ml-2 px-2 py-1 font-semibold rounded text-sm transition duration-300 text-slate-100 bg-sky-700 hover:bg-sky-900 dark:bg-amber-300 dark:text-slate-800 dark:hover:bg-amber-400"
        >Grid</router-link
      >
      <router-link
        to="/asd"
        class="ml-2 px-2 py-1 font-semibold rounded text-sm transition duration-300 text-slate-100 bg-sky-700 hover:bg-sky-900 dark:bg-amber-300 dark:text-slate-800 dark:hover:bg-amber-400"
        >Flexbox</router-link
      >
    </div>
    <p>
      {{ content }}
    </p>
    <h3 class="mb-1">Nyttiga länkar</h3>
    <a href="" class="group flex items-center font-semibold justify-start">
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
      W3 Schools om Grid
    </a>

    <a href="" class="group flex items-center font-semibold">
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
      Mozilla om Grid
    </a>
  </div>
</template>

<script>
export default {
  name: "PostComp",
  props: {
    title: String,
    category: String,
    content: String,
    tags: Array,
    createdAt: Date,
  },
};
</script>