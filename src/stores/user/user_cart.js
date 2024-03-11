import { defineStore } from "pinia";
import axios from "axios";

import {
  doc,
  getDoc,
  collection,
  getDocs
} from 'firebase/firestore'

import { db, realtimeDB } from '@/firebase';

import { ref, onValue, set } from "firebase/database"

import { useAccountStore } from '@/stores/account'

Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY)

const createSource = (amount) => {
  return new Promise((resolve, reject) => {
    // send source to omise for take source token back to front-end
    Omise.createSource('rabbit_linepay', {
      amount: (amount * 100),
      currency: 'THB'
    }, (statusCode, response) => {
      if (statusCode !== 200) {
        return reject(response)
      }
      resolve(response);
    })
  })
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    shippingCost: 50,
    checkout: {},
    // url: ''
  }),
  actions: {
    async addToCart(productData) {
      // find index if not found in items[] reuturn -1 if found item return current index
      const findProductIndex = this.items.findIndex((item) => {
        return item.name === productData.name;
      });

      if (findProductIndex < 0) {
        // if findProductIndex < 0 (if not found item in items[])
        productData.quantity = 1; // add quantity = 1
        this.items.push(productData); //push productData to items
        this.saveToLocalStorage(); // invoke saveToStorage
      } else {
        // if found current item match with 0, 1, 2, ... not < 0
        const currentItem = this.items[findProductIndex]; //pick current item with findProductIndex
        this.updateQuantity(findProductIndex, currentItem.quantity + 1); //invoke updateQuantity
      }
      await set(this.cartRef, this.items)

    },
    async updateQuantity(index, quantity) {
      this.items[index].quantity = quantity;
      this.saveToLocalStorage();
      await set(this.cartRef, this.items)
    },
    async removeItemIncart(index) {
      // this.items[index].quantity = 1;
      this.items.splice(index, 1);
      this.saveToLocalStorage();
      await set(this.cartRef, this.items)
    },
    async checkout(userData) {
      try {
        const checkoutData = {
          ...userData,
          products: this.items.map(product => ({
            name: product.name,
            imageUrl: product.imageUrl,
            productId: product.productId,
            quantity: product.quantity,
            price: product.price
          }))
        };

        const omiseResponse = await createSource(this.summaryTotalPrice)

        console.log('orderData', omiseResponse);

        // console.log('orderData', checkoutData);
        // console.log('products', checkoutData.products);
        // 
        const response = await axios.post('/api/placeorder', {
          source: omiseResponse.id, //omise source token
          checkout: checkoutData
        })

        return response.data
        // this.url = response.data.redirectUrl
        // console.log(response.data.redirectUrl);
        
      } catch (err) {
        console.log('error', err);
      }
    },
    async loadCheckout(orderId) {
      try {
        const orderRef = doc(db, 'orders', orderId)
        const orderSnapshot = await getDoc(orderRef)
        let orderData = orderSnapshot.data()
        this.checkout = orderData
        this.checkout.orderId = orderSnapshot.id
        this.checkout.createdAt = orderData.createdAt.toDate().toLocaleString()
      } catch (err) {
        console.log('error:', err);
      }
    },
    saveCheckout(orderData) {
      localStorage.setItem("order-data", JSON.stringify(orderData))
    },
    saveToLocalStorage() {
      localStorage.setItem("cart-data", JSON.stringify(this.items));
    },
    loadFromLocalStorage() {
      if (localStorage.getItem("cart-data")) {
        const getItem = localStorage.getItem("cart-data");
        const previousItem = JSON.parse(getItem)
        this.items = previousItem
      }
    },
    async loadCartFromStorage() {
      // console.log('cart user', this.user);
      if (this.user.uid) {
        // console.log('login');
        onValue(this.cartRef, (snapshot) => {
          const data = snapshot.val()
          if (data) {
            this.items = data
          }
        }, (err) => {
          console.log('error', err);
        })
      } else {
        console.log('nope');
        this.loadFromLocalStorage()
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
    user(state) {
      const accountStore = useAccountStore()
      return accountStore.user
    },
    cartRef(state) {
      return ref(realtimeDB, `carts/${this.user.uid}`)
    }
  },
});
