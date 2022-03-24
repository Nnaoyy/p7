import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  
  {
    path: '/home/profil',
    name: 'profil',
    component: () => import('../views/profilPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
