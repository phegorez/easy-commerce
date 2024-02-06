import { defineStore } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [],
    selectedProduct: {},
  }),
  actions: {
    async getProduct() {
      try {
        const response = await axios.get(`${API_URL}/products`);
        const data = response.data;
        this.list = data;
      } catch (err) {
        console.log("Error loading product", err);
      }
    },
    async getProductsbyID(productId) {
      try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        const data = response.data;
        this.selectedProduct = data;
      } catch (err) {
        console.log("Error loading product", err);
      }
    },
    async addProduct(productData) {
      const newProduct = {
        name: productData.name,
        imageUrl: productData.imageUrl,
        price: parseInt(productData.price),
        quantity: parseInt(productData.quantity),
        remainQuantity: parseInt(productData.quantity),
        about: productData.about,
        status: productData.status,
        updatedAt: new Date().toLocaleString(),
      };
      //post
      try {
        const response = await axios.post(`${API_URL}/products`, newProduct);
        const data = response.data;
        this.list.push(data);
      } catch (err) {
        console.log("Error loading product", err);
      }
      // productData.remainQuantity = productData.quantity;
      // productData.updatedAt = new Date().toLocaleString();
      // this.list.push(productData);
      // this.saveToStorage();
    },
    async updateProduct(productID, productData) {
      console.log(productID, productData);
      // try {
      //   const response = await axios.put(
      //     `${API_URL}/products/${productID}`,
      //     productData,
      //   );
      //   const data = response.data;
      //   this.selectedProduct = data;
      // } catch (err) {
      //   console.log("Error loading product", err);
      // }
      // console.log(productData);
      // const fields = [
      //   "name",
      //   "imageUrl",
      //   "price",
      //   "quantity",
      //   "about",
      //   "status",
      // ];
      // for (let field of fields) {
      //   this.list[index][field] = productData[field];
      // }
      // this.list[index].remainQuantity = productData.quantity;
      // this.list[index] = new Date().toLocaleString();
      // console.log(this.list[index]);
    },
    async removeProduct(productId) {
      console.log(productId);
      try {
        const response = await axios.delete(`${API_URL}/products/${productId}`);
        const data = response.data;
        this.list = data;
      } catch (err) {
        console.log("Error loading product", err);
      }
    },
  },
  getters: {},
});
