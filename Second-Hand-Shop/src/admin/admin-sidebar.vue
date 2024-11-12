<script setup>
import homeIcon from '@/Icons/home-icon.vue'
import orderIcon from '@/Icons/order-icon.vue';
import productIcon from '@/Icons/product-icon.vue';
import coustomIcon from '@/Icons/coustom-icon.vue';
</script>
    
<script>
  export default {   
  data() {
    return {
      currentPage: '/admin'
    };
  },
  watch: {
    '$route'(to, from) {
      this.currentPage = to.path;
    }
  },
  created() {
    this.currentPage = this.$route.path;
  }
};
</script>

<template>
  <div class="position-fixed top-0 bottom-0 start-0 flex-column flex-shrink-0 p-5 text-white bg-dark " style="width: 280px;">
    <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      
      <span class="fs-4 pt-3 ps-4">Admin</span>
    </a>
    <hr>
    <ul class="nav flex-column mb-auto">
      <li class="nav-item">
        <RouterLink to ="/admin" class="nav-link d-flex align-items-center" :class="{'active':currentPage ==='/admin'}">
          <homeIcon class="mx-2"></homeIcon>
          Home
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/adminRentals" class="nav-link d-flex align-items-center" :class="{'active':currentPage==='/adminRentals'}">
          <productIcon class="mx-2"></productIcon>
          租借商品專區
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/adminProducts" class="nav-link d-flex align-items-center" :class="{'active':currentPage==='/adminProducts'}">
          <productIcon class="mx-2"></productIcon>
          購物網頁商品
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/adminCustomers" class="nav-link d-flex align-items-center" :class="{'active':currentPage==='/adminCustomers'}">
          <coustomIcon class="mx-2"></coustomIcon>
          顧客管理
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/adminOrder" class="nav-link d-flex align-items-center" :class="{'active':currentPage==='/adminOrder'}">
          <coustomIcon class="mx-2"></coustomIcon>
          購物訂單
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/adminRentalOrder" class="nav-link d-flex align-items-center" :class="{'active':currentPage==='/adminRentalOrder'}">
          <coustomIcon class="mx-2"></coustomIcon>
          租借訂單
        </RouterLink>
      </li>
    </ul>
    

  </div>
</template>

<style>
.nav-link{
  color:#FFFFFF;
}
.nav-link.active{
  color:#007bff;
}

</style>