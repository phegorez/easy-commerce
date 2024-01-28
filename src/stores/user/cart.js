import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    shippingCost: 50,
    checkoutObj: {}
  }),
  actions: {
    addToCart(productData) {
      // find index if not found in items[] reuturn -1 if found item return current index
      const findProductIndex = this.items.findIndex(item => {
        return item.name === productData.name
      })
      
      if (findProductIndex < 0) { // if findProductIndex < 0 (if not found item in items[])
        productData.quantity = 1 // add quantity = 1
        this.items.push(productData); //push productData to items
        this.saveToStorage(); // invoke saveToStorage
      } else { // if found current item match with 0, 1, 2, ... not < 0
        const currentItem = this.items[findProductIndex] //pick current item with findProductIndex
        this.updateQuantity(findProductIndex, currentItem.quantity + 1) //invoke updateQuantity
      }
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
    checkout(userData) {
      const orderData = {
        ...userData,
        totalPrice: this.summaryPrice,
        paymentMethod: 'paypal',
        orderDate: (new Date()).toLocaleString(),
        orderID: `SS${Math.floor(Math.random() * 90000 + 10000)}`,
        product: this.items
      }
      localStorage.setItem('order-data', JSON.stringify(orderData))
    },
    loadCheckout() {
      const orderData = localStorage.getItem("order-data")
        if(orderData) {
          this.checkoutObj = JSON.parse(orderData)
        }
    },
    saveToStorage() {
      localStorage.setItem("productData", JSON.stringify(this.items));
    },
    loadCartFromStorage() {
      if (localStorage.getItem("productData")) {
        const getItem = localStorage.getItem("productData");
        const cartItems = JSON.parse(getItem);
        this.items = cartItems;
      }
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
      return this.summaryPrice + this.shippingCost;
    },
  },
});
