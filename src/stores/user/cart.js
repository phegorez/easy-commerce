import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    deliveredCost: 50,
  }),
  actions: {
    addToCart(productData) {
      this.items.push(productData);
      this.saveToStorage();
    },
    updateQuantity(index, quantity) {
      this.items[index].quantity = quantity;
      this.saveToStorage();
    },
    removeItemIncart(index) {
      this.items[index].quantity = 1;
      this.items.splice(index, 1);
      this.saveToStorage();
      console.log("Remove Success");
    },
    saveToStorage() {
      localStorage.setItem("productData", JSON.stringify(this.items));
    },
    loadFromStorage() {
      const getItem = localStorage.getItem("productData");
      const cartItems = JSON.parse(getItem);
      this.items = cartItems;
    },
  },
  getters: {
    summaryPrice(state) {
      return state.items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
    summaryQuantity(state) {
      return state.items.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
    },
    summaryTotalPrice() {
      return this.summaryPrice + this.deliveredCost;
    },
  },
});
