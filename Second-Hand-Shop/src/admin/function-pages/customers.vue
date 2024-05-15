<script setup>
    import adminHeader from '@/admin/admin-header.vue'
    import adminSidebar from '@/admin/admin-sidebar.vue'
</script>

<script>
    import axios from 'axios';
    export default {
        name: 'Customers',
        data(){
            return {
                users:[]
            };
        },
        created(){
            this.fetchUsers();
        },
        methods :{
            async fetchUsers(){
                await axios.get('http://localhost:3000/Customers/')
                .then(respones=>{
                    this.users= respones.data;
                    console.log (this.users);
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
            <h3>使用者管理列表 Customers Management</h3>
        </div>
        <hr>
        <table class="table mt-4 table-bordered">
            <thead>
                <tr>
                    <th class="p-3">名字</th>
                    <th class="p-3">Gmail</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td class="p-3">{{ user.name }}</td>
                    <td class="p-3">{{ user.email }}</td>
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