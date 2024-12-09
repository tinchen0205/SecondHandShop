<script>
import footerComp from "../website_homepage/footer.vue";
export default {
  name: 'Home',
  components:{
    footerComp
  }
}
</script>
<template>
  <div class="homepage">
    <h1 class="slogan" >Give it a second life, find it at SecondFind.</h1>
    <div class="pathways">
      <router-link to="/TradingArea" class="pathway">
        <div class="card">
          <h2>買賣商品區</h2>
          <p>探索並購買二手商品</p>
        </div>
      </router-link>
      <router-link to="/rentalarea" class="pathway">
        <div class="card">
          <h2>租借商品區</h2>
          <p>租借你所需要的商品</p>
        </div>
      </router-link>
    </div>
  </div>
  <footerComp></footerComp>
</template>

<style scoped>
/* 背景和頁面設計 */
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: white;
  min-height: 100vh;
}

/* 標語設計 */
.slogan {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 60px;
  font-family:'Lucida Sans', sans-serif;/* 添加手寫風格字體 */
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* 添加輕微陰影效果 */
}

/* 路徑區塊佈局 */
.pathways {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.pathway {
  text-decoration: none;
}

/* 卡片樣式設計 */
.card {
  background-color: #007799;
  border-radius: 20px;
  padding: 40px;
  width: 350px;
  height: 350px;
  text-align: center;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card:hover {
  transform: translateY(-12px);
  box-shadow: 0 18px 28px rgba(0, 0, 0, 0.2);
}

/* 標題與描述 */
h2 {
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-family: 'Arial', sans-serif;
}

p {
  color: #f9f9f9;
  font-size: 1.2rem;
  font-family: 'Arial', sans-serif;
}

/* 手機和小螢幕適配 */
@media (max-width: 768px) {
  .pathways {
    flex-direction: column;
    gap: 30px;
  }

  .card {
    width: 90%;
    height: 220px;
  }
}
</style>
