<script setup>
    import adminHeader from '../admin/admin-header.vue'
    import adminSidebar from '../admin/admin-sidebar.vue'
    import adminHome from '../admin/admin-home.vue'
</script>
<script>
    export default {
        name:'admin',
    }
</script>
<template>
    <div class="d-flex" style="height: 100vh;">
        <adminHeader/>
        <adminSidebar/>
        <adminHome/>
    </div>
  
    
</template>