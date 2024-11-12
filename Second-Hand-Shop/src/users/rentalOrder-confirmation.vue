<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import headerComp from "../website_homepage/header.vue";
import footerComp from "../website_homepage/footer.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const orderDetails = ref(null);
const isLoading = ref(true);
const errorMessage = ref('');
const isCollapsed = ref(false); // Manage collapse state

const fetchOrderDetails = async () => {
  const orderId = route.params.orderId;
  try {
    const response = await axios.get(`http://localhost:3010/rentalorder/${orderId}`);
    const data = response.data;

    // Convert order date and delivery time to local time in 24-hour format
    const options = { hour12: false };
    data.orderDate = new Date(data.orderDate).toLocaleString('zh-TW', options);
    data.delivery.deliveryDateTime = new Date(data.delivery.deliveryDateTime).toLocaleString('zh-TW', options);
    
    orderDetails.value = data;
    isLoading.value = false;
  } catch (error) {
    errorMessage.value = '無法獲取訂單詳情，請稍後再試。';
    isLoading.value = false;
  }
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

onMounted(() => {
  fetchOrderDetails();
});
</script>

<template>
  <headerComp></headerComp>
  <div class="order-confirmation-container" v-if="orderDetails">
    <button @click="toggleCollapse" class="toggle-button">
      感謝您的購物，以下為您的訂單資訊{{ isCollapsed ? '▲' : '▼' }}
    </button>

    <div v-if="!isCollapsed">
      <div class="order-summary">
        <p><strong>訂單編號:</strong> {{ orderDetails.orderId }}</p>
        <p><strong>訂單日期:</strong> {{ orderDetails.orderDate }}</p>
      </div>

      <h2>商品資訊</h2>
      <div class="product-info">
        <table>
          <thead>
            <tr>
              <th>商品圖片</th>
              <th>商品名稱</th>
              <th>單日價格</th>
              <th>租借天數</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderDetails.items" :key="item.product_code">
              <td><img :src="item.imgURL" alt="Product Image" class="product-image"/></td>
              <td>{{ item.product_name }}</td>
              <td>NT${{ item.price }}</td>
              <td>{{ item.days }}</td>
              <td>NT${{ item.days * item.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="total-amount">
        <h2>總金額: NT${{ orderDetails.totalAmount }}</h2>
      </div>

      <div class="delivery-info">
        <h2>面交資訊</h2>
        <p><strong>面交地點:</strong> {{ orderDetails.delivery.deliveryAddress }}</p>
        <p><strong>面交時間:</strong> {{ orderDetails.delivery.deliveryDateTime }}</p>
      </div>

      <div class="contact-info">
        <h2>聯絡資訊</h2>
        <p><strong>姓名:</strong> {{ orderDetails.user.name }}</p>
        <p><strong>電子郵件:</strong> {{ orderDetails.user.email }}</p>
        <p><strong>電話號碼:</strong> {{ orderDetails.user.tel }}</p>
      </div>
    </div>

    <div v-else-if="isLoading">
      <p>加載中...</p>
    </div>
    <div v-else>
      <p>{{ errorMessage }}</p>
    </div>
  </div>
  <footerComp></footerComp>
</template>

<style>
.order-confirmation-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 26px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

h2 {
  font-size: 20px;
  color: #444;
  margin-top: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

p {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

.order-summary, .total-amount, .delivery-info, .contact-info {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th, table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

table th {
  background-color: #f5f5f5;
  font-weight: bold;
  text-align: center;
}

table td {
  background-color: #fff;
  text-align: center;
}

.product-image {
  width: 60px;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.total-amount {
  font-size: 18px;
  color: #222;
  font-weight: bolder;
  text-align: right;
  margin-top: 20px;
  border-top: 2px solid #eee;
  padding-top: 10px;
}

.toggle-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 20px;
  color: #000000;
  background-color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: #fff;
}

@media (max-width: 768px) {
  .order-confirmation-container {
    padding: 20px;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 18px;
  }

  table th, table td {
    padding: 10px;
  }

  .product-image {
    width: 50px;
  }
}
</style>
