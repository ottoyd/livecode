const router = require('express').Router()
const merkController = require('./../controllers/merk')

router.post('/createPostMerk', merkController.createMerk)

module.exports = router