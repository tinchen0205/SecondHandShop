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
        <a href="#" class="nav-link d-flex align-items-center">
          <orderIcon class="mx-2"></orderIcon>
          Orders
        </a>
      </li>
      <li>
        <a href="#" class="nav-link d-flex align-items-center">
          <productIcon class="mx-2"></productIcon>
          Products
        </a>
      </li>
      <li>
        <RouterLink to="/adminCustomers" class="nav-link d-flex align-items-center" :class="{'active':currentPage==='/adminCustomers'}">
          <coustomIcon class="mx-2"></coustomIcon>
          Customers
        </RouterLink>
      </li>
    </ul>
    
    <div class="dropdown mb-3" style="position: absolute; bottom: 0; width: 100%;">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1" style="">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
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