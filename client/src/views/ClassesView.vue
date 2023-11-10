<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />
    <div>
      <PostComp
        v-for="post in posts"
        :key="post._id"
        :id="post._id"
        :title="post.title"
        type="Lektion"
        :category="post.category"
        :tags="post.tags"
        :content="post.content"
        :links="post.links"
        :createdAt="post.createdAt"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import NavigationComp from "../components/NavigationComp.vue";
import PostComp from "../components/PostComp.vue";

const posts = ref([]);

onMounted(async () => {
  const response = await axios.get("/api/post?type=Lektion");
  posts.value = response.data;
});
</script>
