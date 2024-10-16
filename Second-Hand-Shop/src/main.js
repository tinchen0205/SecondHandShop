import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import store from './store';
import { createApp } from 'vue'
const app = createApp(App);

app.use(router);
store.dispatch('loadUserFromStorage')
  .then(() => {
    // 成功加載後掛載應用
    app.use(store).mount('#app');
  })
  .catch((error) => {
    // 處理加載過程中的錯誤
    console.error('Failed to load user from storage:', error);
    // 即使出錯也掛載應用，確保應用可以正常使用
    app.use(store).mount('#app');
  });