<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import headerComp from "../website_homepage/header.vue";
import footerComp from "../website_homepage/footer.vue";

const store = useStore();
const router = useRouter();
const cartItems = computed(() => store.getters.cartItems);
const cartItemCount = computed(() => store.getters.cartItemCount);
const cartTotal = computed(() => cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0));

const removeFromCart = (productCode) => {
  store.commit('removeFromCart', productCode);
};
const increaseQuantity = (productCode) =>{
  store.dispatch('increaseQuantity', productCode);
};
const decreaseQuantity = (productCode) => {
  store.dispatch('decreaseQuantity', productCode);
};
const checkout = async () => {
  await store.dispatch('checkout');

  // 导航到结账页面
  router.push('/checkout');
};

// 設定每10秒刷新一次頁面
let intervalId;

onMounted(() => {
  intervalId = setInterval(() => {
    window.location.reload();
  }, 10000); // 10,000毫秒 = 10秒
});

onUnmounted(() => {
  clearInterval(intervalId); // 在組件卸載時清除定時器
});
const openProductDetail = (name) => {
  window.open(`/productdetail/${encodeURIComponent(name)}`, '_blank');
};
</script>

<template>
  <headerComp></headerComp>
  <div class="shopping-cart">
    <div class="cart-container">
      <h1>購物車</h1>
      <div v-if="cartItemCount > 0">
        <table class="cart-table">
          <thead>
            <tr>
              <th>商品圖片</th>
              <th>商品名稱</th>
              <th>單件價格</th>
              <th>數量調整</th>
              <th>小計</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.product_code">
              <td @click="openProductDetail(item.product_name)"><img :src="item.imgURL" alt="Product Image" class="cart-item-image" ></td>
              <td @click="openProductDetail(item.product_name)" class="cart-item-name">{{ item.product_name }}</td>
              <td>NT${{ item.price }}</td>
              <td>
                <div class="quantity-controls">
                  <button @click="decreaseQuantity(item.product_code)" :disabled="item.quantity === 1">-</button>
                  <p>{{ item.quantity }}</p>
                  <button @click="increaseQuantity(item.product_code)">+</button>
                </div>
              </td>
              <td>NT${{ item.quantity * item.price }}</td>
              <td><button @click="removeFromCart(item.product_code)" class="remove-button">移除</button></td>
            </tr>
          </tbody>
        </table>
        <div class="cart-total">
          <h2>總計: NT${{ cartTotal }}</h2>
          <button @click="checkout">結帳</button>
        </div>
      </div>
      <div v-else class="empty-cart">
        <p>您的購物車是空的</p>
      </div>
    </div>
    <footerComp></footerComp>
  </div>
</template>

<style scoped>
.cart-container h1{
  font-weight:bolder;
  text-align: center;
}
.shopping-cart {
  padding: 20px;
  background-color: #f9f9f9;
}

.cart-container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th, .cart-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

.cart-table th {
  background-color: #f1f1f1;
}

.cart-item-image {
  cursor: pointer;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-item-name {
  cursor: pointer;
}
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

.quantity-controls p {
  margin: 0;
}

.quantity-controls button {
  padding: 5px 10px;
  background-color: #206094;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.quantity-controls button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.quantity-controls button:hover:enabled {
  background-color: #174b6f;
  transform: translateY(-2px);
}

.quantity-controls button:active:enabled {
  transform: translateY(0);
}

.remove-button {
  background-color: #d9534f;
}

.remove-button:hover {
  background-color: #c9302c;
}

.cart-total {
  margin-top: 20px;
  text-align: right;
}

.cart-total h2 {
  margin: 0 0 10px 0;
  font-size: 1.5em;
  font-weight: bold;
}

button {
  padding: 10px 20px;
  background-color: #206094;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #174b6f;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

.empty-cart {
  text-align: center;
  color: #888;
  font-size: 1.2em;
  margin-top: 50px;
}
</style>
