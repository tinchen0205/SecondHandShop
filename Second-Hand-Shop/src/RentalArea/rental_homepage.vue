<script setup>
import RentalheaderComp from "../website_homepage/rental_header.vue"; 
import footerComp from "../website_homepage/footer.vue";
import { ref, onMounted } from 'vue';
import axios from 'axios';

const rentals = ref([]);
const fetchRentals = async () => {
  try {
    const response = await axios.get('http://localhost:3010/getRentals/');
    rentals.value = response.data;
  } catch (error) {
    console.error('Error fetching rentals:', error);
  }
};
onMounted(() => {
  fetchRentals();
});

const openRentalProductDetail = (name) => {
  window.open(`/rentalproductdetail/${encodeURIComponent(name)}`, '_blank');
};
</script>

<template>
  <RentalheaderComp></RentalheaderComp>
  <h1 class="text-center py-3">租借專區</h1>
  <div class="container">
    <div class="row">
      <div v-for="(rental, index) in rentals" :key="index" class="col-12 product-card mb-3 p-3">
        <div class="d-flex align-items-center">
          <img :src="rental.imgURL" class="product-img" alt="Product Image" @click="openRentalProductDetail(rental.product_name)">
          <div class="product-info ml-3 flex-grow-1">
            <h4 class="product-name" @click="openRentalProductDetail(rental.product_name)">
              {{ rental.product_name }}
            </h4>

            <p class="rental-days">可租借日數：{{ rental.rental_days }} 天</p>
            <p class="rental-price">價格：<span>{{ rental.price }} 元/日</span></p>
            <p class="rental-status" :class="{ 'status-available': rental.status === '未出租', 'status-rented': rental.status === '已出租' }">
              商品狀態：{{ rental.status }}
            </p>
          </div>
          <button class="btn btn-outline-info btn-more-info" @click="openRentalProductDetail(rental.product_name)">瞭解更多</button>
        </div>
      </div>
    </div>
  </div>
  <footerComp></footerComp>
</template>

<style scoped>
/* 容器設定 */
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 商品卡片樣式 */
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

/* 商品圖片樣式 */
.product-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
}

/* 商品資訊排版 */
.product-info {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  cursor: pointer;
}



.rental-price {
  font-size: 16px;
  font-weight: bold;
  color: #2d6a4f;
  margin-bottom: 0;
}

.rental-status {
  font-weight: bold;
  margin-bottom: 5px;
}

.status-available {
  color: green;
}

.status-rented {
  color: red;
}

/* 可租借日數樣式 */
.rental-days {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

/* 按鈕樣式 */
.btn-more-info {
  padding: 8px 20px;
  font-size: 14px;
  color: #5acffe;
  border-color: #5acffe;
  margin-left: auto; /* 這會使按鈕推向右側 */
}

.btn-more-info:hover {
  background-color: #5acffe;
  color: white;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-img {
    margin-bottom: 10px;
  }

  .btn-more-info {
    width: 100%; /* 按鈕在小螢幕上寬度為100% */
  }
}
</style>
