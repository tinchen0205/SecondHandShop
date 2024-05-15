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
    {
      path:'/register',
      name:'register',
      component:()=>import('../Login_Register/register.vue')
    },
    {
      path:'/admin',
      name: 'admin',
      component :()=>import('../views/adminView.vue')
    },
    {
      path:'/adminCustomers',
      name:'adminCustomers',
      component:()=>import ('../admin/function-pages/customers.vue')
    },
    {
      path:'/adminProducts',
      name:'adminProducts',
      component :()=>import ('../admin/function-pages/products.vue')
    }
    
  ]
})

export default router
