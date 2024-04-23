<script setup>

</script>

<template>
  
  <div class="p-3  text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          
          <RouterLink to="/" class="nav-link px-5 text-black">首頁</RouterLink>
          <li><a href="#" class="nav-link px-3 text-black">分類</a></li>
          <li><a href="#" class="nav-link px-3 text-black">Blog</a></li>
          <li><a href="#" class="nav-link px-3 text-black">關於</a></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
        </form>

        <div class="text-end">
          <RouterLink to="/Login" class="btn btn-outline-light me-3">登入</RouterLink>
          <button type="button" class="btn btn-warning">註冊</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>


</style>