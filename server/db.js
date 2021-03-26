const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "GQmkbhd1738!",
    host: "localhost",
    database: "pernstack",
    port: 5432
});

module.exports = pool;