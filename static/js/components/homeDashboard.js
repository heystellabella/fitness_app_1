export function renderHome() {
    const mainContainer = document.getElementById('main-container')
    mainContainer.innerHTML = ''
    mainContainer.innerHTML = `
        <div id="home-container" class="main-card-container">
            <div class="page-title">
                <h1>Home</h1>
            </div>
        </div>
    `

    const profileCard = document.createElement('div')
    const mainCardContainer = document.getElementById('home-container')

    axios
        .get('/api/profile/2')
        .then((response) => {
            const f_name = response.data.f_name
            const l_name = response.data.l_name
            const username = response.data.username
            const bio = response.data.bio
            const weightGoal = response.data.weight_goal
            const activityGoal = response.data.activity_goal
            const calorieGoal = response.data.calorie_goal

            profileCard.innerHTML = `
                <div class="profile-card">
                    <div class="profile-card-user-info">
                        
                        <h2>${f_name} ${l_name}</h2>
                        <h3>@${username}</h3>
                        <p>${bio}</p>
                    </div>
                    <div class="profile-card-goals">
                        <h2>Your Goals</h2>
                        <h3>Weight Goal:<span> ${weightGoal} KGs</span></h3>
                        <h3>Activity Goal:<span> ${activityGoal} times a week</span></h3>
                        <h3>Calorie Goal:<span> ${calorieGoal} calories a day</span></h3>
                    </div>
                </div>
            `
            mainCardContainer.appendChild(profileCard)
        })
}