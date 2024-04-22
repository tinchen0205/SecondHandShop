
<script setup>
  import { RouterLink,RouterView } from "vue-router";
  import headerComp from "./website_homepage/header.vue"; 
  import mainComp from "./website_homepage/main_content.vue";
  import footerComp from "./website_homepage/footer.vue";
  
  
</script>


<template>
  
  <headerComp></headerComp>
  
  <nav>
    
  
    <RouterView/>
  </nav>
</template>



<style scoped>


</style>