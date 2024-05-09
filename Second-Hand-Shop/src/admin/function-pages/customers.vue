<script setup>
    import adminHeader from '@/admin/admin-header.vue'
    import adminSidebar from '@/admin/admin-sidebar.vue'
</script>

<script>
     export default {
        name : 'Customers',
    }
</script>

<template>
    <adminHeader></adminHeader>
    <adminSidebar></adminSidebar>
    <div class="container">
        <h4> hello</h4>
    </div>
</template>

<style>
    .container{
        padding-top : 48px;
        padding-left :280px;
    }
</style>