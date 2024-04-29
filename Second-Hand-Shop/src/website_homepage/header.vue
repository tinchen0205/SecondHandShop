<script setup>

</script>

<template>
  
  <div class="p-3  text-black">
    <div class="container ">
      <div class="row ">
        <form class="col-3 col-lg-auto mb-3 mb-lg-0 me-lg-3 ">
          <div class="input-group">
            <span class="input-group-text"><img src="" ></span> 
            <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
          </div>
        </form>
        
        <ul class="nav col-6 col-lg-auto justify-content-center mx-auto me-lg-auto mb-2  mb-md-0">
          
          <RouterLink to="/" class="nav-link px-3 text-black">首頁</RouterLink>
          
          <!--<li><a href="#" class="nav-link px-3 text-black">分類</a></li>-->
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              分類
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a class="dropdown-item" href="#">链接 1</a></li>
              <li><a class="dropdown-item" href="#">链接 2</a></li>
              <li><a class="dropdown-item" href="#">链接 3</a></li>
            </ul>
          </div>
          <li><a href="#" class="nav-link  dropdown px-3 text-black">Blog</a></li>
          <li><a href="#" class="nav-link px-3 text-black">關於</a></li>
          <li><a href="#" class="nav-link px-3 text-black">聯絡我們</a></li>
          
        
        </ul>
        
        <div class="col-3 text-end">
          <RouterLink to="/Login" class="btn btn-success me-3">登入</RouterLink>
          <RouterLink to="/Register" class="btn btn-warning">註冊</RouterLink>
        </div>
      </div>
    </div>
  </div>
  
</template>


<style scoped>

.nav-link::after {
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

.dropdown-toggle::after {
    display: none; /* 隐藏下拉菜单按钮的箭头图标 */
}
</style>