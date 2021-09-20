import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import("@/views/main.vue")
  },
  {
    path: "/500",
    name: "error",
    component: () => import("@/views/500.vue")
  },
  {
    path: "/**",
    redirect: "/500"
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  next()
})

export default router
