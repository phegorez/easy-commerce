import { defineStore } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [],
    loaded: false,
  }),
  actions: {
    getProduct(index) {
      if (!this.loaded) {
        this.loadProductsFromStorage();
      }
      return this.list[index];
    },
    addProduct(productData) {
      productData.remainQuantity = productData.quantity;
      //   productData.updatedAt = new Date().toLocaleString();
      this.list.push(productData);
      this.saveToStorage();
    },
    updateProduct(index, productData) {
      console.log(productData);
      const fields = [
        "name",
        "imageUrl",
        "price",
        "quantity",
        "about",
        "status",
      ];
      for (let field of fields) {
        this.list[index][field] = productData[field];
      }
      this.list[index].remainQuantity = productData.quantity;
      this.list[index] = new Date().toLocaleString();
      console.log(this.list[index]);
      this.saveToStorage();
    },
    removeProduct(index) {
      this.list.splice(index, 1);
      this.saveToStorage();
    },
    saveToStorage() {
      console.log(this.list);
      localStorage.setItem("Admin-Product-Data", JSON.stringify(this.list));
    },

    loadProductsFromStorage() {
      const getItem = localStorage.getItem("Admin-Product-Data");
      if (getItem) {
        const products = getItem;
        this.list = JSON.parse(products);
        this.loaded = true;
      }
    },
  },
  getters: {},
});
