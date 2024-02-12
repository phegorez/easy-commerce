import { defineStore } from "pinia";

import { db } from "@/firebase"
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    deleteDoc,
    query,
    where
} from 'firebase/firestore'

export const useAdminProductStore = defineStore("admin-product", {
    state: () => ({
        list: [],
        filter: {
            search: '',
            status: '',
            sort: {
                updateAt: 'asc',
                status: 'asc'
            }
        }
    }),
    actions: {
        async loadProduct() {
            try {
                //find collection
                let productCol = query(collection(db, 'products'))

                if (this.filter.search){
                    // console.log('search', this.filter.search);
                    productCol = query(productCol, where('name', '==', this.filter.search))
                }

                if (this.filter.status){
                    productCol = query(productCol, where('status', '==', this.filter.status))
                }
                //create snapshot
                const productSnapshot = await getDocs(productCol)

                const productList = productSnapshot.docs.map(doc => {
                    const covertProductList = doc.data()
                    covertProductList.productId = doc.id
                    covertProductList.updatedAt = covertProductList.updatedAt.toDate().toLocaleString()
                    return covertProductList
                })
                this.list = productList
                // console.log(productList[0].updatedAt.toDate());
            } catch (err) {
                console.log('error', err);
            }
        },
        async getProduct(productId) {
            try {
                const productRef = doc(db, 'products', productId)
                const producSnapshot = await getDoc(productRef)
                return producSnapshot.data()
            } catch (err) {
                console.log('error', err);
            }
        },
        async addProduct(productData) {
            try {
                productData.remainQuantity = productData.quantity
                productData.updatedAt = new Date()
                const productCol = collection(db, 'products')
                await addDoc(productCol, productData)
            } catch (err) {
                console.log('error', err);
            }
        },
        async updateProduct(productId, productData) {
            try {
                const updateProduct = {}
                const fields = ['name', 'imageUrl', 'price', 'quantity', 'about', 'status']
                for (let field of fields) {
                    updateProduct[field] = productData[field]
                }
                updateProduct.remainQuantity = productData.quantity
                updateProduct.updatedAt = new Date()
                console.log(updateProduct);

                const productRef = doc(db, 'products', productId)
                await setDoc(productRef, updateProduct)
                
            } catch (err) {
                console.log('error', err);
            }
        },
        async removeProduct(productId) {
            try {
                const productRef = doc(db, 'products', productId)
                await deleteDoc(productRef)
                this.loadProduct()
            } catch (err) {
                console.log('remove error', err);
            }
        },
        // saveToStorage() {
        //     localStorage.setItem("Admin-Product-Data", JSON.stringify(this.list));
        // },
        // loadProductsFromStorage() {
        //     const getItem = localStorage.getItem("Admin-Product-Data")
        //     if (getItem) {
        //         const products = getItem
        //         this.list = JSON.parse(products);
        //         this.loaded = true
        //     }
        // },
    },
    getters: {

    },
});
