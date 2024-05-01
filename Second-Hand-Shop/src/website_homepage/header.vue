<script setup>
import search from '@/Icons/search.vue';
</script>

<template>
  
  <div class="p-3  text-black">
    <div class="container ">
      <div class="row ">
        <form class="col-3 col-lg-auto mb-3 mb-lg-0 me-lg-3 ">
          <div class="input-group">
            <span class="input-group-text"><search></search></span>
            <input type="search" class="form-control form-control-dark" placeholder="Search" aria-label="Search">
          </div>
        </form>
        
        <ul class="nav col-6 col-lg-auto justify-content-center mx-auto me-lg-auto mb-2  mb-md-0">
          
          <li><RouterLink to="/" class="nav-link px-3 text-black inline">首頁</RouterLink></li>
          
          <li class="nav-item dropdown">
            <a class="nav-link text-black inline" data-bs-toggle="dropdown" href="#">分類</a>
            <ul class="dropdown-menu" >
              <li><a class="dropdown-item" href="#">企業管理</a></li>
              <li><a class="dropdown-item" href="#">語文學習</a></li>
              <li><a class="dropdown-item" href="#">程式設計</a></li>
            </ul>
          </li>
          <li><a href="#" class="nav-link px-3 text-black inline">Blog</a></li>
          <li><a href="#" class="nav-link px-3 text-black inline">關於</a></li>
          <li><a href="#" class="nav-link px-3 text-black inline">聯絡我們</a></li>
          
        
        </ul>
        
        <div class="col-3 text-end">
          <RouterLink to="/Login" class="btn btn-success me-3">登入</RouterLink>
          <RouterLink to="/register" class="btn btn-warning">註冊</RouterLink>
        </div>
      </div>
    </div>
  </div>
  
</template>


<style scoped>

.inline::after {
  content: "";
  display: inline-block;
  width: 1px;
  height: 18px; /* 调整线的高度 */
  background-color: black;
  margin-left: 28px; /* 调整线与文本之间的距离 */
}

.dropdown:hover .dropdown-menu {
  display: block;
}
.dropdown-menu .dropdown-item:focus, 
.dropdown-menu .dropdown-item:hover {
  background-color: #D0D0D0; /* 修改被点击或鼠标悬停时的背景颜色 */
  color: black; /* 修改文字颜色 */
}
</style>