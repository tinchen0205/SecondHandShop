
<script setup>
  import { RouterLink,RouterView } from "vue-router";
  import headerComp from "./website_homepage/header.vue"; 
  import mainComp from "./website_homepage/main_content.vue";
  import footerComp from "./website_homepage/footer.vue";
  
  
</script>


<template>
  <div class="container">
    <img class="img-fluid mx-auto d-block w-25 pt-3" src="/bego.png">      
  </div>
  <hr class="col-9 mx-auto">
  
  
  <nav>
    

    <RouterView/>
  </nav>
</template>



<style scoped>

</style>