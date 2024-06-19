const router = require('express').Router()
const routerProduct = require('./product')
const routerDB = require('./db')

router.use('/product', routerProduct)
router.use('/db', routerDB)

module.exports = router