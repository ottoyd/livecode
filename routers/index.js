const router = require('express').Router()
const routerProduct = require('./product')
const routerMerk = require('./merk')
const routerDB = require('./db')

router.use('/product', routerProduct)
router.use('/merk', routerMerk)
router.use('/db', routerDB)

module.exports = router