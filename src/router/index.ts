import { getComments, getLinks, LinksSort } from "@/api/reddit";
import { useProgress } from "@/axios";
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";

function validateSort(to: RouteLocationNormalized) {
  if (
    typeof to.params.sort !== "string" ||
    !Object.values<string>(LinksSort).includes(to.params.sort)
  ) {
    return `/r/${to.params.subreddit}`;
  }
}

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  // },
  // { path: "/", redirect: () => "/r/Animewallpaper" },
  {
    path: "/r/:subreddit",
    redirect: ({ params }) => `/r/${params.subreddit}/${LinksSort.new}`,
  },
  {
    path: "/r/:subreddit/:sort",
    name: "Subreddit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Subreddit.vue"),
    // beforeEnter: [validateSort],
    meta: {
      fetch: (to: RouteLocationNormalized) =>
        getLinks({
          subreddit: to.params.subreddit as string,
          sort: to.params.sort as LinksSort,
          ...to.query,
        }),
    },
  },
  {
    meta: {
      fetch: (to: RouteLocationNormalized) =>
        getComments({
          subreddit: to.params.subreddit as string,
          article: to.params.article as string,
        }),
    },
    path: "/comments/r/:subreddit/:article",
    name: "Comments",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "comments" */ "../views/Comments.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    const progress = useProgress();

    // Start the route progress bar.
    progress.start();
  }
  next();
});

router.afterEach((to, from) => {
  const progress = useProgress();
  // Complete the animation of the route progress bar.
  progress.done();
});

router.beforeResolve(async (to) => {
  if (typeof to.meta.fetch === "function") {
    to.meta.data = await to.meta.fetch(to);
  }
});
