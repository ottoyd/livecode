const router = require('express').Router()
const productController = require('./../controllers/product')

router.get('/', productController.readProduct)
router.get('/byParam', productController.readProductByParam)
router.post('/createPostProducts', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router