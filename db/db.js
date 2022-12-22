const pg = require("pg");

const db = new pg.Pool({
    database: "gofit"
});

module.exports = db;