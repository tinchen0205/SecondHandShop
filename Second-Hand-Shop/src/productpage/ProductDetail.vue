<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useAuth } from '@/composables/useAuth';
import headerComp from "../website_homepage/header.vue";
import footerComp from "../website_homepage/footer.vue";

const product = ref({});
const route = useRoute();
const showAlert = ref(false);
const alertMessage = ref('');
const store = useStore();
const {  isLogin, checkLogin } = useAuth();
const fetchProductDetail = async (name) => {
  try {
    const response = await axios.get(`http://localhost:3005/products?name=${encodeURIComponent(name)}`);
    if (response.data.length > 0) {
      product.value = response.data[0];
    } else {
      console.error('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product detail:', error);
  }
};

const AddToCart = () => {
  if(isLogin.value){
    store.dispatch('addToCart', product.value);
    alertMessage.value = `${product.value.product_name} 已加入購物車`;
    showAlert.value = true;
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  }
  else{
    alert('尚未登入，請先登入再進行購買');
  }
};

const buyNow = () => {
  console.log(`立即購買 ${product.value.product_name}`);
};

onMounted(() => {
  const productName = route.params.name;
  fetchProductDetail(productName);
  checkLogin();
});
</script>

<template>
  <headerComp></headerComp>
  <div class="main-content">
    <div class="container">
      <div class="product-detail-container">
        <div class="product-detail" v-if="product.product_name">
          <div class="product-image">
            <img v-if="product.imgURL" :src="product.imgURL" alt="Product Image">
          </div>
          <div class="product-info">
            <RouterLink :to="{ path: `/category/${product.category}` }" class="category-button">{{ product.category }}</RouterLink>
            <h1>{{ product.product_name }}</h1>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-price">NT${{ product.price }}</div>
            <div class="product-quantity">商品數量{{ product.quantity }}件</div>
            <!--<small v-if="product.product_code" class="product-time text-muted">{{ product.product_code }}</small>-->
            <div class="product-actions-container">
                <button @click="AddToCart">加入購物車</button>
                <button @click="buyNow">直接購買</button>
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

.product-detail-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
}

.product-detail {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 1200px;
  width: 100%;
}

.product-image {
  flex: 1;
  margin-right: 20px;
  position: relative;
}

.product-image img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.product-info {
  flex: 1;
  text-align: left;
  position: relative;
}

.product-info h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.product-description {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.product-price {
  font-size: 1.5em;
  font-weight: bolder;
  color: #206094;
  text-align: center;
  margin-bottom: 20px;
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
}

.product-time {
  font-size: 0.9em;
  color: #888;
  margin-bottom: 20px;
}

.product-actions-container {
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

.product-actions-container button {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: #206094;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.product-actions-container button + button {
  margin-left: 10px;
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
