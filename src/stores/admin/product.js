import { defineStore } from "pinia";

export const useAdminProductStore = defineStore("product", {
    state: () => ({
        list: [
            {
                name: 'test',
                imageUrl: 'https://fastly.picsum.photos/id/161/200/200.jpg?hmac=67RAUzlqjfTvEM9tZ3K0ZMB1mAOXZZULGVHKjt1pmPs',
                price: 200,
                quantity: 20,
                remainQuantity: 20,
                status: 'open',
                updatedAt: (new Date()).toLocaleString()
            }
        ]
    }),
    actions: {
        getProduct(index) {
            return this.list[index]
        },
        addProdcut(productData) {
            productData.remainQuantity = productData.quantity
            productData.updatedAt = (new Date()).toLocaleString()
            this.list.push(productData)
        },
        updateProduct (index, productData) {
            this.list[index].name = productData.name
            this.list[index].imageUrl = productData.imageUrl
            this.list[index].price = productData.price
            this.list[index].quantity = productData.quantity
            this.list[index].remainQuantity = productData.quantity
            this.list[index].status = productData.status
            productData.updatedAt = (new Date()).toLocaleString()
        },
        removeProduct(index) {
            this.list.splice(index, 1)
        }
    },
    getters: {

    },
});