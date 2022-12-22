export function renderHeader() {
    const header = document.getElementById('header-container')
    header.innerHTML = `
        <nav id="header-nav">
            <ul id="navlist" class="sidenav">
                <li id="home-button"><i class="fa-solid fa-house"></i></li>
                <li id="add-activity-button"><i class="fa-solid fa-plus"></i></li>
                <li id="create-group-button"><i class="fa-solid fa-people-group"></i></li>
                <li id="update-goals-button"><i class="fa-solid fa-bullseye"></i></li>
                <li id="your-activty-button"><i class="fa-solid fa-chart-line"></i></li>
                <li id="my-profile-button"><i class="fa-regular fa-user"></i></li>
            </ul>
        </nav>

    `
}

