const Pool = require('pg').Pool
const pool = new Pool()

const createElection = async name => {
    const client = await pool.connect()
    try {
        await client.query("begin")
        await client.query("insert into elections(name) values($1)", [name])
        await client.query("commit")
    }
    catch (err) {
        await client.query("rollback")
        console.error(err)
    }
    finally {
        client.release()
    }
}

const latestElection = async () => {
    const client = await pool.connect()
    try {
        const id = await client.query("SELECT id FROM elections ORDER BY id DESC LIMIT 1")
        return id.rows[0]
    }
    catch (err) {
        await client.query("rollback")
        console.error(err)
    }
    finally {
        client.release()
    }
}

// const getAreas = async areas => {
//     const client = await pool.connect()
//     try {
//         const allAreas = await client.query("select * from areas")
//         return allAreas.rows
//     }
//     catch (err) {
//         console.error(err.message)
//     }
//     finally {
//         client.release()
//     }
// }

module.exports = {
    createElection: createElection,
    latestElection: latestElection
    // getAreas: getAreas,
}
