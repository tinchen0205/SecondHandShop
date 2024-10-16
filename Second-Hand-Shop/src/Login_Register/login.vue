// login.vue
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useStore } from 'vuex';

export default {
  name: 'LoginComponent',
  setup() {
    const email = ref('');
    const password = ref('');
    const { login, error } = useAuth();
    const store = useStore();
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const response = await login(email.value, password.value);
        store.dispatch('setUser', response.id); // 设置 userId 并更新购物车
        console.log('Dispatched userId to Vuex:', response.id); // 检查是否成功 dispatch
        alert('登入成功');

        // 檢查帳號和密碼是否匹配特定值，若是則導向到 /admin
        if (email.value === 'admin@example.com' && password.value === 'Puadmin12345') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } catch (err) {
        alert('Login Error: ' + error.value);
      }
    };

    return {
      email,
      password,
      handleLogin
    };
  }
};
</script>

<template>
  <div class="text-center">
    <main class="form-signin">
      <form class="login col-6 mx-auto mt-5" @submit.prevent="handleLogin"> 
        <h1 class="h3 mb-3 fw-normal">登入</h1>
        <div class="d-flex justify-content-center">
          <div class="form-floating mb-3 col-6">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email" />
            <label for="floatingInput">Email address</label>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="form-floating mb-3 col-6">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password" />
            <label for="floatingPassword">Password</label>
          </div>
        </div>
        <div class="d-flex justify-content-center mb-3">
          <button class="btn btn-sm btn-outline-success col-3 circle" type="submit">登入</button>
          <div class="mx-1"></div>
          <router-link to="/Register" class="btn btn-sm btn-outline-warning col-3 circle">註冊</router-link>
        </div>
        <div>
          <router-link to="/" class="btn btn-sm btn-outline-secondary col-3 circle">首頁</router-link>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
.login {
  background-color: #FAEBD7;
  padding: 40px;
  box-shadow: 5px 5px 10px #D8D8EB;
}

.form-control {
  outline: none !important;
  box-shadow: none !important;
  border-color: #D8D8EB;
}

.circle {
  border-radius: 25px;
}
</style>
