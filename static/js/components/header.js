import { renderHome } from "./homeDashboard.js"
import { renderProfileDescription } from "./profileDescription.js"
import { renderActivityPage } from "./activity.js"
import { renderWeightPage } from "./weight.js"
import { renderExerciseSearchResults } from "./exerciseSearchResults.js"


export function renderHeader() {
    const header = document.getElementById('header-container')
    header.innerHTML = `
        <nav id="header-nav">
            <ul id="mainnav" class="mainnav">
                <li id="logout">Log Out</li>
                <li id="home-logo">GoFit</li>
                <div id="cta" class="cta">
                    <li id="cta-join-now"><a href="./sign-up.html">Join Now</li>
                    <li id="cta-login"><a href="./login.html">Log In</li></a>
                </div>
            </ul>
            <div class="spacer"></div>
            <ul id="subnav" class="subnav">
                <li class="search-bar-container">
                    <input type="text" id="search-bar" placeholder="Name of Exercise">
                    <button id="search-button" type="submit"><i class="fa-solid fa-search"></i></button>
                </li>
                <li id="home-button"><i class="fa-solid fa-house"></i>Home</li>
                <!-- <li id="add-activity-button"><i class="fa-solid fa-plus"></i>Add Activity</li> -->
                <li id="create-group-button"><i class="fa-solid fa-people-group"></i>Groups</li>
                <li id="your-activity-button"><i class="fa-solid fa-chart-line"></i>Your Activity</li>
                <li id="weight-tracker-button"><i class="fa-solid fa-bullseye"></i>Weight Tracker</li>
                <li id="view-calorie-button"><i class="fa-solid fa-heart"></i>Calorie Tracker</li>
                <li id="my-profile-button"><i class="fa-regular fa-user"></i>My Profile</li>
            </ul>
        </nav>

        <div id="search-results-container">
        
        </div>

    `
    document.getElementById('search-button').addEventListener('click', renderExerciseSearchResults)
    document.getElementById('home-button').addEventListener('click', renderHome)
    document.getElementById('my-profile-button').addEventListener('click', renderProfileDescription)
    document.getElementById('logout').addEventListener('click', logout)
    document.getElementById('your-activity-button').addEventListener('click', renderActivityPage)
    document.getElementById('weight-tracker-button').addEventListener('click', renderWeightPage)

    function logout() {
            axios
            .delete('/api/session')
            .then((response) => {
                window.location.href = "/login.html"
            })
        }
}
