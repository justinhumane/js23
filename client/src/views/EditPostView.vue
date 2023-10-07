<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />
    <div class="p-5 rounded my-10 bg-slate-100 dark:bg-slate-800"></div>
  </div>
</template>

<script>
import axios from "axios";
import Api from "../services/api";
import NavigationComp from "../components/NavigationComp.vue";
import Vue3TagsInput from "vue3-tags-input";
export default {
  name: "EditPostView",
  components: {
    NavigationComp,
    Vue3TagsInput,
  },
  data() {
    return {
      post: [],
    };
  },
  async mounted() {
    const response = await axios.get("/api/post/" + this.$route.params.id);
    this.post = response.data;
  },
};
</script>