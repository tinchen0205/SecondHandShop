<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import headerComp from "../website_homepage/header.vue";
import footerComp from "../website_homepage/footer.vue";

const rentalProduct = ref({});
const route = useRoute();
const showAlert = ref(false);
const alertMessage = ref('');
const store = useStore();

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

const rentProduct = () => {
  store.dispatch('rentProduct', rentalProduct.value);
  alertMessage.value = `${rentalProduct.value.product_name} 已加入租借列表`;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
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
            <div class="rental-product-price">NT${{ rentalProduct.price }} / 七日</div>
            <div class="rental-product-quantity">可租借數量{{ rentalProduct.quantity }}件</div>
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
  margin-bottom: 20px;
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
}

.rental-product-actions-container {
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
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
