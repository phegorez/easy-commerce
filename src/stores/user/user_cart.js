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

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    shippingCost: 50,
    checkout: {},
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

        // console.log('orderData', checkoutData);
        // console.log('products', checkoutData.products);

        const response = await axios.post('/api/placeorder', {
          source: 'test_src', //add while make omise
          checkout: checkoutData
        })

        // const mockup = {
        //   ...checkoutData,
        //   orderID: 1234,
        //   paymentMethod: 'bitcoin'
        // }


        // console.log('response', response.data);
        // this.saveCheckout(mockup)
        return response.data
        // const batch = writeBatch(db)

        // for (const product of orderData.product) {
        //   const productRef = doc(db, 'products', product.productId)

        //   // Fetch the current remainQuantity from Firestore
        //   const productDoc = await getDoc(productRef);
        //   const currentQuantity = productDoc.data().remainQuantity;

        //   // Throw an error if remainQuantity is already 0
        //   if (currentQuantity === 0) {
        //     throw new Error(`Product ID ${product.productId} is out of stock`);
        //   }

        //   if (currentQuantity > 0) {
        //     batch.update(productRef, {
        //       remainQuantity: increment(-1)
        //     });
        //   }

        //   await batch.commit()
        // }

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
