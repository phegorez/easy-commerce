import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [
      {
        name: 'test',
        imageUrl: 'https://images.unsplash.com/photo-1580537922571-ca7180cd700e?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quantity: 10,
        about: 'test',
        status: 'open',
        price: 100,
        quantity: 1
      }
    ]
  }),
  actions: {
    addToCart(productData) {
      this.items.push(productData)
    },
    updateQuantity(index, quantity) {
      this.items[index].quantity = quantity
    },
    removeItemIncart(index) {
      this.items.splice(index, 1)
      console.log('Remove Success');
    }
  },
  getters: {
    summaryPrice (state) {
      return state.items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0)
    },
    summaryQuantity (state) {
      return state.items.reduce((acc, item) => {
        return acc + item.quantity
      }, 0)
    }
  }
})
