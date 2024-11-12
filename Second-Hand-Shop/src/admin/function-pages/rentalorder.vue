<script setup>
import adminHeader from '@/admin/admin-header.vue';
import adminSidebar from '@/admin/admin-sidebar.vue';

</script>

<script>
import axios from 'axios';

export default {
  name: 'adminRentalOrder',
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
        const response = await axios.get('http://localhost:3013/products/');
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    },
    async addProduct() {
      try {
        const response = await axios.post('http://localhost:3003/products/', this.newProduct);
        if (response.status === 200 || response.status === 201) {
          this.fetchProducts();
          alert('Product added successfully');
          this.resetForm();
        }
      } catch (error) {
        console.error("There was an error adding the product!", error);
        alert('Error adding product');
      }
    },
    async deleteProduct(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          const response = await axios.delete(`http://localhost:3003/products/${id}`);
          if (response.status === 200) {
            this.fetchProducts();
            alert('Product deleted successfully');
          }
        } catch (error) {
          console.error("There was an error deleting the product!", error);
          alert('Error deleting product');
        }
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
      <h3>租借商品訂單資訊</h3>
    </div>
    <hr>
    <table class="table mt-4 table-bordered">
      <thead>
        <tr>
          <th class="p-3">訂單號碼</th>
          <th class="p-3">訂單日期</th>
          <th class="p-3">合計</th>
          <th class="p-3">歸還日期</th>
          <th class="p-3">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
            <td class="p-3">{{ product.id}}</td>
          <td class="p-3">{{ product.delivery_datetime}}</td>
          <td class="p-3">{{ product.total_amount}}</td>
          <td class="p-3">{{ product.return_datetime}}</td>
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
