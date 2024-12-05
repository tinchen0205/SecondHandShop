
<template>
  <div v-if="visible" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <h3>租借提醒</h3>
      <ul>
        <li v-for="item in itemsToNotify" :key="item.productId">
          商品名稱：{{ item.product_name }}，歸還日：{{ formatDate(item.return_datetime) }}
        </li>
      </ul>
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
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始，所以要加 1
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
  background-color: rgba(0, 0, 0, 0.5); /* 遮罩半透明 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 保證在最上層 */
}

/* Modal 內容框 */
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 顯示商品名稱及歸還日期 */
.modal-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-content li {
  margin: 10px 0;
  font-size: 16px;
  line-height: 1.5;
}

/* 關閉按鈕 */
.close-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.close-btn:hover {
  background-color: #0056b3;
}
</style>

