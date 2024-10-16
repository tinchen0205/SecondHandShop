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
    <h1>靜宜二手物交易網</h1>
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
  background-color: white; /* 柔和的背景顏色 */
  min-height: 100vh;
}

h1 {
  color: #2c3e50;
  font-size: 3rem;
  margin-bottom: 60px;
  font-family: 'Arial', sans-serif;
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
  background-color: #007799 ;
  border: none; 
  border-radius: 20px;
  padding: 40px;
  width: 350px; /* 增加卡片寬度 */
  height: 350px; /* 增加卡片高度 */
  text-align: center;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  /* Flexbox 居中佈局 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
}

.card:hover {
  transform: translateY(-12px);
  box-shadow: 0 18px 28px rgba(0, 0, 0, 0.2); /* 強化滑過時的陰影效果 */
}

/* 標題與描述 */
h2 {
  color: #fff;
  font-size: 1.8rem; /* 增加標題字體大小 */
  margin-bottom: 15px;
  font-family: 'Arial', sans-serif;
}

p {
  color: #f9f9f9;
  font-size: 1.2rem; /* 增加描述字體大小 */
  font-family: 'Arial', sans-serif;
}

/* 手機和小螢幕適配 */
@media (max-width: 768px) {
  .pathways {
    flex-direction: column;
    gap: 30px; /* 增加間距 */
  }
  
  .card {
    width: 90%;
    height: 220px;
  }
}
</style>
