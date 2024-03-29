import { defineStore } from "pinia";

export const useAdminProductStore = defineStore("product", {
    state: () => ({
        list: [],
        loaded: false
    }),
    actions: {
        getProduct(index) {
            if(!this.loaded) {
                this.loadProductsFromStorage()
            }
            return this.list[index]
        },
        addProduct(productData) {
            productData.remainQuantity = productData.quantity
            productData.updatedAt = (new Date()).toLocaleString()
            this.list.push(productData)
            this.saveToStorage()
        },
        updateProduct(index, productData) {
            const fields = ['name', 'imageUrl', 'price', 'quantity', 'status']
            for(let field of fields) {
                this.list[index][field] = productData[field]
            }
            this.list[index].remainQuantity = productData.quantity
            productData.updatedAt = (new Date()).toLocaleString()
            this.saveToStorage()
        },
        removeProduct(index) {
            this.list.splice(index, 1)
            this.saveToStorage()
        },
        saveToStorage() {
            localStorage.setItem("Admin-Product-Data", JSON.stringify(this.list));
        },
        loadProductsFromStorage() {
            const getItem = localStorage.getItem("Admin-Product-Data")
            if (getItem) {
                const products = getItem
                this.list = JSON.parse(products);
                this.loaded = true
            }
        },
    },
    getters: {

    },
});