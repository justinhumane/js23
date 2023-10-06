<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />
    <div>
      <div class="p-5 rounded my-10 bg-slate-100 dark:bg-slate-800">
        <h1>Skapa nytt inlägg</h1>
        <div>
          <form @submit.prevent="save" class="flex flex-col">
            <label for="title" class="text-sm font-bold">Titel</label>
            <input
              class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
              type="text"
              v-model="title"
              id="title"
              placeholder="Titel"
              required
            />
            <label for="content" class="text-sm font-bold">Innehåll</label>
            <textarea
              class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500"
              v-model="content"
              id="content"
              cols="30"
              rows="10"
            ></textarea>
            <label for="category" class="text-sm font-bold">Kategori</label>
            <select
              v-model="category"
              class="p-2 rounded mb-4 bg-slate-300 dark:bg-slate-500 self-start"
              id="category"
              required
            >
              <option value="" disabled></option>
              <option value="htmlcss">HTML & CSS</option>
              <option value="js">JavaScript</option>
              <option value="ts">TypeScript</option>
              <option value="framework">Ramverk</option>
              <option value="backend">Backend</option>
              <option value="protocol">Protokoll</option>
            </select>
            <button
              class="transition duration-300 font-bold p-2 rounded bg-amber-300 hover:bg-amber-400 text-slate-700 dark:bg-sky-700 dark:hover:bg-sky-500 dark:text-slate-200 self-start"
            >
              Spara
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "../services/api";
import NavigationComp from "../components/NavigationComp.vue";
export default {
  name: "NewPostView",
  components: { NavigationComp },
  data() {
    return {
      title: "",
      content: "",
      category: "",
      tags: [],
    };
  },
  methods: {
    save() {
      Api.post("/post/new", {
        title: this.title,
        content: this.content,
        category: this.category,
        tags: this.tags,
      })
        .then(() => {
          this.$toast.success("Registration succeeded!", {
            position: "bottom-left",
            duration: 1000,
          });
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Registration failed!", {
            position: "bottom-left",
            duration: 1000,
          });
        });
    },
  },
};
</script>