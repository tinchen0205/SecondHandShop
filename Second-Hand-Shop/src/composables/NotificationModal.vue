<template>
  <div v-if="visible" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <h3>租借提醒</h3>
      <table class="notification-table">
        <thead>
          <tr>
            <th>商品圖片</th>
            <th>商品名稱</th>
            <th>租借天數</th>
            <th>起始日期</th>
            <th>歸還日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in itemsToNotify" :key="item.productId">
            <td><img :src="item.imgURL" alt="商品圖片" class="product-img"></td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.days }}</td>
            <td>{{ formatDate(item.delivery_datetime) }}</td>
            <td class="return-date">{{ formatDate(item.return_datetime) }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="closeModal" class="close-btn">確定</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemsToNotify: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    // 關閉 modal
    closeModal() {
      this.visible = false;
    },
    // 格式化時間
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}年${month}月${day}日 ${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
/* Modal 背景遮罩 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal 內容框 */
.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 800px; /* 增加寬度 */
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 表格樣式 */
.notification-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0; /* 增加上下間距 */
  font-size: 15px; /* 調整字體大小 */
}

.notification-table th,
.notification-table td {
  border: 1px solid #ddd;
  padding: 12px; /* 增加內邊距 */
  text-align: center;
}

.notification-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.product-img {
  max-width: 50px; /* 調整圖片大小 */
  height: auto;
  border-radius: 5px;
}

.return-date {
  color: red;
  font-weight: bold;
}

/* 關閉按鈕 */
.close-btn {
  margin-top: 20px;
  padding: 12px 24px; /* 增大按鈕尺寸 */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px; /* 增加字體大小 */
}

.close-btn:hover {
  background-color: #0056b3;
}
</style>
