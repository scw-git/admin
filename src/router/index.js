import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'

  }, {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    redirect: '/index/userInfo',
    children: [
      {
        path: 'userInfo',
        name: 'userInfo',
        component: () => import('../views/body/components/userInfo.vue')
      },
      {
        path: 'productType',
        name: 'productType',
        component: () => import('../views/body/components/productType.vue')
      },
      {
        path: 'productLists',
        name: 'productLists',
        component: () => import('../views/body/components/productLists.vue')
      },
      {
        path: 'orderLists',
        name: 'orderLists',
        component: () => import('../views/body/components/orderLists.vue')
      }

    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
