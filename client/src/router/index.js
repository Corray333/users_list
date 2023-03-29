import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../views/UserList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserList
    }
  ]
})

export default router
