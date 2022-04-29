import pkg from 'pg';

const { Pool, Client } = pkg;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Example",
    database: "legoshop"
});

pool.on('error', (err, client) => {
    console.error("error:", err);
    process.exit(-1);
})

export async function queryBrick(ID) {
    const user = await pool.connect();
    let result;
    if (ID > 0){
        result  = await user.query(`SELECT * FROM bricks WHERE ID = ${ID}`);
        user.release();
        return(await result.rows);
    } else {
        console.warn("ID has invalid attributes");
    }
    user.release();
    return ([{
        id: null,
        colour: null,
        stocklevel: null,
        price: null,
        name: null,
        description: null,
    }]);
}

export async function queryManyBricks(fetchBy) {
    const user = await pool.connect();
    let query = `SELECT * FROM bricks WHERE `;
    let and = false;
    if (fetchBy.id > 0) {
        query = query+`id = ${fetchBy.id}`;
        and = true;
    }
    if (fetchBy.colour) {
        if (and) {
            query = query+` AND `;
        }
        query = query+`colour = '${fetchBy.colour}'`;
        and = true;
    }
    if (fetchBy.price) {
        if (and) {
            query = query+` AND `;
        }
        query = query+`price = ${fetchBy.price}`;
    }
    if (fetchBy.all = true) {
        query = `select * from bricks`;
    }
    console.log(query);
    user.release();
    const result = await user.query(query);
    return(await result.rows);
}

export async function querySet(id) {
    const user = await pool.connect();
    let query = `SELECT * FROM sets WHERE ID = ${id}`;
    const result = await user.query(query);
    await user.release();
    return await result.rows;
}

export async function queryManySets(fetchBy) {
    const user = await pool.connect();
    let query = `SELECT * FROM sets WHERE `;
    let and = false;
    if (fetchBy.id > 0) {
        query = query+`id = ${fetchBy.id}`;
        and = true;
    }
    if (fetchBy.name) {
        if (and) {
            query = query+` AND `;
        }
        query = query+`name = '${fetchBy.colour}'`;
        and = true;
    }
    if (fetchBy.price) {
        if (and) {
            query = query+` AND `;
        }
        query = query+`price = ${fetchBy.price}`;
    }
    if (fetchBy.all = true) {
        query = `select * from sets`;
    }
    console.log(query);
    await user.release();
    const result = await user.query(query);
    return(await result.rows);
}

export async function updateStock(id, type, amount) {
    const user = await pool.connect();
    let currentStock;

    // get current stock level
    console.log(id,type,amount);

    if (type == 'brick') {
        const reply = await user.query(`SELECT stocklevel FROM bricks WHERE id = ${id}`);
        currentStock = await reply.rows[0];
        const reply2 = await user.query(`UPDATE bricks SET stocklevel = ${currentStock - amount} WHERE id = ${id}`);
        user.release();
    }
    if (type == 'set') {
        const reply = await user.query(`SELECT stocklevel FROM sets WHERE id = ${id}`);
        currentStock = reply.rows[0];
        const reply2 = await user.query(`UPDATE sets SET stocklevel = ${currentStock - amount} WHERE id = ${id}`);
        user.release();
    }
}