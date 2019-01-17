import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Table from '../views/Table/router'
import Form from '../views/Form/router'

Vue.use(Router)

const routes = [{
    path: '/',
    component: resolve => require(['../views/Home'], resolve),
    children: [
      ...Table,
      ...Form,
      {
        name: 'Charts',
        path: 'Charts',
        component: resolve => require(['../views/Charts/Index.vue'], resolve),
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../views/Login'], resolve),
    meta: {
      title: '登录',
      noauth: true
    }
  },
  {
    path: '*',
    name: 'error',
    component: resolve => require(['../views/Error'], resolve),
    meta: {
      title: '404',
      noauth: true
    }
  }
]

const router = new Router({
  mode: process.env.MUI === 'true' ? null : 'history',
  routes
})

router.beforeEach(async (route, redirect, next) => {
  document.title = route.meta.title || 'element-demo'

  if (route.meta.noauth) {
    next()
    return
  }

  const flag = await store.dispatch('GetUserInfo')

  if (flag) {
    next()
  } else {
    store.dispatch('logout')
  }
})

export default router