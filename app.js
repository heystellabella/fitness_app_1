require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const db = require("./db/db")
const bcrypt = require("bcrypt")
const expressSession = require("express-session")
const pgSession = require("connect-pg-simple")(expressSession)
const cloudinary = require("cloudinary").v2

const cors = require("cors")

const cookieParser = require("cookie-parser")


const app = express()

const PORT = 3000

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// ------------------------ //
// ------ Middleware ------ //
// ------------------------ //

app.use(express.static("static"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressSession({
    store: new pgSession({
        pool: db,
        createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
}))

app.use(cors({
    credentials: true,
}));


// ------------------------ //
// -------- Routes -------- //
// ------------------------ //

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/index.html")
})

app.get("/api/profile", (req, res) => {
    const sql = "SELECT * FROM users"
    db.query(sql).then((dbResult) => {
        res.json(dbResult.rows) 
    })
})

app.get("/api/profile/:user_id", (req, res) => {
    const sql = "SELECT * FROM users WHERE user_id = $1"
    const params = [req.params.user_id]
    db.query(sql, params).then((dbResult) => {
        // const userID = req.params.user_id
        res.json(dbResult.rows[0]) 
    })
})


app.post("/api/login-session", (req, res) => {
    const email = [req.body.email]
    const password = req.body.password
    const sql = "SELECT user_id, email, f_name, password FROM users WHERE email = $1"
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
                req.session.user_id = user.user_id
                req.session.f_name = user.f_name
                req.session.save()

                res.json({message: "Login Successful"})

                
            } else {
                res.status(401).json({message: "Invalid password"})
            }
        }
    })
});

// get calories routes

app.get("/profile/calaries/:id", (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM calorie_tracker inner join users on calorie_tracker.user_id = users.user_id where calorie_tracker.user_id = ${id}`

    db.query(sql).then(({ rows }) => {
        res.json(rows)
    })
})

// post new calories
app.post("/profile/calaries", (req, res) => {
    console.log(req.body)
    const { user_id, date, calories } = req.body;

    const sql = `
         INSERT into calorie_tracker(user_id, date, calories) VALUES($1, $2, $3)`

    db.query(sql, [user_id, date, calories]).then((dbRes) => {
        res.json({ success: true });
        });

})

app.get("/profile/left_calaries/:id/:date", (req, res) => {
    const id = req.params.id
    const date = req.params.date

    const sql = `
    select calorie_goal, date, sum(calories) from users left join calorie_tracker on users.user_id = calorie_tracker.user_id where users.user_id = ${id} and date = ${date}  group by calorie_goal, date; 
    `

    db.query(sql).then(({ rows }) => {
        res.json(rows)
    })

} )

// App route to get weight information for user
app.get("/api/weight/:id", (req, res) =>{
    const sql = "SELECT * FROM weight_tracker WHERE user_id = $1"
    const params = [req.params.id]
    db.query(sql, params).then((response) => {
        // response.rows is an array of objects
        res.json(response.rows) 
    })
})

app.post("/api/weightEntry/:id", (req, res) => {
    
    const sql = "INSERT INTO weight_tracker (user_id, weight, date) VALUES ($1, $2, $3)"
    const params = [req.params.id, req.body.weight, req.body.date]
    db.query(sql, params).then((dbResult) => {
        res.json({message: "data successfully inserted into database"})
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
})

app.post("/api/activityEntry/:id", (req, res) => {
    
    const sql = "INSERT INTO activity_tracker (user_id, activities, date) VALUES ($1, $2, $3)"
    const params = [req.params.id, req.body.activity, req.body.date]
    db.query(sql, params).then((dbResult) => {
        res.json({message: "data successfully inserted into database"})
    })
})

app.get("/api/session", (req, res) => {
    res.json(req.session)
})

app.delete("/api/session", (req, res) => {
    req.session.destroy()
    res.json({message: "Session deleted"})
})

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
            res.json({ message: "Account created successfully." })
            
        })
    }

});

app.put("/api/accounts/:id", (req, res) => {
    const { username, bio, weight_goal, activity_goal, calorie_goal } = req.body
    const id = req.params.id
    const sql = "UPDATE users SET username = $1, bio = $2, weight_goal = $3, activity_goal = $4, calorie_goal = $5 WHERE user_id = $6"
    const params = [username, bio, weight_goal, activity_goal, calorie_goal, id]

    if ((username == "" && bio == "" && weight_goal == "" && activity_goal == "" && calorie_goal == "") || username == "" || bio == "" || weight_goal == "" || activity_goal == "" || calorie_goal == "") {
        res.status(400).json({
            message: "Stop trying to break my form!"
        })
    } else if (isNaN(weight_goal)) {
        res.status(400).json({
            message: "Please enter a number for your weight goal."
        })
    } else if (isNaN(activity_goal)) {
        res.status(400).json({
            message: "Please enter a number for your activity goal."
        })
    } else if (isNaN(calorie_goal)) {
        res.status(400).json({
            message: "Please enter a number for your calorie goal."
        })
    } else {
        db.query(sql, params).then((dbResult) => {
            res.json({ message: "Account updated successfully." })
        })
    }
})

// SM App route to get weight information for user
app.get("/api/weight/:id", (req, res) => {
    const sql = "SELECT * FROM weight_tracker WHERE user_id = $1"
    const params = [req.params.id]
    db.query(sql, params).then((response) => {
        // response.rows is an array of objects
        res.json(response.rows) 
    })
})

// SM App route to get activity information for user
app.get("/api/activity/:id", (req, res) => {
    const sql = "SELECT * FROM activity_tracker WHERE user_id = $1"
    const params = [req.params.id]
    db.query(sql, params).then((response) => {
        // response.rows is an array of objects
        res.json(response.rows) 
    })
});

// SM App route for user to input weight entry
app.post("/api/weightEntry/:id", (req, res) => {
    
    const sql = "INSERT INTO weight_tracker (user_id, weight, date) VALUES ($1, $2, $3)"
    const params = [req.params.id, req.body.weight, req.body.date]
    db.query(sql, params).then((dbResult) => {
        res.json({message: "data successfully inserted into database"})
    })
})

// SM App route for user to input activity entry
app.post("/api/activityEntry/:id", (req, res) => {
    
    const sql = "INSERT INTO activity_tracker (user_id, activities, date) VALUES ($1, $2, $3)"
    const params = [req.params.id, req.body.activity, req.body.date]
    db.query(sql, params).then((dbResult) => {
        res.json({message: "data successfully inserted into database"})
    })
})

// SM App route to delete weight entry
app.delete("/api/weight/:id/:weight_tracker_id", (req, res) => {
    const sql = "DELETE from weight_tracker WHERE (user_id =$1) AND (weight_tracker_id=$2)"

    const params = [req.params.id, req.params.weight_tracker_id]

    db.query(sql, params).then((dbResult) => {
        res.json({message: "data successfully deleted from database"})
    })
})

// SM App route to edit weight entry
app.put("/api/weight/:id/:weight_tracker_id", (req, res) => {
    const sql = "UPDATE weight_tracker SET date=$1, weight=$2 WHERE user_id=$3 AND weight_tracker_id=$4"

    const params = [req.body.date, req.body.weight, req.params.id, req.params.weight_tracker_id]

    db.query(sql, params).then(dbResult => {
        res.json({message: "Weight data successfully updated."})
    })
})
// SM App route to delete activity entry
app.delete("/api/activity/:id/:activity_tracker_id", (req, res) => {
    const sql = "DELETE from activity_tracker WHERE (user_id =$1) AND (activity_tracker_id=$2)"

    const params = [req.params.id, req.params.activity_tracker_id]

    db.query(sql, params).then((dbResult) => {
        res.json({message: "data successfully deleted from database"})
    })
})
// SM App route to edit activity entry
app.put("/api/activity/:id/:activity_tracker_id", (req, res) => {
    const sql = "UPDATE activity_tracker SET date=$1, activities=$2 WHERE user_id=$3 AND activity_tracker_id=$4"

    const params = [req.body.date, req.body.activity, req.params.id, req.params.activity_tracker_id]

    db.query(sql, params).then(dbResult => {
        res.json({message: "Activity data successfully updated."})
    })
})

// CA - App route to get only the latest activity entry for user
app.get("/api/latestActivity/:id", (req, res) => {
    const sql = "SELECT * FROM activity_tracker WHERE user_id = $1 ORDER BY date DESC LIMIT 1"
    const params = [req.params.id]
    db.query(sql, params).then((response) => {
        res.json(response.rows) 
    })
})

// CA - App route to get the latest weight entry for user
app.get("/api/latestWeight/:id", (req, res) => {
    const sql = "SELECT * FROM weight_tracker WHERE user_id = $1 ORDER BY date DESC LIMIT 1"
    const params = [req.params.id]
    db.query(sql, params).then((response) => {
        res.json(response.rows) 
    })
});

// CA - App route to get the latest calorie entry for user
app.get("/api/latestCalorie/:id", (req, res) => {
    const sql = "SELECT * FROM calorie_tracker WHERE user_id = $1 ORDER BY date DESC LIMIT 1"
    const params = [req.params.id]
    db.query(sql, params).then((response) => {
        res.json(response.rows)
    })
});


app.listen(PORT, () => {
    console.log(`Connected on http://localhost:${PORT}`)
})