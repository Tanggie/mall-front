import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index,
          // meta: {
          //   keepAlive: true
          // }
        },
        {
          path: '/product/:id',
          name: 'product',
          component: () => import('./pages/product.vue'),
          // meta: {
          //   keepAlive: true
          // }
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: () => import('./pages/detail.vue'),
        },
        {
          path: '/seckill/:id',
          name: 'seckill',
          meta: { requireAuth: true },
          component: () => import('./pages/seckill.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./pages/search.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./pages/test.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./pages/register.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./pages/cart.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/order',
      name: 'order',
      meta: { requireAuth: true },
      component: () => import('./pages/order.vue'),
      children: [
        {
          path: 'list',
          name: 'order-list',
          component: () => import('./pages/orderList.vue'),
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: () => import('./pages/orderConfirm.vue'),
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: () => import('./pages/orderPay.vue'),
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: () => import('./pages/alipay.vue'),
        },
      ],
    },
  ],
})
