import { createRouter, createWebHistory } from 'vue-router';
import Homeview from '@/views/HomeView.vue';
import Mainpage from '@/views/mainpage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Mainpage,
    },
    {
      path: '/TradingArea',
      name: 'TradingArea',
      component: Homeview,
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../Login_Register/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../Login_Register/register.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/adminView.vue'),
    },
    {
      path: '/adminCustomers',
      name: 'adminCustomers',
      component: () => import('../admin/function-pages/customers.vue'),
    },
    {
      path: '/adminProducts',
      name: 'adminProducts',
      component: () => import('../admin/function-pages/products.vue'),
    },
    {
      path: '/adminOrder',
      name: 'adminOrder',
      component: () => import('../admin/function-pages/order.vue'),
    },
    {
      path: '/adminRentalOrder',
      name: 'adminRentalOrder',
      component: () => import('../admin/function-pages/rentalorder.vue'),
    },
    {
      path: '/adminRentals',
      name: 'adminRentals',
      component: () => import('../admin/function-pages/rentals.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../users/profile.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../users/cart.vue'),
    },
    {
      path: '/keywordsearch',
      name: 'keywordsearch',
      component: () => import('../search/keywordsearch.vue'),
    },
    {
      path: '/rental-keywordsearch',
      name: 'rentalkeywordsearch',
      component: ()=>import('../search/rental_keywordsearch.vue'),
    },
    {
      path: '/category/:categoryName',
      name: 'Category',
      component: () => import('../search/categorypage.vue'),
    },
    {
      path:'/rental-category/:categoryName',
      name: 'Rental-Category',
      component: () =>import('../search/rental_categorypage.vue')
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: () => import('../pages/aboutus.vue'),
    },
    {
      path: '/FAQs',
      name: 'FAQs',
      component: () => import('../pages/FAQs.vue'),
    },
    {
      path: '/rentalarea',
      name: 'rentalarea',
      component: () => import('../RentalArea/rental_homepage.vue'),
    },
    {
      path: '/productdetail/:name',
      name: 'ProductDetail',
      component: () => import('../productpage/ProductDetail.vue'),
    },
    {
      path: '/rentalproductdetail/:name',
      name: 'RentalProductDetail',
      component: () => import('../productpage/RentalProductDetail.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () =>import('../users/checkout.vue'),
    },
    {
      path: '/rental-order-form',
      name: 'RentalOrderForm',
      component: () => import('../users/rentalOrderForm.vue'),
    },    
    {
      path: '/order-confirmation/:orderId',
      name: 'orderConfirmation',
      component: () =>import('../users/order-confirmation.vue'),
    },
    {
      path:'/rentalOrder-confirmation/:orderId',
      name: 'rentalOrderConfirmation',
      component: () =>import('../users/rentalOrder-confirmation.vue'),
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
