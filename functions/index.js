const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const app = express();

const { db,auth } = require('./firebaseConfig.js')

app.post('/placeorder', async (req, res) => {
    console.log(req.body);

    const checkoutData = req.body.checkout

    let checkoutProducts = []
    let totalPrice = 0

    const products = checkoutData.products

    for(const product of products) {
        const productRef = db.collection('products').doc(product.productId)
        const productSnapshot = await productRef.get()
        const productData = productSnapshot.data()
        
        let checkoutProduct = products
        checkoutProduct.price = productData.price
        checkoutProduct.totalPrice = productData.price * product.quantity
        totalPrice += (productData.price * product.quantity)
        checkoutProducts.push(checkoutProduct)
    }

    // console.log('checkoutProducts', checkoutProducts);
    
    res.json({
        message: 'Hello from Firebase!',
        checkoutProducts,
        totalPrice
    })
})

// app.post('/test', (req, res) => {
//     res.json({
//         message: 'This is Test'
//     })
// })

exports.api = onRequest(app)
