<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
 
const cards = ref([]);

const fetchCards = async () => {
  try {
    const response = await axios.get('http://localhost:3005/products/');
    cards.value = response.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
  }
};

onMounted(() => {
  fetchCards();
});
</script>

<template>
<main>
  <div class="bg-light">
  <section class="py-5 text-center ">
    <div id="slideshow" class="carousel slide">
        <div class="carousel-inner">
            <!--P1-->
            <div class="carousel-item active">
                <img class="slide-image w-100" src="/pic1.jpg" alt="slide1">
                <div class="carousel-caption">
                  <h1 class="fw-light">靜宜大學-二手物交易網站</h1>
                    
                </div>
            </div>
                <!--P2-->
            <div class="carousel-item">
                <img class="slide-image w-100" src="/pic2.jpg" alt="slide2">
                <div class="carousel-caption">
                    <h3></h3>
                    
                </div>
            </div>
                <!--P3-->
            <div class="carousel-item">
                <img class="slide-image w-100" src="/pic3.jpg" alt="slide3">
                <div class="carousel-caption">
                    <h3></h3>
                </div>
            </div>
                  <!--左右按鈕 -->
            <button class="carousel-control-prev" type="button" data-bs-target="#slideshow" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#slideshow"data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>

            <div class="carousel-indicators">
                <button type="button" data-bs-target="#slideshow" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#slideshow" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#slideshow" data-bs-slide-to="2"></button>
            </div>
        </div>
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
          <p class="lead text-muted">靜宜大學的二手物品交易平台為學生提供了一個方便快捷的網路市集，讓同學們可以輕鬆地買賣二手物品。透過網站，你可以輕鬆地尋找到自己需要的物品，同時也可以將自己不再需要的物品出售給其他同學。這個平台不僅讓學生間的物品交易更加便利，也促進了資源的有效利用，為校園生活增添了更多便利性和活力。</p>
          </div>
        </div>
    </div>
  </section>
</div>

  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div v-for="(card, index) in cards" :key="index" class="col">
          <div class="card shadow-sm">
            <img :src="card.imgURL" class="bd-placeholder-img card-img-top mt-3" width="100%" height="225" alt="Product Image">
            <div class="card-body">
              <h4 class="card-text">{{ card.product_name }}</h4>
              <p class="card-text">{{ card.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">檢視</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">收藏</button>
                </div>
                <div class="card-text">
                    售價:{{card.price}}
                </div>
                <small class="text-muted">{{ card.time }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<style scoped>
.carousel-caption {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
}
.carousel-indicators button:hover {
  background-color: orangered;
  opacity: 1;
}
.carousel-indicators .active {
  background-color: orangered;
  opacity: 1;
}
</style>
