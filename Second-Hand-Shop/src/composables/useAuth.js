// src/composables/useAuth.js
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const isLogin = ref(false);
const username = ref('');
const userId = ref(null);
const error = ref('');

export function useAuth() {
  const store = useStore();

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login/', { email, password });
      isLogin.value = true;
      username.value = response.data.name;
      userId.value = response.data.id;
      localStorage.setItem('user', JSON.stringify({ name: username.value , userId: userId.value })); 
      store.dispatch('setUser', userId.value); // 更新 Vuex 的 userId 和購物車
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed';
      throw new Error(error.value);
    }
  };

  const logout = () => {
    isLogin.value = false;
    username.value = '';
    userId.value = null;
    localStorage.removeItem('user');
  };

  const checkLogin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      isLogin.value = true;
      username.value = user.name;
      userId.value = user.userId;
      store.dispatch('setUser', user.userId); // 設置 userId 並更新購物車
    }
  };

  return {
    isLogin,
    username,
    userId,
    error,
    login,
    logout,
    checkLogin
  };
}
