<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import headerComp from "../website_homepage/header.vue";
import footerComp from "../website_homepage/footer.vue";
import Flatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

const store = useStore();
const router = useRouter();

const checkoutCart = computed(() => store.getters.checkoutCart);
const form = ref({
  user: {
    email: '',
    name: '',
    tel: '',
    gender: '', 
  },
  delivery: {
    deliveryAddress: '',
    deliveryDateTime: ''
  },
  message: ''
});

const flatpickrOptions = {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,  // 24小時制
};

const submitForm = () => {
  // 提交表单逻辑
  console.log('Form Data:', form.value);

  // 处理订单提交后，清空购物车等操作
  store.commit('setCheckoutCart', []);
  const cartStorageKey = `shoppingCart_${store.state.userId}`;
  localStorage.removeItem(cartStorageKey);

  router.push('/order-confirmation');
};

onMounted(() => {
  const cartStorageKey = `shoppingCart_${store.state.userId}`;
  const savedCart = JSON.parse(localStorage.getItem(cartStorageKey)) || [];
  store.commit('setCheckoutCart', savedCart);
});

const genders = ['男', '女', '其他'];
const locations = ['靜宜大學校門口', '至善樓學餐門口', '蓋夏圖書館門口', '希嘉學苑門口', '思高學苑門口', '善牧學苑門口', '主顧樓門口', '任垣樓門口'];
</script>

<template>
  <headerComp></headerComp>
  <div class="checkout-container">
    <h1>結帳頁面</h1>
    <table class="cart-table">
      <thead>
        <tr>
          <th>商品圖片</th>
          <th>商品名稱</th>
          <th>單件價格</th>
          <th>數量</th>
          <th>小計</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in checkoutCart" :key="item.product_code">
          <td><img :src="item.imgURL" alt="Product Image" class="cart-item-image" /></td>
          <td>{{ item.product_name }}</td>
          <td>NT${{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>NT${{ item.quantity * item.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="form-container">
    <div class="form-section">
      <h2>個人資料</h2>
      <label for="name">姓名</label>
      <input v-model="form.user.name" type="text" id="name" required>
      <label for="email">電子郵件</label>
      <input v-model="form.user.email" type="email" id="email" required>
      <label for="tel">電話號碼</label>
      <input v-model="form.user.tel" type="tel" id="tel" required>
      <label for="gender">性別</label>
      <select v-model="form.user.gender" id="gender" required>
        <option v-for="gender in genders" :key="gender" :value="gender">{{ gender }}</option>
      </select>
    </div>

    <div class="form-section">
      <h2>交易資料</h2>
      <label for="deliveryAddress">面交地點</label>
      <select v-model="form.delivery.deliveryAddress" id="deliveryAddress" required>
        <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
      </select>
      <label for="deliveryDateTime">面交日期與時間</label>
      <Flatpickr v-model="form.delivery.deliveryDateTime" :config="flatpickrOptions" id="deliveryDateTime"/>
    </div>
  </div>
  
  <button @click="submitForm" class="submit-button">提交訂單</button>
  <footerComp></footerComp>
</template>

<style>
.form-container {
  display: flex;
  gap: 15px; /* 更小的间隙 */
  justify-content: center; /* 居中对齐 */
  margin: 20px auto; /* 上下外边距 */
  max-width: 800px; /* 最大宽度 */
}

.form-section {
  flex: 1;
  background: #fff; /* 背景色白色 */
  padding: 15px; /* 内边距 */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 更细的阴影 */
  max-width: 350px; /* 最大宽度 */
}

h2 {
  margin-top: 0;
  font-size: 1.2em; /* 较小的标题字体 */
}

label {
  display: block;
  margin: 8px 0 4px; /* 更紧凑的间距 */
  font-size: 0.9em; /* 较小的字体 */
}

input, select {
  width: 100%;
  padding: 6px; /* 更小的内边距 */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9em; /* 较小的字体 */
}

.submit-button {
  display: block;
  width: 200px; /* 固定宽度 */
  margin: 20px auto; /* 上下外边距和居中对齐 */
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff; /* 主要颜色 */
  color: #fff;
  font-size: 1em;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3; /* 悬停颜色 */
}

.checkout-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
.cart-table {
  width: 100%;
  border-collapse: collapse;
}
.cart-table th, .cart-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
.checkout-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em; /* 调整表格字体大小 */
}

.cart-table th, .cart-table td {
  padding: 8px 10px; /* 更小的内边距 */
  border: 1px solid #ddd;
  text-align: center; /* 表头和内容居中对齐 */
}

.cart-table th {
  background-color: #f7f7f7; /* 表头背景色 */
  font-weight: bold; /* 表头字体加粗 */
}

.cart-item-image {
  width: 60px; /* 调整图片大小 */
  height: 60px;
  object-fit: cover; /* 保持图片比例 */
}

.submit-button {
  display: block;
  width: 200px;
  margin: 20px auto;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
