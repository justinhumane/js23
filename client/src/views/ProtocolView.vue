<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />
    <div>
      <PostComp
        v-for="post in posts.data"
        :key="post._id"
        :id="post._id"
        :title="post.title"
        type="Klassrådsprotokoll"
        :category="post.category"
        :tags="post.tags"
        :content="post.content"
        :links="post.links"
        :createdAt="post.createdAt"
      />
      <PaginationComp
        v-if="posts.max_posts < posts.post_count"
        :postCount="posts.post_count"
        :numberOfPages="posts.last_page"
        :currentPage="currentPage"
        :lastPage="posts.last_page"
        @goToPage="goToPage"
        @goToNextPage="goToNextPage"
        @goToPreviousPage="goToPreviousPage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import NavigationComp from "../components/NavigationComp.vue";
import PostComp from "../components/PostComp.vue";
import PaginationComp from "../components/PaginationComp.vue";

const posts = ref([]);
const currentPage = ref(1);

const goToPage = (page) => {
  currentPage.value = page;
};

const goToNextPage = () => {
  currentPage.value += 1;
};

const goToPreviousPage = () => {
  currentPage.value -= 1;
};

watch(
  currentPage,
  async (newPage, oldPage) => {
    const response = await axios.get("/api/post?type=Klassrådsprotokoll");
    posts.value = response.data;
  },
  { immediate: true }
);
</script>
