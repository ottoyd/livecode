const Product = require('../models/product')
const Err = require('./../libs/Err')

module.exports = {
    readProductByParam: async (req, res, next) => {
        try {
            const searchBy = Object.keys(req.query)[0]
            const valueBy = Object.values(req.query)[0]
            const product = await Product.getByParam(req.db, searchBy, valueBy)
            res.status(200).json({ data: product })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    readProduct: async (req, res, next) => {
        try {
            const { orderBy, sort, limit } = req.query
            const product = await Product.getAllProduct(req.db, orderBy, sort, limit)
            res.status(200).json({ data: product })
        } catch (error) {
            next(error);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const createProd = await Product.createProduct(req.db, req.body)
            res.status(200).json({ data: createProd })
        } catch (error) {
            next(error);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const { id } = req.params
            const thisUser = await Product.getById(req.db, id)
            if (thisUser.length == 0) throw new Err('Product Not Exist', 404)
            await Product.updateProduct(req.db, id, req.body)
            res.status(200).json({ data: req.body, info: 'Update Sukses' })
        } catch (error) {
            next(error);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.params
            const thisUser = await Product.getById(req.db, id)
            console.log(thisUser);
            if (thisUser.length == 0) throw new Err('Product Not Exist', 404)
            await Product.deleteProduct(req.db, id)
            res.status(200).json({ data: id, info: 'Delete Sukses' })
        } catch (error) {
            next(error);
        }
    },
}