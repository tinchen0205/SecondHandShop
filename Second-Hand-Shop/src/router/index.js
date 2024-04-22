import { createRouter, createWebHistory } from 'vue-router';
import Homeview from '@/views/HomeView.vue';
//import Login from '@/login_register/login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'Home',
      component:Homeview,
    },
    {
      path: '/Login',
      name: 'Login',
      component:() =>import('../Login_Register/login.vue')
  
    },
    

  ]
})

export default router
