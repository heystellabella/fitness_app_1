const express = require("express")

const path = require('path');

const pg = require("pg");

const bodyParser = require("body-parser")

const db = new pg.Pool({
    database: "gofit",
  });
const app = express()

const PORT = 3000

app.use(express.static("static"))

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.json({"status": "ok"})
})

// get all calaries
app.get('/profile/calaries', (req, res)=> {

    const sql = 'SELECT * FROM calorie_tracker'
    db.query(sql).then(({ rows }) => {
        res.json(rows);
      });

})

// get calaries by user_ID
app.get('/profile/:id', (req, res)=> {
    const id  = req.params.id
    const sql = `SELECT * FROM calorie_tracker WHERE user_id = ${id}`
    db.query(sql).then(({ rows }) => {
        res.json(rows);
      });
})


app.listen(PORT, () => {
    console.log(`Connected on http://localhost/${PORT}`)
})
