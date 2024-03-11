const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const app = express();

const { db, auth } = require('./firebaseConfig.js');
const { error } = require('firebase-functions/logger');

const omise = require('omise')({
    secretKey: process.env.OMISE_SECRET_KEY,
    omiseVersion: '2019-05-29'
})

const createCharge = (source, amount, orderId) => {
    return new Promise((resolve, reject) => {
        omise.charges.create({
            amount: (amount * 100),
            currency: 'THB',
            return_uri: `http://localhost:5173/success?order_id=${orderId}`,
            metadata: {
                orderId
            },
            source,
        }, (err, resp) => {
            if (err) {
                return reject(err)
            }
            resolve(resp)
        })
    })
}

app.post('/placeorder', async (req, res) => {
    console.log('this is body', req.body.checkout);

    try {
        const checkoutData = req.body.checkout
        const sourceOmise = req.body.source
        let checkoutProducts = []
        let totalPrice = 0
        let orderData = {}
        let omiseResponse = {}
        let successOrderId = ''
        
        const products = checkoutData.products

        await db.runTransaction(async (transaction) => {
            for (const product of products) {
                const productRef = db.collection('products').doc(product.productId)
                const productSnapshot = await productRef.get()
                const productData = productSnapshot.data()

                let checkoutProduct = products
                checkoutProduct.name = productData.name
                checkoutProduct.imageUrl = productData.imageUrl
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
            
            omiseResponse = await createCharge(sourceOmise, totalPrice, orderId)
            successOrderId = orderId
        })

        console.log('omiseresponse', omiseResponse);

        res.json({
            message: 'Hello from Firebase!',
            // totalPrice,
            // orderData,
            // products,
            checkoutProducts,
            sourceOmise,
            redirectUrl: `http://localhost:5173/success?order_id=${successOrderId}`,
            // orderId: successOrderId
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

//for test omise
// app.get('/testenv', (req, res) => {
//     res.json({
//         env: process.env.OMISE_SECRET_KEY
// })
// })

exports.api = onRequest(app)
