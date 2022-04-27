import pkg from 'pg';

const { Pool, Client } = pkg;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Pokemon100",
    database: "legoshop"
});

pool.on('error', (err, client) => {
    console.error("error:", err);
    process.exit(-1);
})

/**
 * 
 * @param {obj} fetchBy
 */
export async function checkBrick(ID) {
    const use = await pool.connect();
    const result = await use.query("SELECT * FROM bricks;");
    await use.release();
    console.log(await result.rows);
}

export async function queryBrick(ID) {
    const user = await pool.connect();
    let result;
    if (ID > 0){
        result  = await user.query(`SELECT * FROM bricks WHERE ID = ${ID}`);
        return(await result.rows);
    } else {
        console.warn("ID has invalid attributes");
    }
    await user.release();
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
    let result;
    if (fetchBy.id > 0) {
        result = await user.query(`SELECT * FROM bricks WHERE ID = ${fetchBy.id}`);
    }
}