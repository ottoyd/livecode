const Err = require('./../libs/Err')

class Merk {
    constructor({ id, Name, Deskripsi }) {
        this.id = id
        this.Name = Name
        this.Deskripsi = Deskripsi
    }
    static async getByMerkId(db, id) {
        try {
            const query = `SELECT * FROM merk where id = $1`
            const prod = await db.query(query, [id])
            let result = []
            for (let p of prod.rows) result.push(new Merk(p))
            return result
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }
    static async createMerk(db, data) {
        try {
            const { Name, Deskripsi } = data
            if (!/^[a-zA-Z0-9]+(\s[a-zA-Z]+)?$/.test(Name)) throw new Err('Name Cannot Contain Symbol', 402)
            if (!/^[a-zA-Z0-9]+(\s[a-zA-Z]+)?$/.test(Deskripsi)) throw new Err('Deskripsi Cannot Contain Symbol', 402)
            const query = `INSERT INTO public.merk("Name", "Deskripsi") 
            VALUES($1, $2) RETURNING *`
            const result = await db.query(query, [Name, Deskripsi])
            return new Merk(result.rows[0])
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = Merk