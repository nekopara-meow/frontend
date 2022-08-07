import {createRouter, createWebHashHistory} from 'vue-router'
import { stringifyQuery, parseQuery } from "../utils/query";
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    path: '/changepassword',
    name: 'changepassword',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ChangePassword.vue')
  },
  {
    path: '/teamdetail',
    name: 'teamdetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamDetail.vue')
  },{
    path: '/personalspace',
    name: 'personalspace',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonalSpace.vue')
  },
  {
    path: '/projectdetail',
    name: 'projectdetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProjectDetail.vue')
  },
  {
    path: '/workspace',
    name: 'workspace',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Workspace.vue')
  },
  {
    path: '/axure',
    name: 'axure',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Axure.vue')
  },
  {
    path: '/login',
    name: 'login',
    // zroute level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/recent',
    name: 'recent',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Recent.vue')
  },
  {
    path: '/team',
    name: 'team',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamView.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Calendar.vue')
  },
  {
    path: '/confirm',
    name: 'confirm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Confirm.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: ()=>import('../components/UMLEditor')
  },
  {
    path: '/editor',
    name: 'editor',
    component: ()=>import('../components/Tiptap')
  },
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/:pathMatch(.*)*", //匹配未定义的路由
    redirect: "/404", //重定向
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  //stringifyQuery: stringifyQuery,
 // parseQuery: parseQuery,
  routes
})
/*router.beforeEach((to, from, next) => {
  if (to.path === '/login'||'/register') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/Login')
    } else {
      next()
    }
  }
})*/

export default router
