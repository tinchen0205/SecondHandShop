<template>
  <div>
    <headerComp></headerComp>
    <div class="faqs">
      <div class="FAQS-title">
        <h1>常見問題</h1>
      </div>
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <h2>{{ faq.question }}</h2>
        <p>{{ faq.answer }}</p>
        <hr class="faq-divider" />
      </div>
    </div>
    <footerComp></footerComp>
  </div>
</template>

<script>
import headerComp from "../website_homepage/header.vue"; 
import footerComp from "../website_homepage/footer.vue";

export default {
  components: {
    headerComp,
    footerComp
  },
  data() {
    return {
      faqs: [
        { question: "Q1 : 購買流程 ? ", answer: "A : 購買流程 : 註冊登入→選購商品→加入購物車→選擇面交地點、時間→確認訂單內容→完成→等待面交日" },
        { question: "Q2 : 如何註冊 ? ", answer: "A : 您可以透過首頁中的註冊按鈕，輸入Email、密碼及名稱進行註冊。" },
        { question: "Q3 : 如何刊登商品 ? ", answer: "A :登入後，您可以在首頁中看到刊登商品的按鈕，點擊按鈕可以進入刊登商品的表單。\n完整填妥表單送出後，審核人員會盡速審核你的商品完成刊登，並以Eamil通知您審核結果。"},
        { question: "Q4 : 如何支付 ? ", answer: "A : 我們只有提供約定面交付款，以此保障雙方交易安全。" },
        { question: "Q5 : 如何連絡賣家 ? ", answer:"A : 您可以在商品詳細資訊中找到賣家的聯絡方式。"},
        { question: "Q6 : 是否可以保證商品狀況 ? ", answer:"A : 由於是二手物交易，我們並無法掌握賣家商品的狀況。請您以商品圖片及描述自行評估，並在面交時與賣家確認好商品狀況，符合您的預期再進行付款交易。"},
        { question: "Q7 : 商品加入購物車，是否會保留商品 ? ",answer:"A : 商品加入購物車後，但尚未完成訂單前，都是無法保留狀況。在請見諒。"}
      ]
    };
  }
};
</script>

<style scoped>
.faqs {
  max-width: 850px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.8;
  letter-spacing: 0.5px;
}

.FAQS-title {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.faq-item {
  margin-bottom: 20px;
}

.faq-item h2 {
  font-size: 24px;
  font-weight: bold;
  color: rgb(37,76,179);
  text-align: left;
  margin-bottom: 10px;
}

.faq-item p {
  font-size: 16px;
  color: #212529;
  text-align: left;
}

.faq-divider {
  border: none;
  border-top: 1px solid #ddd;
  margin-top: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .faqs {
    padding: 10px;
  }

  .FAQS-title {
    font-size: 28px;
  }

  .faq-item h2 {
    font-size: 20px;
  }

  .faq-item p {
    font-size: 14px;
  }
}
</style>
