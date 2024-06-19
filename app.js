const express = require('express')
const app = express()
const PORT = 3000
const postgres = require('./middlewares/postgres')
const errHandle = require('./middlewares/errHandle')
const routers = require('./routers/index')

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(postgres)
app.use(routers)
app.use(errHandle)

app.listen(PORT, () => {
    console.log('Tis on', PORT);
})
