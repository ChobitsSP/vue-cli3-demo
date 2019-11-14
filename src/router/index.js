import Vue from "vue";
import Router from "vue-router";
import store from "../store";

import Table from "../views/Table/router";
import Form from "../views/Form/router";
import Common from "../views/Common/router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: resolve => require(["../components/Home.vue"], resolve),
    children: [
      ...Table,
      ...Form,
      {
        name: "Charts",
        path: "Charts",
        component: resolve => require(["../views/Charts/Index.vue"], resolve)
      }
    ]
  },
  ...Common
];

const router = new Router({
  base: process.env.BASE_URL,
  mode: process.env.VUE_APP_BUILD === "mui" ? "hash" : "history",
  routes
});

router.beforeEach(async (route, redirect, next) => {
  document.title = route.meta.title || "element-demo";

  if (route.meta.noauth) {
    next();
    return;
  }

  const flag = await store.dispatch("GetUserInfo");

  if (flag) {
    next();
  } else {
    store.dispatch("logout");
  }
});

export default router;
