const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const app = express();

const { db, auth } = require('./firebaseConfig.js');
const { error } = require('firebase-functions/logger');

app.post('/placeorder', async (req, res) => {
    console.log('this is body',req.body);

    try {
        const checkoutData = req.body.checkout

        let checkoutProducts = []
        let totalPrice = 0
        let orderData = {}
        let successOrderId = ''

        const products = checkoutData.products

        await db.runTransaction(async (transaction) => {
            for (const product of products) {
                const productRef = db.collection('products').doc(product.productId)
                const productSnapshot = await productRef.get()
                const productData = productSnapshot.data()

                let checkoutProduct = products
                checkoutProduct.price = productData.price
                checkoutProduct.totalPrice = productData.price * product.quantity
                totalPrice += (productData.price * product.quantity)
                checkoutProducts = checkoutProduct

                if (productData.remainQuantity - product.quantity < 0) {
                    throw new Error(`Product ${productData.name} is out of stock`)
                }
                //reduce product
                transaction.update(productRef, {
                    remainQuantity: productData.remainQuantity - product.quantity
                })
            }

            

            const orderRef = db.collection('orders')

            const orderId = orderRef.doc().id

            orderData = {
                ...checkoutData,
                chargeId: `charge ${orderId}`,
                // chargeId: `charge test`,
                products: checkoutProducts,
                totalPrice,
                paymentMethod: 'bitcoin',
                createdAt: new Date(),
                status: 'successful',
            }

            transaction.set(orderRef.doc(orderId), orderData)

            successOrderId = orderId
        })

        res.json({
            message: 'Hello from Firebase!',
            // totalPrice,
            // orderData,
            // products,
            // checkoutProducts,
            redirectUrl: `localhost:5173/success?order_id=${successOrderId}`
        })
    } catch (err) {
        console.log('Failed to get checkout', err);
        res.status(400).json({
            message: error.message
        })
    }


    // console.log('checkoutProducts', checkoutProducts);



    //stamp order


})

// app.post('/test', (req, res) => {
//     res.json({
//         message: 'This is Test'
//     })
// })

exports.api = onRequest(app)
