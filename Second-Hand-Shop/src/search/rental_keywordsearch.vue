<script setup>
import { ref, onMounted,watch } from 'vue'; //引入watch
import { useRoute } from 'vue-router';
import axios from 'axios';
import RentalheaderComp from "../website_homepage/rental_header.vue"; 
import footerComp from "../website_homepage/footer.vue";

const route = useRoute();
const results = ref([]);
const loading = ref(true);


const fetchResults = async (query) => { //提取fetchResults
  loading.value=true;
  try {
    const response = await axios.get('http://localhost:3010/Rentalkeywordsearch', {
      params: { query }
    });
    results.value = response.data;
  } catch (error) {
    console.error('搜尋失敗:', error);
  } finally {
    loading.value = false;
  }
};
const searchQuery = ref(route.query.q || ''); //初始化
onMounted(() => {
  fetchResults(searchQuery.value); // 修改 onMounted 函数
});

watch(() => route.query.q, (newQuery) => { // 添加 watch
  searchQuery.value = newQuery;
  fetchResults(newQuery);
});
const openRentalProductDetail = (name) => {
  window.open(`/rentalproductdetail/${encodeURIComponent(name)}`, '_blank');
};
</script>
<template>
  <RentalheaderComp></RentalheaderComp>
  <div class="album py-5 bg-light">
    <div class="container">
      <h2>搜尋結果</h2>
      <div class="row">
        <div v-if="loading" class="col-12">載入中...</div>
        <div v-else class="col-12">
          <div v-if="results.length">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div v-for="(result, index) in results" :key="index" class="col">
                <div class="card shadow-sm h-100">
                  <img :src="result.imgURL" class="product-image bd-placeholder-img card-img-top mt-3" width="100%" height="225" alt="Product Image" @click="openRentalProductDetail(result.product_name)">
                  <div class="card-body">
                    <h4 class="product-name card-title" @click="openRentalProductDetail(result.product_name)">{{ result.product_name }}</h4>
                    <p class="product-description card-text">{{ result.description }}</p>
                    <div class="d-flex justify-content-between align-items-center card-footer">
                      <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">檢視</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">收藏</button>
                      </div>
                      <div class="card-text">
                        售價: {{ result.price }}
                      </div>
                      <small class="text-muted">{{ result.time }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>沒有符合搜尋條件的商品。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footerComp></footerComp>
</template>

<style>
.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
}
.product-name {
  height: 55px; /* 固定名稱高度 */
  overflow: hidden;
  font-size: 1.5em;
  margin-bottom: 0.5em;
}
.product-description {
  height: 60px; /* 固定描述高度 */
  overflow: hidden;
  font-size: 1.1em;
  margin-bottom: 0.5em;
}
.card-footer {
  margin-top: auto;
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.product-image {
    width: 100%;
  height: 225px;
  object-fit: contain;
  border-radius: 8px; /* 可選，圓角效果 */
}
</style>