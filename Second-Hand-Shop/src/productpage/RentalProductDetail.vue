<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import headerComp from "../website_homepage/header.vue";
import footerComp from "../website_homepage/footer.vue";
import router from '@/router';

const rentalProduct = ref({});
const route = useRoute();
const showAlert = ref(false);
const alertMessage = ref('');
const store = useStore();

const selectedDays = ref(1); // 選擇的租借天數
const fetchRentalProductDetail = async (name) => {
  try {
    const response = await axios.get(`http://localhost:3010/getRentals?name=${encodeURIComponent(name)}`);
    if (response.data.length > 0) {
      rentalProduct.value = response.data[0];
    } else {
      console.error('Rental product not found');
    }
  } catch (error) {
    console.error('Error fetching rental product detail:', error);
  }
};

const rentProduct = async () => {
  const success = await store.dispatch('rentProduct', { 
    ...rentalProduct.value, 
    days: selectedDays.value 
  });
  if (success) {
    // 如果成功，跳轉到訂單表單頁面
    router.push({ path: '/rental-order-form' });
  }
};


const increaseDays = () => {
  if (selectedDays.value < rentalProduct.value.rental_days) {
    selectedDays.value += 1;
  }
};

const decreaseDays = () => {
  if (selectedDays.value > 1) {
    selectedDays.value -= 1;
  }
};

onMounted(() => {
  const productName = route.params.name;
  fetchRentalProductDetail(productName);
});
</script>

<template>
  <headerComp></headerComp>
  <div class="main-content">
    <div class="container">
      <div class="rental-product-detail-container">
        <div class="rental-product-detail" v-if="rentalProduct.product_name">
          <div class="rental-product-image">
            <img v-if="rentalProduct.imgURL" :src="rentalProduct.imgURL" alt="Rental Product Image">
          </div>
          <div class="rental-product-info">
            <RouterLink :to="{ path: `/rental-category/${rentalProduct.category}` }" class="category-button">{{ rentalProduct.category }}</RouterLink>
            <h1>{{ rentalProduct.product_name }}</h1>
            <p class="rental-product-description">{{ rentalProduct.description }}</p>
            <p class="rental-product-seller">{{ rentalProduct.seller }}</p>
            
            <div class="rental-product-quantity">可租借數量 : {{ rentalProduct.quantity }} 件</div>
            <div class="rental-product-days">可租借天數 : {{ rentalProduct.rental_days }} 天</div>
            <div class="rental-product-status">商品狀態 : {{ rentalProduct.status }}</div>
            <div class="rental-product-price">NT${{ rentalProduct.price }}/日</div>
            <!-- 增加減少天數選擇區域，置中並在價格下方 -->
            <div class="rental-duration">
              <button @click="decreaseDays" :disabled="selectedDays <= 1">-</button>
              <span>{{ selectedDays }} 天</span>
              <button @click="increaseDays" :disabled="selectedDays >= rentalProduct.rental_days">+</button>
            </div>

            <div class="rental-product-actions-container">
                <button @click="rentProduct">租借</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAlert" class="alert">
      {{ alertMessage }}
    </div>
  </div>
  <footerComp></footerComp>
</template>

<style scoped>
.main-content {
  background-color: #f9f9f9;
  padding: 20px 0;
}

.category-button {
  display: inline-block;
  padding: 5px 10px;
  margin-top: 10px;
  background-color: #206094;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.rental-product-detail-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
}

.rental-product-detail {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 1200px;
  width: 100%;
}

.rental-product-image {
  flex: 1;
  margin-right: 20px;
  position: relative;
}

.rental-product-image img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.rental-product-info {
  flex: 1;
  text-align: left;
  position: relative;
  padding: 20px; /* 增加內部填充 */
}

.rental-product-info h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.rental-product-description {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.rental-product-price {
  font-size: 1.5em;
  font-weight: bolder;
  color: #206094;
  text-align: center;
  margin: 20px 0; /* 增加上下間距 */

}

.rental-duration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px; /* 增加按鈕與天數之間的間距 */
  font-size: 1.2em;
  margin: 20px 0; /* 增加上下間距 */
}

.rental-duration button {
  width: 30px;
  height: 30px;
  font-size: 1em;
  font-weight: bold;
  background-color: #206094;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.rental-duration button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.rental-product-actions-container {
  display: flex;
  width: 100%;
  margin-top: 20px; /* 增加與其他元素之間的間距 */
  justify-content: center; /* 將按鈕置中 */
}

.rental-product-actions-container button {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: #206094;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
