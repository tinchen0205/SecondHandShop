import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    userId: null,
    cart: [],
    checkoutCart: [], // 新增状态
  },
  mutations: {
    setUser(state, userId) {
      state.userId = userId;
      const cartStorageKey = `shoppingCart_${userId}`;
      state.cart = JSON.parse(localStorage.getItem(cartStorageKey)) || [];
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
      commit('setUser', userId);
    },
    async addToCart({ commit }, product) {
      try {
        const response = await axios.get(`http://localhost:3008/checkquantity/${product.product_code}`);
        const quantity = response.data.quantity;
        commit('addToCart', { ...product, quantity });
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
        commit('increaseQuantity', { productCode, quantity });
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
  }
});
