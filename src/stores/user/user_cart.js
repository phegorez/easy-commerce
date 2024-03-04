import { defineStore } from "pinia";
import axios from "axios";

import { db, realtimeDB } from '@/firebase';

import { ref, onValue, set } from "firebase/database"

import { useAccountStore } from '@/stores/account'

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    shippingCost: 50,
    checkoutObj: {},
    cartID: "",
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
        const orderData = {
          ...userData,
          products: this.items.map(product => ({
            productId: product.productId,
            quantity: product.quantity
          }))
        };

        console.log('orderData', orderData);

        const response = await axios.post('/api/placeorder', {
          source: 'test_src',
          checkout: orderData
        })

        console.log('response', response.data);

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
    loadCheckout() {
      const orderData = localStorage.getItem("order-data");
      if (orderData) {
        this.checkoutObj = JSON.parse(orderData);
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("cart-data", JSON.stringify(this.items));
    },
    loadFromLocalStorage() {
      if(localStorage.getItem("cart-data")) {
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
          if(data) {
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
