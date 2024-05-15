<script setup>
    import adminHeader from '@/admin/admin-header.vue'
    import adminSidebar from '@/admin/admin-sidebar.vue'
</script>

<script>
    import axios from 'axios';
    export default {
        name: 'adminProducts',
        data(){
            return {
                products:[]
            };
        },
        created(){
            this.fetchProducts();
        },
        methods :{
            async fetchProducts(){
                await axios.get('http://localhost:3000/products/')
                .then(respones=>{
                    this.products= respones.data;
                    console.log (this.products);
                })
                .catch(error=>{
                    console.error ("There was an error fetching the users!", error);
                })
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
                    <td class="p-3">{{ product.catelog }}</td>
                    <td class="p-3">{{ product.product_name }}/{{ product.number }}</td>
                    <td class="p-3">{{ product.price}}</td>
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
</template>

<style>
    .container {
        padding-top: 48px;
        padding-left: 250px;
    }
</style>