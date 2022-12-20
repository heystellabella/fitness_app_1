-- DATABASE NAME: gofit
-- TABLES: users, weight_tracker, calorie_tracker, activity_tracker

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    f_name TEXT NOT NULL,
    l_name TEXT, 
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    profile_picture TEXT,
    bio TEXT,
    weight_goal DECIMAL NOT NULL,
    activity_goal INTEGER NOT NULL,
    calorie_goal DECIMAL NOT NULL
);

DROP TABLE IF EXISTS weight_tracker CASCADE;
CREATE TABLE weight_tracker (
    weight_tracker_id SERIAL PRIMARY KEY,
    user_id INTEGER,
        CONSTRAINT fk_user_id
            FOREIGN KEY (user_id)
                REFERENCES users(user_id),
    date DATE NOT NULL,
    weight DECIMAL NOT NULL
);

DROP TABLE IF EXISTS calorie_tracker CASCADE;
CREATE TABLE calorie_tracker (
    calorie_tracker_id SERIAL PRIMARY KEY,
    user_id INTEGER,
        CONSTRAINT fk_user_id
            FOREIGN KEY (user_id)
                REFERENCES users(user_id),
    date DATE NOT NULL,
    calories INTEGER NOT NULL
);

DROP TABLE IF EXISTS activity_tracker CASCADE;
CREATE TABLE activity_tracker (
    activity_tracker_id SERIAL PRIMARY KEY,
    user_id INTEGER,
        CONSTRAINT fk_user_id
            FOREIGN KEY (user_id)
                REFERENCES users(user_id),
    date DATE NOT NULL,
    activities TEXT
);