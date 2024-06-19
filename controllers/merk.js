const Merk = require('../models/merk')

module.exports = {
    createMerk: async (req, res, next) => {
        try {
            const createMerk = await Merk.createMerk(req.db, req.body)
            res.status(200).json({ data: createMerk })
        } catch (error) {
            next(error);
        }
    },
}