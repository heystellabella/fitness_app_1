INSERT INTO users (f_name, l_name, username, email, password, bio, weight_goal, activity_goal, calorie_goal) VALUES ('Stella', 'Ma', 'stella123', 'stella@example.com', 'password123', 'I love working out!', 60.0, 3, 1500);
INSERT INTO users (f_name, l_name, username, email, password, bio, weight_goal, activity_goal, calorie_goal) VALUES ('Clarence', 'Arimado', 'clarence123', 'clarence@example.com', 'password123', 'I hate working out!', 80.0, 4, 3000);
INSERT INTO users (f_name, l_name, username, email, password, bio, weight_goal, activity_goal, calorie_goal) VALUES ('Haden', 'Liu', 'haden123', 'haden@example.com', 'password123', 'LOVE working out!', 65.0, 4, 2000);


INSERT INTO weight_tracker (user_id, date, weight) VALUES (1, '2022-12-20', 58);
INSERT INTO weight_tracker (user_id, date, weight) VALUES (2, '2022-12-22', 76);
INSERT INTO weight_tracker (user_id, date, weight) VALUES (3, '2022-12-21', 64);

INSERT INTO calorie_tracker (user_id, date, calories) VALUES (1, '2022-12-20', 1400);
INSERT INTO calorie_tracker (user_id, date, calories) VALUES (2, '2022-12-22', 1600);
INSERT INTO calorie_tracker (user_id, date, calories) VALUES (3, '2022-12-21', 1700);

INSERT INTO activity_tracker (user_id, date, activities) VALUES (1, '2022-12-20', 'Ran - 3km');
INSERT INTO activity_tracker (user_id, date, activities) VALUES (2, '2022-12-22', 'Bouldering');
INSERT INTO activity_tracker (user_id, date, activities) VALUES (3, '2022-12-21', 'Ran - 4km');