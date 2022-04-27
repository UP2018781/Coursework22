import pkg from 'pg';

const { Pool, Client } = pkg;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Pokemon100",
    database: "test"
});

pool.on('error', (err, client) => {
    console.error("error:", err);
    process.exit(-1);
})

/**
 * 
 * @param {obj} fetchBy
 */
export async function checkBrick(fetchBy) {
    const use = await pool.connect();
    const result = await use.query("SELECT * FROM bricks;");
    await use.release();
    console.log(await result.rows);
}