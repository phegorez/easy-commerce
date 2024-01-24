import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [
      {
        name: 'test',
        imageUrl: 'https://images.unsplash.com/photo-1580537922571-ca7180cd700e?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quantity: 10,
        about: 'test',
        status: 'open',
        price: 100,
        quantity: 1
      },
      {
        name: 'test1234',
        imageUrl: 'https://images.unsplash.com/photo-1569977621579-58987bec59cd?q=80&w=997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quantity: 120,
        about: 'test222',
        status: 'open',
        price: 100,
        quantity: 1
      },
    ]
  }),
  actions: {
    filterProducts(searchText) {
      return this.list.filter(product => product.name.includes(searchText))
    }
  }
})
