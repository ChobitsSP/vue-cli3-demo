export default [
  {
    path: "/login",
    name: "login",
    component: resolve => require(["./Login.vue"], resolve),
    meta: {
      title: "登录",
      noauth: true
    }
  },
  {
    path: "*",
    name: "error",
    component: resolve => require(["./Error.vue"], resolve),
    meta: {
      title: "404",
      noauth: true
    }
  }
];
