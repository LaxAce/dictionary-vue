import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import WordView from "../views/WordView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:word",
    name: "word",
    component: WordView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
