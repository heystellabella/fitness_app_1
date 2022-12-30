require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const db = require("./db/db")
const bcrypt = require("bcrypt")
const expressSession = require("express-session")
const pgSession = require("connect-pg-simple")(expressSession)

const app = express()

const PORT = 3000

//Middleware
app.use(express.static("static"))
app.use(bodyParser.json())
app.use(expressSession({
    store: new pgSession({
        pool: db,
        createTableIfMissing: true,
    }),
    secret: process.env.SECRET
}))


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
            
            function isValidPassword(password, passwordHash) {
                return bcrypt.compareSync(password, passwordHash)
            }

            if (isValidPassword(password, user.password)) {
                req.session.email = email
                
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
    const { f_name, l_name, email, password, password2, username, bio, weight_goal, activity_goal, calorie_goal } = req.body

    function generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    }

    const passwordHash = generateHash(password)

    if (f_name == "" && email == "" && password == "") {
        res.status(400).json({
            message: "Please enter your name, email and password."
        })
    } else if (f_name && email && password.length < 8) {
        res.status(400).json({
            message: "Password too short - Must be at least 8 characters."
        })
    } else if (password !== password2) {
        res.status(400).json({
            message: "Passwords do not match. Try again."
        })
    } else if (!email.includes('@') || !email.includes('.')) {
        res.status(400).json({
            message: "Please enter a valid email address."
        })
    } else if (isNaN(weight_goal) || isNaN(activity_goal) || isNaN(calorie_goal)) {
        res.status(400).json({
            message: "Please enter a number for your weight goal, activity goal and calorie goal."
        })
    } else {
        const sql = "INSERT INTO users (f_name, l_name, email, password, username, bio, weight_goal, activity_goal, calorie_goal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
        const params = [f_name, l_name, email, passwordHash, username, bio, weight_goal, activity_goal, calorie_goal]

        db.query(sql, params).then((dbResult) => {
            res.json({ message: "Account created successfully" })
            
        })
    }

});

app.put("/api/accounts/:id", (req, res) => {
    const { username, bio, weight_goal, activity_goal, calorie_goal } = req.body
    const id = req.params.id
    const sql = "UPDATE users SET username = $1, bio = $2, weight_goal = $3, activity_goal = $4, calorie_goal = $5 WHERE user_id = $6"
    const params = [username, bio, weight_goal, activity_goal, calorie_goal, id]

    if (isNaN(weight_goal) || isNaN(activity_goal) || isNaN(calorie_goal)) {
        res.status(400).json({
            message: "Please enter a number for your weight goal, activity goal and calorie goal."
        })
    } else {
        db.query(sql, params).then((dbResult) => {
            res.json({ message: "Account updated successfully" })
        })
    }
})


app.listen(PORT, () => {
    console.log(`Connected on http://localhost:${PORT}`)
})