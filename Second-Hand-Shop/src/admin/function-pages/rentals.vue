<script setup>
import adminHeader from '@/admin/admin-header.vue';
import adminSidebar from '@/admin/admin-sidebar.vue';

</script>

<script>
import axios from 'axios';

export default {
  name: 'adminRentals',
  data() {
    return {
      products: [],
      newProduct: {
        category: '',
        name: '',
        id: '',
        imageUrl: '',
        description: '',
        price: '',
        quantity:'',
        status:'',
        seller:'',
        return_datetime:'',
        rental_days:''
      },
      categories: ['3C', '家電', '生活用品', '居家', '學習用品','服飾','戶外運動','娛樂'],
      Status:['已出租','未出租']
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3011/products/');
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    },
    async addProduct() {
      try {
        const response = await axios.post('http://localhost:3011/products/', this.newProduct);
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
          const response = await axios.delete(`http://localhost:3011/products/${id}`);
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
    async editProduct(id) {
  try {
    // 發送 GET 請求以獲取特定商品的詳細資料
        const response = await axios.get(`http://localhost:3011/products/${id}`);
        
        // 將返回的資料賦值給 newProduct
        this.newProduct = { ...response.data }; // 假設 response.data 是完整的商品資料
        
        // 如果你有其他需要處理的邏輯，可以在這裡添加
      } catch (error) {
        console.error("There was an error fetching the product details!", error);
      }
    },
    async updateProduct(id) {
      try {
        const updatedProduct = { 
          category: this.newProduct.category || null,
          name: this.newProduct.product_name || null,
          productCode: this.newProduct.productCode || null,
          imageUrl: this.newProduct.imgURL || null,
          description: this.newProduct.description || null,
          price: this.newProduct.price || null,
          quantity: this.newProduct.quantity || null,
          return_datetime:this.newProduct.return_datetime || null,
          status: this.newProduct.status || null
        };
        const response = await axios.put(`http://localhost:3011/products/${id}`,updatedProduct);
        if (response.status === 200) {
          this.fetchProducts();
          alert('Product updated successfully');
          this.resetForm();
        }
      } catch (error) {
        console.error("There was an error updating the product!", error);
        alert('Error updating product');
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
      <h3>商品管理列表 Products Management</h3>
      <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#login-modal">建立新商品</button>
    </div>
    <hr>
    <table class="table mt-4 table-bordered">
      <thead>
        <tr>
          <th class="p-3">分類</th>
          <th class="p-3">商品名稱/編號</th>
          <th class="p-3">價格</th>
          <th class="p-3">狀態/歸還日期</th>
          <th class="p-3">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="p-3">{{ product.category }}</td>
          <td class="p-3">{{ product.product_name }}/{{ product.id }}</td>
          <td class="p-3">{{ product.price }}</td>
          <td class="p-3">{{ product.status }}/{{ product.return_datetime}}</td>
          <td>
            <div class="d-flex justify-content-center">
              <button class="btn btn-outline-warning btn-sm mx-3" data-bs-toggle="modal" data-bs-target="#edit-modal" @click="editProduct(product.id)">編輯</button>
              <button class="btn btn-outline-danger btn-sm mx-3" @click="deleteProduct(product.id)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- modal -->
  <div id="login-modal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <!--Header-->
        <div class="modal-header">
          <div class="modal-container text-center">
            <h3><i class="bi bi-person-circle me-1"></i>商品上架</h3>
          </div>
          <button class="btn-close" type="button" data-bs-dismiss="modal"></button>
        </div>
        <!--Body-->
        <div class="modal-body">
          <form @submit.prevent="addProduct">
            <div class="form-floating mb-3">
            <select class="form-select" v-model="newProduct.category">
              <option disabled value="">請選擇分類項目</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <label for="floatingSelect">選擇分類項目</label>
          </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.name" placeholder="輸入商品名稱">
              <label for="floatingInput">輸入商品名稱</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.imageUrl" placeholder="輸入圖片網址">
              <label for="floatingInput">輸入圖片網址</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.description" placeholder="輸入產品描述">
              <label for="floatingInput">輸入產品描述</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.price" placeholder="輸入價格">
              <label for="floatingInput">輸入價格</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.quantity" placeholder="輸入數量">
              <label for="floatingInput">輸入數量</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.rental_days" placeholder="輸入租出天數">
              <label for="floatingInput">輸入出租天數</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.seller" placeholder="輸入賣家">
              <label for="floatingInput">賣家</label>
            </div>
            <button type="submit" class="btn btn-outline-success w-100">送出</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div id="edit-modal" class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <!-- Header -->
      <div class="modal-header">
        <div class="modal-container text-center">
          <h3><i class="bi bi-person-circle me-1"></i>編輯商品</h3>
        </div>
        <button class="btn-close" type="button" data-bs-dismiss="modal"></button>
      </div>
      <!-- Body -->
      <div class="modal-body">
        <form @submit.prevent="updateProduct(newProduct.id)">
          <div class="form-floating mb-3">
            <select class="form-select" v-model="newProduct.category">
              <option disabled value="">請選擇分類項目</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <label for="floatingSelect">選擇分類項目</label>
          </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.product_name" placeholder="輸入商品名稱">
              <label for="floatingInput">輸入商品名稱</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.imgURL" placeholder="輸入圖片網址">
              <label for="floatingInput">輸入圖片網址</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.description" placeholder="輸入產品描述">
              <label for="floatingInput">輸入產品描述</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.price" placeholder="輸入價格">
              <label for="floatingInput">輸入價格</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.quantity" placeholder="輸入數量">
              <label for="floatingInput">輸入數量</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control mb-3" v-model="newProduct.return_datetime" placeholder="輸入日期(yyyy-mm-dd)">
              <label for="floatingInput">輸入歸還日期</label>
            </div>
            <div class="form-floating mb-3">
            <select class="form-select" v-model="newProduct.status">
              <option disabled value="">請選擇狀態</option>
              <option v-for="status in Status" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
            <label for="floatingSelect">選擇分類項目</label>
          </div>
            <button type="submit" class="btn btn-outline-success w-100">送出</button>
          </form>
        </div>
    </div>
  </div>
</div>
</template>

<style>
.container {
  padding-top: 48px;
  padding-left: 250px;
}
</style>