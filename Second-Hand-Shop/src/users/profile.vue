<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex"; // 使用Vuex
import axios from "axios"; // Axios 用於請求後端 API
import headerComp from "@/website_homepage/header.vue"; 
import footerComp from "@/website_homepage/footer.vue";

const currentSection = ref('profile'); // 預設顯示個人資訊
const userInfo = ref({}); // 用於存放用戶資料
const orders = ref([]); // 用於存放訂單資料

const store = useStore(); // 使用Vuex儲存

// 切換部分的函數
const switchSection = async (section) => {
  currentSection.value = section;

  if (section === 'orders') {
    try {
      // 從後端獲取該用戶的訂單
      const response = await axios.get(`http://localhost:3009/orders/${store.state.userId}`);
      // 將每個訂單添加 isExpanded 屬性來控制展開狀態
      orders.value = response.data.orders.map(order => ({ ...order, isExpanded: false }));
    } catch (error) {
      console.error("獲取訂單失敗", error);
    }
  }
};

// 切換訂單展開/收起狀態
const toggleOrder = (index) => {
  if (orders.value[index]) {
    orders.value[index].isExpanded = !orders.value[index].isExpanded;
  }
};

// 在元件掛載時獲取用戶資料
onMounted(async () => {
  console.log('Mounting profile component');
  await store.dispatch('loadUserFromStorage'); // 確保從 storage 載入用戶信息
  userInfo.value = store.getters.userInfo;
  console.log('Component userInfo:', userInfo.value);
});
</script>

<template>
  <headerComp></headerComp>
  <hr>
  <h3 class="text-center pt-3">會員中心</h3>

  <!-- 切換標籤放在頂部 -->
  <div class="container text-center pt-3">
    <button class="btn-custom" @click="switchSection('profile')">個人資訊</button>
    <button class="btn-custom" @click="switchSection('orders')">訂單明細</button>
  </div>

  <div class="container pt-5 text-bg-light">
    <div class="row">
      <div class="col-12">
        <!-- 只顯示當前選擇的部分 -->
        <div v-if="currentSection === 'profile'">
          <div class="font-20">姓名：{{ userInfo.name }}</div>
          <div class="font-20">帳號：{{ userInfo.email }}</div>
        </div>

        <div v-if="currentSection === 'orders'">
          <h4>訂單明細</h4>
          <hr>
          <!-- 訂單資料表格 -->
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>訂單號碼</th>
                <th>訂單日期</th>
                <th>合計</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <!-- 使用 v-for 遍歷訂單資料 -->
              <template v-for="(order, index) in orders" :key="order.orderId">
                <tr>
                  <td>{{ order.orderId }}</td>
                  <td>{{ order.orderDate }}</td>
                  <td>{{ order.totalAmount }}</td>
                  <td>
                    <button class="btn btn-link" @click="toggleOrder(index)">
                      {{ order.isExpanded ? '收起' : '查看' }}
                    </button>
                  </td>
                </tr>

                <!-- 商品詳情顯示在對應訂單下方 -->
                <tr v-if="order.isExpanded">
                  <td colspan="4">
                    <h5>商品資訊</h5>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>商品編號</th>
                          <th>商品名稱</th>
                          <th>商品圖片</th>
                          <th>商品價格</th>
                          <th>商品數量</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="item in order.items" :key="item.id">
                          <tr>
                            <td>{{ item.product_code }}</td>
                            <td>{{ item.product_name }}</td>
                            <td><img :src="item.imgURL" alt="商品圖片" style="width: 50px; height: auto;" /></td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.quantity }}</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>

                    <h5>顧客資訊</h5>
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <td>名稱:</td>
                          <td>{{ order.orderName }}</td>
                        </tr>
                        <tr>
                          <td>Email:</td>
                          <td>{{ order.orderEmail }}</td>
                        </tr>
                        <tr>
                          <td>電話:</td>
                          <td>{{ order.orderTel }}</td>
                        </tr>
                        <tr>
                          <td>性別:</td>
                          <td>{{ order.orderGender }}</td>
                        </tr>
                        <tr>
                          <td>面交地點:</td>
                          <td>{{ order.orderAddress }}</td>
                        </tr>
                        <tr>
                          <td>面交時間:</td>
                          <td>{{ order.tradeDateTime }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <footerComp></footerComp>
</template>
