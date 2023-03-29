import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserList from '../views/UserList.vue'
import Sort from '../views/Sort.vue'
import SendEmail from '../views/SendEmail.vue'
import CreateUser from '../views/CreateUser.vue'
import DeleteByProperty from '../views/DeleteByProperty.vue'
import ChangeByProperty from '../views/ChangeByProperty.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, 
    {
      path: '/users',
      name: 'users',
      component: UserList
    },
    {
      path: '/sort',
      name: 'Sort',
      component: Sort
    }, {
      path: '/send-email',
      name: 'SendEmail',
      component: SendEmail
    }, {
      path: '/create-user',
      name: 'CreateUser',
      component: CreateUser
    }, {
      path: '/delete-by-property',
      name: 'DeleteByProperty',
      component: DeleteByProperty
    }, {
      path: '/change-by-property',
      name: 'ChangeByProperty',
      component: ChangeByProperty
    },
  ]
})

export default router
