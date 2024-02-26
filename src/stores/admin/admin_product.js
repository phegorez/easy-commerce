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
    where,
    orderBy,
    // add functions for pagination
    limit,
    limitToLast,
    getCountFromServer,
    startAfter,
    endBefore
} from 'firebase/firestore'

export const useAdminProductStore = defineStore("admin-product", {
    state: () => ({
        docList: [],
        total: 0,
        filter: {
            search: '',
            status: '',
            sort: {
                updateAt: 'desc',
                status: 'asc'
            }
        }
    }),
    actions: {
        async loadProduct() {
            try {
                let productCol = query(
                    collection(db, 'products')
                )
                //find collection
                let countProductQuery = query(
                    collection(db, 'products'),
                    orderBy('updatedAt', this.filter.sort.updateAt) //desc
                )

                //filter by condition
                //by search letters
                if (this.filter.search) {
                    // console.log('search', this.filter.search);
                    productCol = query(productCol, where('name', '==', this.filter.search))
                }
                //by product status
                if (this.filter.status) {
                    productCol = query(productCol, where('status', '==', this.filter.status))
                }

                //store productCol referenc in rawProductCol
                const rawProductCol = productCol
                //limit data to show 2 items
                productCol = query(
                    countProductQuery,
                    limit(2)
                )

                //set referent data
                const productSnapshot = await getDocs(productCol)
                this.docList = productSnapshot.docs || []

                // calculate total
                const allSnapshot = await getCountFromServer(rawProductCol)
                this.total = allSnapshot.data().count


            } catch (err) {
                console.log('error', err);
            }
        },
        async loadNextProduct(mode) {
            // Navigate to collaction
            let productCol = query(
                collection(db, 'products'),
                orderBy('updatedAt', this.filter.sort.updateAt) //desc
            )
            if (mode === 'next') {
                const lastDocument = this.docList[this.docList.length - 1]
                // console.log('Last Document', lastDocument.data());
                // Go to next
                productCol = query(
                    productCol,
                    startAfter(lastDocument),
                    limit(2)
                )
            } else {
                const firstDocument = this.docList[0]
                // console.log('first Document', firstDocument.data());
                // back to previous
                productCol = query(
                    productCol,
                    endBefore(firstDocument),
                    limitToLast(2)
                )
            }

            //create snapshot
            const productSnapshot = await getDocs(productCol)

            //set referent data
            this.docList = productSnapshot.docs
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
                // console.log(updateProduct);

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
    },
    getters: {
        list(state) {
            return state.docList.map(doc => {
                const covertProductList = doc.data()
                covertProductList.productId = doc.id
                covertProductList.updatedAt = covertProductList.updatedAt.toDate().toLocaleString()
                return covertProductList
            })
        },
        totalPage(state) {
            return Math.ceil(state.total / 2)
        }
    },
});
