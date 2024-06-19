module.exports = async (req, res, next) => {
    try {
        const { Client } = require('pg')
        const client = new Client({
            user: 'postgres',
            password: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            database: 'gudang',
        })
        await client.connect()
        req.db = client
        next();

        // res.on('finish', async () => {
        //     await client.end()
        // });
    } catch (error) {

    }

}