import { defineStore } from 'pinia'

import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '@/firebase';


export const useProductStore = defineStore('product', {
  state: () => ({
    list: []
  }),
  actions: {
    filterProducts(searchText) {
      return this.list.filter(product => product.name.includes(searchText))
    },
    async loadProductsFromStorage() {
      const getItemSnapshot = await getDocs(collection(db, 'products'));
      const products = getItemSnapshot.docs.map(doc => doc.data())
      if (products.length > 0) {
          this.list = products
          this.loaded = true
      }
  },
  }
})

