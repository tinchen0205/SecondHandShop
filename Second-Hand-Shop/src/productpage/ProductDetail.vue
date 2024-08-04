<template>
    <div>
      <h1 v-if="product.product_name">{{ product.product_name }}</h1>
      <img v-if="product.imgURL" :src="product.imgURL" alt="Product Image">
      <p v-if="product.description">{{ product.description }}</p>
      <p v-if="product.price">售價: {{ product.price }}</p>
      <small v-if="product.time" class="text-muted">{{ product.time }}</small>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  const product = ref({});
  const route = useRoute();
  
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
  
  onMounted(() => {
    const productName = route.params.name;
    fetchProductDetail(productName);
  });
  </script>
  