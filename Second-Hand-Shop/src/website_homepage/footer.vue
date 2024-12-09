<script setup>
import arrowUp from '@/Icons/arrow-up.vue';
</script>

<template>
  <div class="container">
    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li><RouterLink to="/" class="nav-link px-2 text-body-secondary">Home</RouterLink></li>
        <li><RouterLink to="/FAQS" class="nav-link px-2 text-body-secondary">FAQs</RouterLink></li>
        <li><RouterLink to="/aboutus" class="nav-link px-2 text-body-secondary">About</RouterLink></li>
        <li><RouterLink to="/rentalarea" class="nav-link px-2 text-body-secondary">RentalArea</RouterLink></li>
      </ul>
      <p class="text-center text-body-secondary">©2ndFind</p>
    </footer>
    
    <!-- 返回頂部箭頭 -->
    <a href="#" class="back-to-top">
      <arrowUp></arrowUp>
    </a>
  </div>
</template>

<style scoped>
/* 調整返回頂部箭頭的大小 */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #007799;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.back-to-top:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

/* 控制箭頭圖標的大小 */
.back-to-top arrowUp {
  width: 30px;
  height: 30px;
  fill: #007799;
}
</style>
