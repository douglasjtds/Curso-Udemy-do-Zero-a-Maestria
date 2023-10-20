const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.get('/create', ProductController.createProduct)
router.post('/create', ProductController.createProductPost)
router.get('/', ProductController.showProducts)
router.get('/:id', ProductController.getProduct)
router.post('/remove/:id', ProductController.deleteProduct)

module.exports = router