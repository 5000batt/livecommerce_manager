import Vue from 'vue'
import VueRouter from 'vue-router'
import Broadcast from '../views/Broadcast.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Broadcast',
    component: Broadcast
  },
  {
    path: '/Recording',
    name: 'Recording',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Recording.vue')
  },
  {
    path: '/Guide',
    name: 'Guide',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Guide.vue')
  },
  {
    path: '/RecordingScreen/:videoId',
    name: 'RecordingScreen',
    component: () => import('../views/RecordingScreen.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
