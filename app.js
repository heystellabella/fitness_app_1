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
            res.status(404).json({message: "User not found"})
        } else {
            const user = dbResult.rows[0]
            if (user.password === password) {
                res.json({message: "Login successful"})
            } else {
                res.status(401).json({message: "Invalid password"})
            }
        }
    })
});

app.get("/api/accounts", (req, res) => {
    const sql = "SELECT * FROM users;"
    db.query(sql).then(({ rows }) => {
        res.json({ users: rows })
    })
})

app.post("/api/accounts", (req, res) => {
    const { name, email, password } = req.body

    if (name == "" && email == "" & password == "") {
        res.json({
            message: "Please enter your name, email and password."
        })
    } else if (name && email && password.length < 8) {
        res.json({
            message: "Password too short - Must be at least 8 characters"
        })
    } else {
        const sql = "INSERT INTO users (f_name, email, password) VALUES ($1, $2, $3)"
        const params = [req.body.f_name, email, password]
        console.log(sql, params)

        
        
        db.query(sql, params).then((dbResult) => {
            res.json({ message: "Account created successfully" })
            
        })
    }

});


app.listen(PORT, () => {
    console.log(`Connected on http://localhost:${PORT}`)
})