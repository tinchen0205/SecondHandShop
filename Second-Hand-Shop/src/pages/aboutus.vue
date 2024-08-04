<script setup>
import headerComp from "../website_homepage/header.vue"; 
import footerComp from "../website_homepage/footer.vue";
</script>
<template>
    <headerComp></headerComp>
    <div class="aboutus">
        <div class="aboutus-title">
            <h1>關於我們</h1>
        </div>
        <div class="content-section">
            <div class="content-title">
                <h2>品牌精神</h2>
            </div>
            <div class="aboutus-content">
                <h3>環保共生，物盡其用</h3>
                <p>靜宜二手物交易網致力於創造一個可持續發展的校園社區，鼓勵學生將閒置的物品重新利用，減少浪費。我們相信，每一件物品都有其價值，我們的平台讓這些物品能找到新的主人，延續它們的使用壽命。我們希望透過這樣的方式，讓更多的人了解環保的重要性，並實際參與其中，為地球的未來貢獻一份心力。</p>
            </div>
        </div>
        <div class="content-section">
            <div class="content-title">
                <h2>關於我們</h2>
            </div>
            <div class="aboutus-content">
                <h3>靜宜二手物交易網</h3>
                <p>靜宜二手物交易網是由一群靜宜大學資管系學生所建立。我們深知校園中有許多閒置的物品，可能對其他同學來說是寶貴的資源。為了減少浪費、節省資源，我們決定建立這個平台，讓校內學生能夠方便地交換、購買和出售二手物品。<br>
                我們的平台簡單易用，透過手機或電腦即可輕鬆操作。無論是書籍、文具、電子產品還是日常生活用品，都可以在這裡找到合適的買家或賣家。我們堅持提供一個安全、公正的平台，讓每一位使用者都能享受到愉快的交易體驗。<br>
                加入我們，一起為環保共生、物盡其用貢獻一份力量！</p>
            </div>
        </div>
    </div>
    <footerComp></footerComp>
</template>

<style>
.aboutus {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
  letter-spacing: 0.5px;
}

.aboutus-title {
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
}

.content-section {
    margin-bottom: 40px;
}

.content-title h2 {
    text-align: left;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
}

.aboutus-content h3 {
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.aboutus-content p {
    text-align: justify;
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.8;
}

@media (max-width: 768px) {
    .aboutus {
        padding: 10px;
    }

    .aboutus-title {
        font-size: 28px;
    }

    .content-title h2 {
        font-size: 24px;
    }

    .aboutus-content h3 {
        font-size: 20px;
    }

    .aboutus-content p {
        font-size: 14px;
    }
}
</style>
