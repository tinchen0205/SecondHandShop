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
    },
    {
      path:'/profile',
      name:'profile',
      component :()=>import ('../users/profile.vue')
    },
    {
      path:'/cart',
      name:'cart',
      component :()=>import('../users/cart.vue')
    },
    {
      path:'/keywordsearch',
      name:'keywordsearch',
      component :()=>import('../search/keywordsearch.vue')
    },
    {
      path:'/category/:categoryName',
      name:'Category',
      component :()=>import('../search/categorypage.vue')
    },
    {
      path:'/aboutus',
      name:'aboutus',
      component :()=>import('../pages/aboutus.vue')
    },
    {
      path:'/FAQs',
      name:'FAQs',
      component :()=>import('../pages/FAQs.vue')
    },
    {
      path:'/rentalarea',
      name:'rentalarea',
      component :()=>import('../RentalArea/rental_homepage.vue')
    },
    {
      path:'/productdetail/:name',
      name:'ProductDetail',
      component :()=>import('../productpage/ProductDetail.vue')
    }
  ]
})

export default router
