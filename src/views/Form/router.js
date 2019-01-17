const routes = [
  {
    path: 'FormDemo',
    name: 'FormDemo',
    component: resolve => require(['./views/Demo/Index.vue'], resolve),
    meta: {
      title: 'Form'
    }
  }
]

export default routes
