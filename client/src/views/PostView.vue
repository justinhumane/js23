<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />
    <div>
      <PostComp
        :key="post._id"
        :id="post._id"
        :title="post.title"
        :type="post.postType"
        :category="post.category"
        :tags="post.tags"
        :content="post.content"
        :links="post.links"
        :createdAt="post.createdAt"
        :comments="post.comments"
      />
      <div class="p-5 rounded my-10 bg-slate-100 dark:bg-slate-800">
        <h3 class="mb-2">Skriv en kommentar</h3>
        <FormKit
          type="form"
          submit-label="Publicera kommentar"
          :submit-attrs="{
            inputClass:
              'transition duration-300 font-bold p-2 rounded bg-amber-300 hover:bg-amber-400 text-slate-700 dark:bg-sky-700 dark:hover:bg-sky-500 dark:text-slate-200 self-start',
          }"
          @submit="saveComment()"
        >
          <FormKit
            type="textarea"
            placeholder=""
            rows="3"
            label-class="text-sm font-bold"
            input-class="p-2 w-full rounded mb-4 bg-slate-300 dark:bg-slate-500"
            v-model="comment.content"
          />
        </FormKit>
      </div>
      <CommentComp :comments="comments" />
    </div>
    <FooterComp />
  </div>
</template>

<script setup>
import Api from "../services/api";
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import NavigationComp from "../components/NavigationComp.vue";
import PostComp from "../components/PostComp.vue";
import CommentComp from "../components/CommentComp.vue";
import FooterComp from "../components/FooterComp.vue";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();
const user = store.state.user;

const post = ref({
  _id: "",
  title: "",
  postType: "",
  content: "",
  category: "",
  tags: [],
  links: [],
  newTags: [],
  comments: [],
});

const comments = ref([]);

const comment = reactive({
  content: "",
  user: user._id,
  post: route.params.id,
});

onMounted(async () => {
  const fetchedPost = await axios.get("/api/post/" + route.params.id);
  post.value = fetchedPost.data;
  const fetchedComments = await axios.get(
    `/api/comment/post/${route.params.id}`
  );
  comments.value = fetchedComments.data;
});

const saveComment = async () => {
  try {
    await Api.post("/comment/new", {
      content: comment.content,
      user: comment.user,
      post: comment.post,
    });
    router.push(`/post/${route.params.id}`);
  } catch (err) {
    console.error(err);
  }
};
</script>
