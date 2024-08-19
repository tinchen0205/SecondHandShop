import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import store from './store';
import { createApp } from 'vue'
const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');
