import { defineStore } from "pinia";

export const useAdminOrderStore = defineStore("oder", {
    state: () => ({
        odersList: [{
            orderID: `SS${Math.floor(Math.random() * 90000 + 10000)}`,
            customerName: 'นายทดสอบ นะ',
            totalPrice: 25000,
            status: 'Payment Completed',
            address: '111/892 Nonthaburi Thailand 99999',
            paymentMethod: 'Credit card',
            updatedAt: '9/15/2023, 11:50:24 PM',
            products: [{
                name: 'ทดสอบ',
                description: 'รายละเอียดสินค้า 1',
                imageUrl: 'https://fastly.picsum.photos/id/928/200/200.jpg?hmac=5MQxbf-ANcu87ZaOn5sOEObpZ9PpJfrOImdC7yOkBlg',
                quantity: 1,
                price: 13000
            },
            {
                name: 'ทดสอบ 2',
                description: 'รายละเอียดสินค้า 2',
                imageUrl: 'https://fastly.picsum.photos/id/59/200/200.jpg?hmac=q9DbuoFh1L_NWnGk3AGdzuEOlg5bBW4JmBSgWmQdT74',
                quantity: 1,
                price: 12000
            }]
        }]
    }),
    actions: {
        getOrder(index) {
            return this.odersList[index]
        }
    },
    getters: {

    },
});