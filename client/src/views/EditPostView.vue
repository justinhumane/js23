<template>
  <div class="max-w-screen-md mx-auto">
    <NavigationComp />
    <div class="p-5 rounded my-10 bg-slate-100 dark:bg-slate-800">
      <h1>Ändra inlägg</h1>
      <div>
        <FormKit
          type="form"
          submit-label="Spara inlägg"
          :submit-attrs="{
            inputClass:
              'transition duration-300 font-bold p-2 rounded bg-amber-300 hover:bg-amber-400 text-slate-700 dark:bg-sky-700 dark:hover:bg-sky-500 dark:text-slate-200 self-start',
          }"
          @submit="savePost()"
        >
          <FormKit
            type="text"
            label="Titel"
            label-class="text-sm font-bold"
            input-class="p-2 w-full rounded mb-4 bg-slate-300 dark:bg-slate-500"
            v-model="post.title"
          />
          <div class="grid grid-cols-2 gap-4">
            <FormKit
              type="select"
              label="Typ"
              :value="post.postType"
              label-class="text-sm font-bold"
              input-class="p-2 w-full rounded mb-4 bg-slate-300 dark:bg-slate-500"
              v-model="post.postType"
              :options="['Lektion', 'Klassrådsprotokoll']"
            />
            <FormKit
              type="select"
              label="Kategori"
              :value="post.category"
              label-class="text-sm font-bold"
              input-class="p-2 w-full rounded mb-4 bg-slate-300 dark:bg-slate-500"
              v-model="post.category"
              :options="[
                'HTML & CSS',
                'Javascript',
                'TypeScript',
                'Ramverk',
                'Backend',
                'Protokoll',
              ]"
            />
          </div>
          <FormKit
            type="textarea"
            label="Innehåll"
            :value="post.content"
            rows="10"
            label-class="text-sm font-bold"
            input-class="p-2 w-full rounded mb-4 bg-slate-300 dark:bg-slate-500"
            v-model="post.content"
          />
          <label class="text-sm font-bold">Taggar</label>
          <vue3-tags-input
            :tags="post.tags"
            id="tags"
            @on-tags-changed="handleChangeTag"
          />
          <h3 class="col-span-5">Lägg till ny länk</h3>
          <div class="grid grid-cols-5 gap-4 mb-6">
            <FormKit
              type="text"
              label="Titel"
              placeholder=""
              outer-class="col-span-2"
              label-class="text-sm font-bold"
              input-class="p-2 w-full rounded bg-slate-300 dark:bg-slate-500"
              v-model="newLink.linkTitle"
            />
            <FormKit
              type="text"
              label="URL (inklusive https://)"
              placeholder=""
              outer-class="col-span-2"
              label-class="text-sm font-bold"
              input-class="p-2 w-full rounded bg-slate-300 dark:bg-slate-500"
              v-model="newLink.linkUrl"
            />
            <div class="flex flex-col justify-end">
              <button
                @click="pushLink"
                class="transition w-full duration-300 font-bold p-2 rounded bg-amber-300 hover:bg-amber-400 text-slate-700 dark:bg-sky-700 dark:hover:bg-sky-500 dark:text-slate-200 self-start"
              >
                Spara länk
              </button>
            </div>
          </div>

          <h3>Hantera länkar</h3>
          <div class="grid grid-cols-5 gap-4">
            <div class="col-span-2 text-small font-bold">Titel</div>
            <div class="col-span-3 text-small font-bold">URL</div>
          </div>
          <div
            v-for="(link, index) in post.links"
            :key="link.index"
            :class="{ 'bg-slate-900': index % 2 }"
            class="grid grid-cols-5 gap-4 rounded p-2 mb-6"
          >
            <div class="col-span-2 flex items-center">
              {{ link.title }}
            </div>
            <div class="col-span-2 flex items-center text-ellipsis truncate">
              {{ link.url }}
            </div>
            <div class="flex flex-col justify-end">
              <button
                @click="removeLink(index)"
                class="transition w-full duration-300 text-sm font-bold p-1 rounded bg-amber-300 hover:bg-amber-400 text-slate-700 dark:bg-red-700 dark:hover:bg-sky-500 dark:text-slate-200 self-start"
              >
                Ta bort länk
              </button>
            </div>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import Api from "../services/api";
import NavigationComp from "../components/NavigationComp.vue";
import Vue3TagsInput from "vue3-tags-input";
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const post = ref({
  title: "",
  postType: "",
  content: "",
  category: "",
  tags: [],
  links: [],
  newTags: [],
});

const initialNewLinkState = {
  linkTitle: "",
  linkUrl: "",
};

const newLink = reactive(initialNewLinkState);

const pushLink = (e) => {
  e.preventDefault();
  console.log(newLink);
  post.value.links.push({ title: newLink.linkTitle, url: newLink.linkUrl });
  Object.assign(newLink, initialNewLinkState);
};

const removeLink = (index) => {
  post.value.links.splice(index, 1);
};

onMounted(async () => {
  const response = await axios.get("/api/post/" + route.params.id);
  post.value = response.data;
});

const handleChangeTag = (newTags) => {
  post.tags = newTags;
};

const savePost = () => {
  Api.put("/post/edit/" + route.params.id, {
    title: post.value.title,
    postType: post.value.postType,
    content: post.value.content,
    category: post.value.category,
    tags: post.value.tags,
    links: post.value.links,
  });
};
</script>

<style scoped>
.v3ti {
  @apply p-2 w-full rounded mb-4 bg-slate-300 dark:bg-slate-500 border-0;
}
</style>
