import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import store from "../services/store";
import UserView from "../views/UserView.vue";
import NewPostView from "../views/NewPostView.vue";
import EditPostView from "../views/EditPostView.vue";
import ClassesView from "../views/ClassesView.vue";
import ProtocolView from "../views/ProtocolView.vue";
import PostView from "../views/PostView.vue";
import CategoryView from "../views/CategoryView.vue";
import TagView from "../views/TagView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "JS23",
      authRequired: true,
      authForbidden: false,
      requireAdmin: false,
      requireApproved: true,
    },
  },
  {
    path: "/lektioner",
    name: "lektioner",
    component: ClassesView,
    meta: {
      title: "JS23 - lektioner",
      authRequired: true,
      authForbidden: false,
      requireAdmin: false,
      requireApproved: true,
    },
  },
  {
    path: "/klassradsprotokoll",
    name: "klassradsprotokoll",
    component: ProtocolView,
    meta: {
      title: "JS23 - klassrådsprotokoll",
      authRequired: true,
      authForbidden: false,
      requireAdmin: false,
      requireApproved: true,
    },
  },
  {
    path: "/category/:category",
    name: "category",
    component: CategoryView,
    meta: {
      title: "Kategori",
      authRequired: true,
      authForbidden: false,
      requireAdmin: false,
      requireApproved: true,
    },
  },
  {
    path: "/tag/:tag",
    name: "tag",
    component: TagView,
    meta: {
      title: "Tagg",
      authRequired: true,
      authForbidden: false,
      requireAdmin: false,
      requireApproved: true,
    },
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Login",
      authRequired: false,
      authForbidden: true,
      requireAdmin: false,
      requireApproved: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      title: "Register",
      authRequired: false,
      authForbidden: true,
      requireAdmin: false,
      requireApproved: false,
    },
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    meta: {
      title: "User profile",
      authRequired: true,
      authForbidden: false,
      requireAdmin: false,
      requireApproved: false,
    },
  },
  {
    path: "/post/new",
    name: "newPost",
    component: NewPostView,
    meta: {
      title: "Create New Post",
      authRequired: true,
      authForbidden: false,
      requireAdmin: true,
      requireApproved: true,
    },
  },
  {
    path: "/post/edit/:id",
    name: "editPost",
    component: EditPostView,
    meta: {
      title: "Edit Post",
      authRequired: true,
      authForbidden: false,
      requireAdmin: true,
      requireApproved: true,
    },
  },
  {
    path: "/post/:id",
    name: "viewPost",
    component: PostView,
    meta: {
      title: "Post",
      authRequired: true,
      authForbidden: false,
      requireAdmin: false,
      requireApproved: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// routes protection
router.beforeEach(async (to, from, next) => {
  // update store if needed
  if (!store.state.isStoreUpdated) {
    await store.dispatch("updateStore");
  }

  // control routes
  const isAuthenticated = store.state.userLoggedIn;
  const isAdmin = store.state.userIsAdmin;
  const isApproved = store.state.userIsApproved;
  if (!isAuthenticated && to.meta.authRequired) {
    next({ name: "login" });
  } else if (isAuthenticated && to.meta.authForbidden) {
    next({ name: "user" });
  } else if (!isAdmin && to.meta.requireAdmin) {
    next({ name: "home" });
  } else if (!isApproved && to.meta.requireApproved) {
    next({ name: "user" });
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
