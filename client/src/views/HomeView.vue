<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />
    <div>
      <PostComp
        v-for="post in posts.data"
        :key="post._id"
        :id="post._id"
        :title="post.title"
        :type="post.postType"
        :category="post.category"
        :tags="post.tags"
        :content="post.content"
        :links="post.links"
        :createdAt="post.createdAt"
      />
    </div>
    <PaginationComp
      :postCount="posts.post_count"
      :numberOfPages="posts.last_page"
      :currentPage="currentPage"
      :lastPage="posts.last_page"
      @goToPage="goToPage"
      @goToNextPage="goToNextPage"
      @goToPreviousPage="goToPreviousPage"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUpdated } from "vue";
import axios from "axios";
import NavigationComp from "../components/NavigationComp.vue";
import PostComp from "../components/PostComp.vue";
import PaginationComp from "../components/PaginationComp.vue";

const posts = ref([]);

const currentPage = ref(1);

const fetchPosts = async () => {
  const response = await axios.get(`/api/post/?page=${currentPage.value}`);
  posts.value = response.data;
};

onMounted(() => {
  fetchPosts();
});

const goToPage = (page) => {
  currentPage.value = page;
};

const goToNextPage = () => {
  currentPage.value += 1;
};

const goToPreviousPage = () => {
  currentPage.value -= 1;
  fetchPosts();
};

watch(currentPage, async (newPage, oldPage) => {
  fetchPosts();
});
</script>

<style scoped></style>
