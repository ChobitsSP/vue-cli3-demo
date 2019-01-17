const routes = [{
  path: 'Table/ClientPager',
  name: 'TableClientPager',
  component: resolve => require(['./DemoClient/Index.vue'], resolve),
  meta: {
    title: 'Table Client DemoF'
  }
}]

export default routes
