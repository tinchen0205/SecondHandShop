<script setup>
import adminHeader from '@/admin/admin-header.vue'
import adminSidebar from '@/admin/admin-sidebar.vue'

</script>

<script>
import axios from 'axios';
export default {
    name: 'adminProducts',
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
                const response = await axios.get('http://localhost:3001/products/');
                this.products = response.data;
                console.log(this.products);
            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        },
        async addProduct() {
            try {
                const response = await axios.post('http://localhost:3000/products/', this.newProduct);
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
                    <th class="p-3">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td class="p-3">{{ product.category }}</td>
                    <td class="p-3">{{ product.product_name }}/{{ product.product_code }}</td>
                    <td class="p-3">{{ product.price }}</td>
                    <td>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-outline-primary btn-sm mx-3">編輯</button>
                            <button class="btn btn-outline-danger btn-sm mx-3">刪除</button>
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
                            <input type="text" class="form-control mb-3" v-model="newProduct.category" placeholder="輸入分類項目">
                            <label for="floatingInput">輸入分類項目</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control mb-3" v-model="newProduct.name" placeholder="輸入商品名稱">
                            <label for="floatingInput">輸入商品名稱</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control mb-3" v-model="newProduct.productCode" placeholder="輸入商品編號">
                            <label for="floatingInput">輸入商品編號</label>
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
