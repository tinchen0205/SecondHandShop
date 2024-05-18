// src/composables/useAuth.js
import { ref } from 'vue';
import axios from 'axios';

const isLogin = ref(false);
const username = ref('');
const error = ref('');

export function useAuth() {
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login/', {
        email,
        password
      });
      isLogin.value = true;
      username.value = response.data.name;
      localStorage.setItem('user', JSON.stringify({ name: username.value }));
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed';
      throw new Error(error.value);
    }
  };

  const logout = () => {
    isLogin.value = false;
    username.value = '';
    localStorage.removeItem('user');
  };

  const checkLogin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      isLogin.value = true;
      username.value = user.name;
    }
  };

  return {
    isLogin,
    username,
    error,
    login,
    logout,
    checkLogin
  };
}
