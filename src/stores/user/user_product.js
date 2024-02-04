import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: []
  }),
  actions: {
    filterProducts(searchText) {
      return this.list.filter(product => product.name.includes(searchText))
    },
    loadProductsFromStorage() {
      const getItem = localStorage.getItem("Admin-Product-Data")
      if (getItem) {
          const products = getItem
          this.list = JSON.parse(products);
          this.loaded = true
      }
  },
  }
})
