<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />
    <div>
      <div class="p-5 rounded my-10 bg-slate-100 dark:bg-slate-800">
        <time datetime="2023-10-06 12:00" class="font-mono"
          >2023-10-06 12:00</time
        >
        <h1>Responsiva sidor med CSS grid och Flexbox</h1>
        <div class="flex items-center font-bold my-2">
          Kurs
          <router-link
            to="/asd"
            class="mx-2 px-2 py-1 font-semibold rounded text-sm transition duration-300 bg-amber-300 hover:bg-amber-400 dark:bg-sky-700 dark:hover:bg-sky-900"
            >HTML & CSS</router-link
          >
        </div>

        <div class="flex items-center font-bold my-2">
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
        <div class="my-5" style="padding: 56.25% 0 0 0; position: relative">
          <iframe
            src="https://player.vimeo.com/video/858325937?h=5e84bef553&byline=0&portrait=0"
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            "
            class="rounded"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <h3 class="mb-1">Nyttiga länkar</h3>
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

      <div v-for="post in posts" :key="post._id">
        <PostComp
          :title="post.title"
          :content="post.content"
          :category="post.category"
          :tags="post.tags"
          :createdAt="post.createdAt"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavigationComp from "../components/NavigationComp.vue";
import PostComp from "../components/PostComp.vue";
export default {
  name: "HomeView",
  components: { NavigationComp, PostComp },
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    const response = await axios.get("/api/post");
    this.posts = response.data;
  },
};
</script>

<style scoped></style>
