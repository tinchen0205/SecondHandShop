<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuth } from '@/composables/useAuth';
import search from '@/Icons/search.vue';
import customer from '@/Icons/coustom-icon.vue';
import cart from '@/Icons/cart-icon.vue';

const { isLogin, username, checkLogin, logout } = useAuth();
const router = useRouter();
const store = useStore();
const cartItemCount = computed(() => store.getters.cartItemCount);
const searchQuery = ref('');

// 搜尋函數
const performSearch = async () => {
  try {
    const response = await axios.get('/keywordsearch', {
      params: { query: searchQuery.value },
    });
    router.push({ path: '/keywordsearch', query: { q: searchQuery.value, results: JSON.stringify(response.data.results) } });
  } catch (error) {
    console.error('搜尋失敗:', error);
  }
};

// 導航至購物車
const gotoCart = () => {
  router.push('/cart');
};

// 導航至用戶資料頁面
const navigateToProfile = () => {
  if (isLogin.value) {
    router.push('/profile');
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
            <button class="input-group-text" @click="performSearch"><search /></button>
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

        <ul class="nav col-6 col-lg-auto justify-content-center mx-auto me-lg-auto mb-2 mb-md-0">
          <li><RouterLink to="/" class="nav-link px-3 text-black inline">首頁</RouterLink></li>
          <li class="nav-item dropdown">
            <a class="nav-link text-black inline" data-bs-toggle="dropdown" href="#">分類</a>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '3C' }}">3C</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '家電' }}">家電</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '生活用品' }}">生活用品</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '居家' }}">居家</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '學習用品' }}">學習用品</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '服飾' }}">服飾</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '戶外運動' }}">戶外運動</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Category', params: { categoryName: '娛樂' }}">娛樂</router-link></li>
            </ul>
          </li>
          <li><RouterLink to="/FAQs" class="nav-link px-3 text-black inline">FAQs</RouterLink></li>
          <li><RouterLink to="/aboutus" class="nav-link px-3 text-black inline">關於我們</RouterLink></li>
          <li><RouterLink to="/rentalarea" class="nav-link px-3 text-black">租借專區</RouterLink></li>
        </ul>

        <div class="col-3 text-end mb-2">
          <span class="me-3">
            <button class="btn btn-link" @click="navigateToProfile">
              <customer />
              <span v-if="!isLogin" class="text-black">訪客</span>
              <span v-if="isLogin" class="text-black">{{ username }}</span>
            </button>
          </span>

          <button v-if="isLogin" class="btn btn-danger me-2" @click="logout">登出</button>
          <a v-if="isLogin" href="https://docs.google.com/forms/d/e/1FAIpQLSe25JC8Pn6gA8itIImhdrFtn_t71ESq2T8T6a3vqBkdI9ulmA/viewform?usp=sf_link" target="_blank" class="btn btn-primary me-2">刊登商品</a>

          <span class="cart-icon-container me-3" @click="gotoCart">
            <i class="cart-icon"><cart /></i>
            <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
          </span>

          <RouterLink v-if="!isLogin" to="/Login" class="btn btn-success me-3">登入</RouterLink>
          <RouterLink v-if="!isLogin" to="/register" class="btn btn-warning">註冊</RouterLink>
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
  height: 18px;
  background-color: black;
  margin-left: 28px;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu .dropdown-item:focus,
.dropdown-menu .dropdown-item:hover {
  background-color: #D0D0D0;
  color: black;
}

.cart-icon-container {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}

.cart-icon {
  cursor: pointer;
  color: #333;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0 6px;
  font-size: 12px;
}

.btn-link {
  color: black; /* 按鈕文字顏色 */
  text-decoration: none; /* 去除下劃線 */
  font-size: 16px; /* 調整字體大小 */
  padding: 0; /* 去除內邊距 */
  border: none; /* 去除邊框 */
  background: none; /* 去除背景顏色 */
  cursor: pointer; /* 鼠標懸停顯示為手型 */
}

.btn-link:hover {
  color: #0056b3; /* 懸停時顏色 */
  text-decoration: underline; /* 懸停時下劃線 */
}

.btn-link:focus {
  outline: none; /* 去除焦點邊框 */
  box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.5); /* 焦點時的陰影效果 */
}

.btn-link:active {
  color: #004085; /* 點擊時顏色 */
}

</style>
