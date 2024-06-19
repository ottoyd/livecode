const router = require('express').Router()

router.post('/seed', async (req, res, next) => {
    try {

        await req.db.query(`
            INSERT INTO public.products("Name", "Price", "Stock", "Deskripsi", "Merk_id") 
            VALUES
            ('Baju', 30000, 1, 'Baju Bagus', 1),
            ('Celana', 20000, 2, 'Celana Bagus', 1),
            ('Topi', 9000, 3, 'Topi Bagus', 2);
        `)

        await req.db.query(`
            INSERT INTO public.merk("Name", "Deskripsi") 
            VALUES
            ('Bata', 'Most Reliable'),
            ('Carvil', 'Most Wanted');
        `)

        return res.status(200).json({ info: 'seed sukses' })

    } catch (error) {
        console.log(error);
        next(error)
    }
})

router.post('/migrate', async (req, res, next) => {
    try {

        const dropProduct = `DROP TABLE IF EXISTS "products" CASCADE`
        const dropMerk = `DROP TABLE IF EXISTS "merk" CASCADE`

        const createTableProduct = `
        CREATE TABLE IF NOT EXISTS "products" (
            "Name" VARCHAR(50) NOT NULL UNIQUE,
            "Price" int NOT NULL,
            "Stock" int NOT NULL,
            "Deskripsi" VARCHAR(50) NOT NULL,
            "id" serial PRIMARY KEY,
            "Merk_id" VARCHAR(50) NOT NULL
        );`;

        const createTableMerk = `
        CREATE TABLE IF NOT EXISTS "merk" (
            "id" serial PRIMARY KEY,
            "Name" VARCHAR(50) NOT NULL,
            "Deskripsi" VARCHAR(50) NOT NULL
        );`;

        await req.db.query(dropProduct)
        await req.db.query(dropMerk)
        await req.db.query(createTableProduct)
        await req.db.query(createTableMerk)


        return res.status(200).json({ info: 'migrate sukses' })

    } catch (error) {
        console.log(error);
        next(error)
    }
})

router.post('/summaryProducts', async (req, res, next) => {
    try {
        const summaryProducts = `SELECT 'products' AS productCount, COUNT(*) FROM products
        UNION
        SELECT 'merk' AS merkCount, COUNT(*) FROM merk`

        const resp = await req.db.query(summaryProducts)


        return res.status(200).json({ data: resp.rows })

    } catch (error) {
        console.log(error);
        next(error)
    }
})

router.post('/showProduct', async (req, res, next) => {
    try {
        const { order } = req.body
        console.log(order);
        const showProduct = `SELECT * FROM Products
        WHERE "Price" BETWEEN 100000 AND 200000  order by "Price" ${order}`
        const resp = await req.db.query(showProduct)
        return res.status(200).json({ data: resp.rows })
    } catch (error) {
        console.log(error);
        next(error)
    }
})

module.exports = router