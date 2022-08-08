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
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChangePassword.vue')
  },
  {
    path: '/teamdetail',
    name: 'teamdetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamDetail.vue')
  },{
    path: '/personalspace',
    name: 'personalspace',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonalSpace.vue')
  },
  {
    path: '/projectdetail',
    name: 'projectdetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProjectDetail.vue'),
    children:[
      // {
      //   path:'',
      //   redirect:'/projectdetail/projectInfo'
      // },
      {
        path:'projectInfo',
        name:'projectInfo',
        component:()=>import('../views/projectInfo')
      },
      {
        path:'projectFileInfo',
        name:'projectFileInfo',
        component:()=>import('../views/projectFileInfo')
      },
    ],
  },
  {
    path: '/UmlDrawer',
    name: 'UmlDrawer',
    component: () => import(/* webpackChunkName: "about" */ '../components/file_componets/UmlDrawer.vue')
  },
  {
    path: '/DocEditor',
    name: 'DocEditor',
    component: () => import(/* webpackChunkName: "about" */ '../components/file_componets/DocEditor.vue')
  },
  {
    path: '/workspace',
    name: 'workspace',
    component: () => import(/* webpackChunkName: "about" */ '../views/Workspace.vue')
  },
  {
    path: '/axure',
    name: 'axure',
    component: () => import(/* webpackChunkName: "about" */ '../views/Axure.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/recent',
    name: 'recent',
    component: () => import(/* webpackChunkName: "about" */ '../views/Recent.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamView.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Calendar.vue')
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: () => import(/* webpackChunkName: "about" */ '../views/Confirm.vue')
  },
  {
    path: '/editor',
    name: 'editor',
    component: ()=>import('../components/rubbish/Tiptap')
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
