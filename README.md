# 🏃‍♂️ Fitness App - GoFit - Project #3 - Full-stack SPA JavaScript Application
### by Stella Ma, Clarence Arimado and Haden Liu

<br>

👋 Welcome to our project, here is a [link to our app.]()

___

## Overview

- [Project Outline](https://gist.git.generalassemb.ly/katie/5e7a9e64f44afe9786521aa860f61418)
- [Link to our Notion](https://www.notion.so/Teamspace-Home-df5e257b07fe4811899fa0aa225bef06)
- [Link to our Figma](https://www.figma.com/files/team/1186604247724549464/Team-GoFit?fuid=986640042738311971)
- [Link to our Trello Board](https://trello.com/b/d5PtRQow)

Working in teams of 3 to build an app using full stack JavaScript (on both server and client).

Tech Stack:
- HTML, CSS
- JavaScript
- NodeJS
- ExpressJS
- SQL and Postgresql

___

## Description & MVP

A fitness application that allows users to create an account, input goals, track calorie intake whilst earning points with your friends!

- Calories
- Goal Weight
- Days of Activity
- Points

- Use of MVC Architecture

___

## Extras
- Add in an API for Fitness tips [ExerciseDB](https://www.programmableweb.com/api/exercisedb)
- Recipe/Meal Generator
- Responsive Design (For Desktop and Mobile)

___

## Project Plan

[✓] Ideation and Planning
1. Selecting Project Management Tools (Using Trello) - ✓
2. User Stories & Features - ✓
3. Storyboards & Wireframes - ✓
4. Design Inspiration - ✓

[ ] Set-up & API/Routes
1. Set up of folders (Controllers, DB, Static) - ✓
2. Create Database and Tables - ✓
3. Basic API Set Up - ✓
4. Components for each page in wireframe (make sure they link and work) - ✓

[ ] Front-end
1. Coding General Theme and Design - ✓

[ ] Pages
1. Homepage - Clarence
- [✓] Front-end
- [✓] Back-end
- [✓] Styling
2. Login Page - Clarence
- [✓] Front-end
- [✓] Back-end
    - Error Handling
- [✓] Styling
3. Signup Page - Clarence
- [✓] Front-end
- [✓] Back-end
    - Password Hashing
    - Error Handling
- [✓] Styling
4. Sessions (Login/Logout States) - Clarence
- [✓] Front-end
    - Modular Components (Main Nav and Sub Nav)
- [✓] Back-end
- [✓] Styling
4. Profile Update Page - Clarence
- [✓] Front-end
- [✓] Back-end
- [✓] Styling
5. Activity Page - Stella
- [✓] Front-end
- [✓] Back-end
- [✓] Styling
6. Calorie Page - Haden
- [ ] Front-end
- [ ] Back-end
- [ ] Styling
7. Weight Page - Stella
- [✓] Front-end
- [✓] Back-end
- [✓] Styling

[ ] Extras
1. ExerciseDB API - ✓

[ ] Refactoring - Team
1. Cleaning/refactor code
    - Adhering to MVC architecture
    - General Tidying (Remove console.logs, comments etc)


___

## Challenges & Wins

Stella:

Challenges:
1. CSS styling for best way to display information i.e. weight page.
2. Getting information from the front end into the back end.

Wins:
1. CSS styling for consistency.
2. Retrieving information from the backend (db) to display on the page.

Clarence: 
1. The login and logout state of the app. 
    - Instead of building out large html elements using innerHTML - I had to refactor my code/components to be modular (Navbar, Subnav). Also, figuring out how to only render certain functions.
2. Sessions :(
    - Prior knowledge of sessions using it with Flask. Went down a lot of rabbit holes trying to understand it for Express. Once I discovered that sessions are stored in a new table in database, I created routes in the backend and an axios.get in the front end to pull the session variable to display the logged in users data.
3. Reinforcing knowledge of the Front-end and Back-end
    - When I challenged myself to add in the ExerciseDB API, I did not need to add this to the API/create a route. As this is being pulled from another server. This is purely a front-end call.

Haden:

Challenges: 
1. Find suitable CSS styling for section displa. 
2. Convert data type to match the frond end inputs and SQL table. 

Wins: 
1. Using aggregate and group by methods in SQL to retrieve information from database
2. Using CSS grid to design the page.
___

## How we worked together
- Planning sessions using Figma to wireframe and storyboard
- Divvying up work using Trello to outline tasks 
- Constant communication using Slack instant messaging
- Zoom calls to code together/debug/help eachother
___

## Future Features
1. Have more data in the homepage - and more meaningful insights (e.g. graphs, calculations of activityEntry minus activityGoal, streaks)
2. CSS refactoring and layout/design changes
3. Groups (point system) to gamify the app
___

## How to run the app
1. npm install
2. npm run start