import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    userId: null,
    userInfo: {}, // 添加用戶資料
    cart: [],
    checkoutCart: [], // 新增状态
  },
  mutations: {
    setUser(state, { userId, userInfo }) {
      state.userId = userId;
      state.userInfo = userInfo;
      const cartStorageKey = `shoppingCart_${userId}`;
      state.cart = JSON.parse(localStorage.getItem(cartStorageKey)) || [];
      // 保存用户信息到 localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('userId', userId);
    },
    addToCart(state, product) {
      const existingProduct = state.cart.find(item => item.product_code === product.product_code);
      if (existingProduct) {
        if (existingProduct.quantity < product.quantity) {
          existingProduct.quantity += 1;
        } else {
          alert('已達到庫存限制');
        }
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      const cartStorageKey = `shoppingCart_${state.userId}`;
      localStorage.setItem(cartStorageKey, JSON.stringify(state.cart));
    },
    removeFromCart(state, productCode) {
      state.cart = state.cart.filter(item => item.product_code !== productCode);
      const cartStorageKey = `shoppingCart_${state.userId}`;
      localStorage.setItem(cartStorageKey, JSON.stringify(state.cart));
    },
    increaseQuantity(state, { productCode, quantity }) {
      const product = state.cart.find(item => item.product_code === productCode);
      if (product) {
        if (product.quantity < quantity) {
          product.quantity += 1;
        } else {
          alert('已達到庫存限制');
        }
        const cartStorageKey = `shoppingCart_${state.userId}`;
        localStorage.setItem(cartStorageKey, JSON.stringify(state.cart));
      }
    },
    decreaseQuantity(state, productCode) {
      const product = state.cart.find(item => item.product_code === productCode);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        const cartStorageKey = `shoppingCart_${state.userId}`;
        localStorage.setItem(cartStorageKey, JSON.stringify(state.cart));
      }
    },
    setCheckoutCart(state, cart) {
      state.checkoutCart = cart;
    },
  },
  actions: {
    async setUser({ commit }, userId) {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        const userInfo = response.data;
        commit('setUser', { userId, userInfo });
      } catch (error) {
        console.error('获取用户资料失败', error);
      }
    },
    loadUserFromStorage({ commit }) {
      const userId = localStorage.getItem('userId');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userId && userInfo) {
        commit('setUser', { userId, userInfo });
      }
    },
    async addToCart({ commit }, product) {
      try {
        const response = await axios.get(`http://localhost:3008/checkquantity/${product.product_code}`);
        const quantity = response.data.quantity;
    
        if (quantity > 0) {
          commit('addToCart', { ...product, quantity });
        } else {
          alert('商品已售罄，無法添加到購物車');
        }
      } catch (error) {
        console.error('獲取庫存信息失敗', error);
      }
    },
    
    async removeFromCart({ commit }, productCode) {
      commit('removeFromCart', productCode);
    },
    async increaseQuantity({ commit }, productCode) {
      try {
        const response = await axios.get(`http://localhost:3008/checkquantity/${productCode}`);
        const quantity = response.data.quantity;
    
        if (quantity > 0) {
          commit('increaseQuantity', { productCode, quantity });
        } else {
          alert('商品已售罄，無法增加數量');
        }
      } catch (error) {
        console.error('獲取庫存信息失敗', error);
      }
    },
    
    async decreaseQuantity({ commit }, productCode) {
      commit('decreaseQuantity', productCode);
    },
    async checkout({ commit, state }) {
      commit('setCheckoutCart', state.cart);

      // 更新 localStorage 中的数据
      const cartStorageKey = `shoppingCart_${state.userId}`;
      localStorage.setItem(cartStorageKey, JSON.stringify(state.cart));
    }
  },
  getters: {
    cartItems: state => state.cart,
    cartItemCount: state => state.cart.length,
    checkoutCart: state => state.checkoutCart,
    userInfo: state => state.userInfo, // 添加 getter 以獲取用戶資料
  }
});
