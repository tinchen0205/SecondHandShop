<script setup>
import adminHeader from '@/admin/admin-header.vue';
import adminSidebar from '@/admin/admin-sidebar.vue';

</script>

<script>
import axios from 'axios';

export default {
  name: 'adminOrder',
  data() {
    return {
      products: [],
      newProduct: {
        category: '',
        name: '',
        productCode: '',
        imageUrl: '',
        description: '',
        price: ''
      }
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3012/products/');
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    },
    resetForm() {
      this.newProduct = {
        category: '',
        name: '',
        productCode: '',
        imageUrl: '',
        description: '',
        price: ''
      };
    }
  }
}
</script>

<template>
  <adminHeader></adminHeader>
  <adminSidebar></adminSidebar>
  <div class="container">
    <div class="d-flex justify-content-between mt-2">
      <h3>訂購商品訂單資訊</h3>
    </div>
    <hr>
    <table class="table mt-4 table-bordered">
      <thead>
        <tr>
          <th class="p-3">訂單號碼</th>
          <th class="p-3">訂單日期</th>
          <th class="p-3">合計</th>
          <th class="p-3">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="p-3">{{ product.id}}</td>
          <td class="p-3">{{ product.delivery_datetime}}</td>
          <td class="p-3">{{ product.total_amount}}</td>
          <td>
            <div class="d-flex justify-content-center">
              <button class="btn btn-outline-warning btn-sm mx-3">編輯</button>
              <button class="btn btn-outline-danger btn-sm mx-3" @click="deleteProduct(product.product_code)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.container {
  padding-top: 48px;
  padding-left: 250px;
}
</style>