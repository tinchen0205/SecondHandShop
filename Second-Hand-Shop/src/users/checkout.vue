<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import headerComp from "../website_homepage/header.vue";
import footerComp from "../website_homepage/footer.vue";
import Flatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

const store = useStore();
const router = useRouter();
const checkoutCart = computed(() => store.getters.checkoutCart);
const checkoutTotal = computed(() => checkoutCart.value.reduce((total, item) => total + item.price * item.quantity, 0));

const form = ref({
  user: {
    email: '',
    name: '',
    tel: '',
    gender: '', 
  },
  delivery: {
    deliveryAddress: '',
    deliveryDateTime: ''
  },
  message: ''
});

const flatpickrOptions = {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,
  minDate: "today",
  maxDate: new Date().fp_incr(30) // 未來30天
};

const isCartExpanded = ref(false);

const toggleCartVisibility = () => {
  isCartExpanded.value = !isCartExpanded.value;
};

// 新增表單驗證訊息
const formErrors = ref({
  name: '',
  email: '',
  tel: '',
  gender: '',
  deliveryAddress: '',
  deliveryDateTime: ''
});

const validateForm = () => {
  let isValid = true;

  // 驗證姓名
  if (!form.value.user.name) {
    formErrors.value.name = '姓名為必填項目';
    isValid = false;
  } else {
    formErrors.value.name = '';
  }

  // 驗證電子郵件
  if (!form.value.user.email) {
    formErrors.value.email = '電子郵件為必填項目';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.user.email)) {
    formErrors.value.email = '電子郵件格式不正確';
    isValid = false;
  } else {
    formErrors.value.email = '';
  }

  // 驗證電話號碼
  if (!form.value.user.tel) {
    formErrors.value.tel = '電話號碼為必填項目';
    isValid = false;
  } else if (!/^\d{10}$/.test(form.value.user.tel)) {
    formErrors.value.tel = '電話號碼必須為10位數字';
    isValid = false;
  } else {
    formErrors.value.tel = '';
  }

  // 驗證性別
  if (!form.value.user.gender) {
    formErrors.value.gender = '性別為必填項目';
    isValid = false;
  } else {
    formErrors.value.gender = '';
  }

  // 驗證面交地點
  if (!form.value.delivery.deliveryAddress) {
    formErrors.value.deliveryAddress = '面交地點為必填項目';
    isValid = false;
  } else {
    formErrors.value.deliveryAddress = '';
  }

  // 驗證面交日期與時間
  if (!form.value.delivery.deliveryDateTime) {
    formErrors.value.deliveryDateTime = '面交日期與時間為必填項目';
    isValid = false;
  } else {
    formErrors.value.deliveryDateTime = '';
  }

  return isValid;
};
const resetForm = () => {
  form.value = {
    user: {
      email: '',
      name: '',
      tel: '',
      gender: '',
    },
    delivery: {
      deliveryAddress: '',
      deliveryDateTime: ''
    }
  };
};

const submitForm = async () => {
  form.value.user.userId = store.state.userId;
  if (validateForm()) {
    console.log('Form Data:', form.value);

    try {
      const response = await axios.post('http://localhost:3009/submit-order', {
        user: form.value.user,
        delivery: form.value.delivery,
        cartItems: checkoutCart.value,
        totalAmount: checkoutTotal.value,
        message: form.value.message
      });

      const orderId = response.data.orderId;  // 获取返回的订单 ID

      // 重置表單與購物車
      store.commit('setCheckoutCart', []);
      const cartStorageKey = `shoppingCart_${store.state.userId}`;
      localStorage.removeItem(cartStorageKey);
      resetForm(); 
      
      // 跳轉到訂單確認頁面，並將 orderId 傳遞過去
      router.push(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error('提交訂單失敗', error);
    }
  }
};


onMounted(() => {
  const cartStorageKey = `shoppingCart_${store.state.userId}`;
  const savedCart = JSON.parse(localStorage.getItem(cartStorageKey)) || [];
  store.commit('setCheckoutCart', savedCart);
  console.log("User ID in store:", store.state.userId);
});

const genders = ['男', '女', '其他'];
const locations = ['靜宜大學校門口', '至善樓學餐門口', '蓋夏圖書館門口', '希嘉學苑門口', '思高學苑門口', '善牧學苑門口', '主顧樓門口', '任垣樓門口'];
</script>

<template>
  <headerComp></headerComp>
  <div class="checkout-container">
    <div class="cart-summary">
      <button @click="toggleCartVisibility" class="toggle-cart-button">
        合計: NT${{ checkoutTotal }} {{ isCartExpanded ? '▲' : '▼' }}
      </button>
    </div>
    <div v-if="isCartExpanded">
      <table class="cart-table">
        <thead>
          <tr>
            <th>商品圖片</th>
            <th>商品名稱</th>
            <th>單件價格</th>
            <th>數量</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in checkoutCart" :key="item.product_code">
            <td><img :src="item.imgURL" alt="Product Image" class="cart-item-image" /></td>
            <td>{{ item.product_name }}</td>
            <td>NT${{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>NT${{ item.quantity * item.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="empty-cart" v-if="checkoutCart.length === 0">
      <p>您的購物車是空的</p>
    </div>
  </div>

  <div class="form-container">
    <div class="form-section">
      <h2>個人資料</h2>
      <label for="name">姓名</label>
      <input v-model="form.user.name" type="text" id="name" required aria-required="true" />
      <span class="error-message" v-if="formErrors.name">{{ formErrors.name }}</span>

      <label for="email">電子郵件</label>
      <input v-model="form.user.email" type="email" id="email" required aria-required="true" />
      <span class="error-message" v-if="formErrors.email">{{ formErrors.email }}</span>

      <label for="tel">電話號碼</label>
      <input v-model="form.user.tel" type="tel" id="tel" required aria-required="true" />
      <span class="error-message" v-if="formErrors.tel">{{ formErrors.tel }}</span>

      <label for="gender">性別</label>
      <select v-model="form.user.gender" id="gender" required aria-required="true">
        <option value="" disabled>請選擇性別</option>
        <option v-for="gender in genders" :key="gender" :value="gender">{{ gender }}</option>
      </select>
      <span class="error-message" v-if="formErrors.gender">{{ formErrors.gender }}</span>

    </div>

    <div class="form-section">
      <h2>交易資料</h2>
      <label for="deliveryAddress">面交地點</label>
      <select v-model="form.delivery.deliveryAddress" id="deliveryAddress" required>
        <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
      </select>
      <span class="error-message" v-if="formErrors.deliveryAddress">{{ formErrors.deliveryAddress }}</span>

      <label for="deliveryDateTime">面交日期與時間</label>
      <Flatpickr v-model="form.delivery.deliveryDateTime" :config="flatpickrOptions" id="deliveryDateTime"/>
      <span class="error-message" v-if="formErrors.deliveryDateTime">{{ formErrors.deliveryDateTime }}</span>
    </div>
  </div>
  
  <button @click="submitForm" class="submit-button">提交訂單</button>
  <footerComp></footerComp>
</template>

<style>
.checkout-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-summary {
  text-align: center;
}

.toggle-cart-button {
  background-color: white;
  color: #000000;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-weight: bolder;
  font-size: 20px;
  cursor: pointer;
  margin-top: 10px;
  align-items: center;
}

.toggle-cart-button:hover {
  background-color: white;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.cart-table th, .cart-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.cart-item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.form-container {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 20px auto;
  max-width: 1000px;
}

.form-section {
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section:last-child {
  margin-right: 0;
}

.form-section h2 {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-button {
  display: block;
  width: 200px;
  margin: 20px auto;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
}
</style>
