const Err = require('./../libs/Err')
const Merk = require('./merk')

class Product {
    constructor({ id, Name, Price, Stock, Deskripsi, Merk_id }) {
        this.id = id
        this.Name = Name
        this.Price = +Price
        this.Stock = +Stock
        this.Deskripsi = Deskripsi
        this.Merk_id = Merk_id
    }

    static async getById(db, id) {
        try {
            const query = `SELECT * FROM products where id = $1 LIMIT 1`
            const prod = await db.query(query, [id])
            let result = []
            for (let p of prod.rows) {
                const thisMerk = await Merk.getByMerkId(db, p.Merk_id)
                result.push({
                    Product: new Product(p),
                    Merk: thisMerk
                })
            }
            return result
        } catch (error) {
            throw (error)
        }
    }

    static async getByParam(db, searchBy, valueBy) {
        try {
            console.log(searchBy, valueBy, 'valueByvalueByvalueByvalueBy');
            const query = `SELECT * FROM products where "${searchBy}" = '${valueBy}'`
            const prod = await db.query(query)
            let result = []
            for (let p of prod.rows) {
                const thisMerk = await Merk.getByMerkId(db, p.Merk_id)
                result.push({
                    Product: new Product(p),
                    Merk: thisMerk
                })
            }
            return result
        } catch (error) {
            throw (error)
        }
    }
    static async getAllProduct(db, orderBy, sort, limit) {
        try {
            const query = `SELECT * FROM products order by $1, $2 LIMIT $3`
            const prod = await db.query(query, [orderBy || 'ID', sort || 'asc', limit || '10'])
            let result = []
            for (let p of prod.rows) {
                const thisMerk = await Merk.getByMerkId(db, p.Merk_id)
                result.push({
                    Product: new Product(p),
                    Merk: thisMerk
                })
            }
            return result
        } catch (error) {
            throw (error)
        }
    }
    static async createProduct(db, data) {
        try {
            const { Name, Price, Stock, Deskripsi, Merk_id } = data
            if (!/^[a-zA-Z0-9]+(\s[a-zA-Z]+)?$/.test(Name)) throw new Err('Name Cannot Contain Symbol', 402)
            if (!/^[a-zA-Z0-9]+(\s[a-zA-Z]+)?$/.test(Deskripsi)) throw new Err('Deskripsi Cannot Contain Symbol', 402)
            if (+Price <= 0) throw new Err('Price Cannot Less than 0', 402)
            if (+Stock <= 0) throw new Err('Price Cannot Less than 0', 402)
            if ((await Merk.getByMerkId(db, Merk_id)).length == 0) throw new Err('Cannot Found Merk ID', 404)
            const query = `INSERT INTO public.products("Name", "Price", "Stock", "Deskripsi", "Merk_id") 
            VALUES($1, $2, $3, $4, $5) RETURNING *`
            const result = await db.query(query, [Name, Price, Stock, Deskripsi, Merk_id])
            return new Product(result.rows[0])
        } catch (error) {
            throw (error)
        }
    }
    static async updateProduct(db, id, data) {
        console.log(data);
        const { Name, Price, Stock, Deskripsi, Merk_id } = data
        if (!/^[a-zA-Z0-9]+(\s[a-zA-Z]+)?$/.test(Name)) throw new Err('Name Cannot Contain Symbol', 402)
        if (!/^[a-zA-Z0-9]+(\s[a-zA-Z]+)?$/.test(Deskripsi)) throw new Err('Deskripsi Cannot Contain Symbol', 402)
        if (+Price <= 0) throw new Err('Price Cannot Less than 0', 402)
        if (+Stock <= 0) throw new Err('Price Cannot Less than 0', 402)
        if ((await Merk.getByMerkId(db, Merk_id)).length == 0) throw new Err('Cannot Found Merk ID', 404)
        const query = `UPDATE public.products 
            SET "Name" = $1,
            "Price" = $2,
            "Stock" = $3,
            "Deskripsi" = $4,
            "Merk_id" = $5
        WHERE id = $6  RETURNING *`
        const result = await db.query(query, [Name, Price, Stock, Deskripsi, Merk_id, id])
        return new Product(result.rows[0])
    }
    static async deleteProduct(db, id) {
        try {
            await db.query(`DELETE FROM public.products WHERE id = $1;`, [id])
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = Product