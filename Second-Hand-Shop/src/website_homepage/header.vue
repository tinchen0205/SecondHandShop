<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuth } from '@/composables/useAuth';
import search from '@/Icons/search.vue';
import customer from '@/Icons/coustom-icon.vue';

const { isLogin, username, userId, checkLogin, logout } = useAuth();
const router = useRouter();

// 定義搜尋關鍵字的狀態
const searchQuery = ref('');

// 定義執行搜尋的函數
const performSearch = async () => {
  try {
    const response = await axios.get('/keywordsearch', {
      params: { query: searchQuery.value }, // 發送 GET 請求到 /api/keywordsearch，並附上搜尋關鍵字
    });
    // 將搜尋結果傳遞到搜尋結果頁面
    router.push({ path: '/keywordsearch', query: { q: searchQuery.value, results: JSON.stringify(response.data.results) } });
  } catch (error) {
    console.error('搜尋失敗:', error); // 如果請求失敗，打印錯誤信息
  }
};

onMounted(() => {
  checkLogin();
});
</script>

<template>
  <div class="p-3 text-black">
    <div class="container">
      <div class="row">
        <!-- 搜尋表單 -->
        <form class="col-3 col-lg-auto mb-3 mb-lg-0 me-lg-3" @submit.prevent="performSearch">
          <div class="input-group">
            <!-- 搜尋按鈕，點擊時觸發 performSearch 函數 -->
            <button class="input-group-text" @click="performSearch"><search></search></button>
            <!-- 搜尋輸入框，使用 v-model 雙向綁定 searchQuery，並在回車時觸發 performSearch 函數 -->
            <input
              type="search"
              class="form-control form-control-dark"
              placeholder="請輸入商品關鍵字"
              aria-label="Search"
              v-model="searchQuery"
              @keyup.enter="performSearch"
            />
          </div>
        </form>
        
        <ul class="nav col-6 col-lg-auto justify-content-center mx-auto me-lg-auto mb-2  mb-md-0">
          
          <li><RouterLink to="/" class="nav-link px-3 text-black inline ">首頁</RouterLink></li>
          
          <li class="nav-item dropdown">
            <a class="nav-link text-black inline " data-bs-toggle="dropdown" href="#">分類</a>
            <ul class="dropdown-menu" >
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '3C' }}">3C</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '家電' }}">家電</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '生活用品' }}">生活用品</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '居家' }}">居家</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '學習用品' }}">學習用品</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '服飾' }}">服飾</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '戶外運動' }}">戶外運動</router-link></li>
            </ul>
          </li>
          <li><RouterLink to="/FAQs" class="nav-link px-3 text-black inline ">FAQs</RouterLink></li>
          <li><RouterLink to="/aboutus" class="nav-link px-3 text-black inline ">關於我們</RouterLink></li>
          <li><RouterLink to="/rentalarea" class="nav-link px-3 text-black  ">租借專區</RouterLink></li>
          
          
        </ul>
        <div class="col-3 text-end mb-2">
            <span class="me-3"><customer></customer></span>
            <span v-if="!isLogin" class="text-black me-3">訪客</span>
            <span v-if="isLogin" class="text-black me-3">{{username}}</span>
            <!--<span v-if="isLogin" class="text-black me-3">{{userId}}</span>-->
            <button v-if="isLogin" class="btn btn-danger me-2" @click="logout" >登出</button>
            <a v-if="isLogin" href="https://forms.gle/CPzF3HRqwfnFhdSWA" target="_blank" class="btn btn-primary me-2">
    刊登商品
  </a>
            <RouterLink v-if="!isLogin" to="/Login" class="btn btn-success me-3" >登入</RouterLink>
            <RouterLink v-if="!isLogin" to="/register" class="btn btn-warning" >註冊</RouterLink>
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