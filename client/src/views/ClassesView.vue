<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />
    <div>
      <PostComp
        v-for="post in posts.data"
        :key="post._id"
        :id="post._id"
        :title="post.title"
        type="Lektion"
        :category="post.category"
        :categorySlug="post.categorySlug"
        :tags="post.tags"
        :content="post.content"
        :links="post.links"
        :createdAt="post.createdAt"
        :comments="post.comments"
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
    <FooterComp />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Api from "../services/api";
import NavigationComp from "../components/NavigationComp.vue";
import PostComp from "../components/PostComp.vue";
import PaginationComp from "../components/PaginationComp.vue";
import FooterComp from "../components/FooterComp.vue";

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
    const response = await Api.get(`/post/?type=Lektion&page=${currentPage}`);
    posts.value = response.data;
  },
  {
    immediate: true,
  }
);
</script>
