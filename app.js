const express = require("express")
const bodyParser = require("body-parser")
const db = require("./db/db")

const app = express()

const PORT = 3000

//Middleware
app.use(express.static("static"))
app.use(bodyParser.json())

app.get("/api/profile", (req, res) => {
    const sql = "SELECT * FROM users"
    db.query(sql).then((dbResult) => {
        res.json(dbResult.rows) 
    })
})

app.get("/api/profile/:id", (req, res) => {
    const sql = "SELECT * FROM users WHERE user_id = $1"
    const params = [req.params.id]
    db.query(sql, params).then((dbResult) => {
        res.json(dbResult.rows[0]) 
    })
})

app.post("/api/login-session", (req, res) => {
    const email = [req.body.email]
    const password = req.body.password
    const sql = "SELECT email, password FROM users WHERE email = $1"
    db.query(sql, email).then((dbResult) => {
        if (dbResult.rows.length === 0) {
            res.status(404).json({error: "User not found"})
        } else {
            const user = dbResult.rows[0]
            if (user.password === password) {
                res.json({message: "Login successful"})
            } else {
                res.status(401).json({error: "Incorrect password"})
            }
        }
    })
})

// App route to get weight information for user
app.get("/api/weight/:id", (req, res) =>{
    const sql = "SELECT * FROM weight_tracker WHERE user_id = $1"
    const params = [req.params.id]
    db.query(sql, params).then((response) => {
        // response.rows is an array of objects
        res.json(response.rows) 
    })
})

// App route to get activity information for user
app.get("/api/activity/:id", (req, res) =>{
    const sql = "SELECT * FROM activity_tracker WHERE user_id = $1"
    const params = [req.params.id]
    db.query(sql, params).then((response) => {
        // response.rows is an array of objects
        res.json(response.rows) 
    })
});



app.listen(PORT, () => {
    console.log(`Connected on http://localhost:${PORT}`)
})