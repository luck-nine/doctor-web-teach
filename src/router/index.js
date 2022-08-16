import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'

const routes = [
  {
    path: "/:catchAll(.*)", //不识别的path自动匹配Page404
    //redirect: { name: "home" }
    redirect: "/"
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index'),
    meta: {
      keepAlive: false,
      login: true,
      title: '白医云·珍（医生端）'
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login')
  }
]

const router = createRouter({
  //history: createWebHashHistory(),
  history: createWebHistory(),// 去掉url中的#
  routes
})

// 全局拦截
router.beforeEach((to,from,next) => {
  console.log('全局拦截');
  console.log(to,"to");
  console.log(from,"from");
  if (to.meta.title) {
    // 这里设置header部分的title
    document.title = to.meta.title
  }
  // 验证该访问路径是否需要登录权限
  if (to.meta.login) {
    let adminToken = getToken();
    console.log(adminToken,'全局拦截中的adminToken');
    if (!adminToken) {
      next({
        path: '/login'
      })
      return
    }
  }
  next()
})

export default router
