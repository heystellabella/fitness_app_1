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
    profileCard.id = 'profile-card'
    profileCard.classList.add('profile-card')
    const mainCardContainer = document.getElementById('home-container')

    axios
    .get("/api/session")
    .then((response) => {
        console.log(response.data)
        const user_id = response.data.user_id

        
            axios
            .get(`/api/profile/${user_id}`)
            .then((response) => {
                console.log(response.data)
                const f_name = response.data.f_name
                const l_name = response.data.l_name
                const username = response.data.username
                const bio = response.data.bio
                const weightGoal = response.data.weight_goal
                const activityGoal = response.data.activity_goal
                const calorieGoal = response.data.calorie_goal

                profileCard.innerHTML = `
                    <div class="profile-card-user-info">
                        <div class="profile-picture-card">INSERT PROFILE PICTURE HERE</div>
                        <div class="profile-card-user-details">
                            <h2>${f_name} ${l_name}</h2>
                            <h3>@${username}</h3>
                            <p>${bio}</p>
                        </div>
                    </div>
                    <div class="profile-card-goals">
                        <div class="weight-goal-profile">
                            <i class="fa-solid fa-weight-scale"></i>
                            <p> ${weightGoal}</p>
                            <p>KGs</p>
                            <p>Weight Goal</p>
                        </div>
                        <div class="activity-goal-profile">
                            <i class="fa-solid fa-chart-line"></i>
                            <p> ${activityGoal} </p>
                            <p>times p/ week</p>
                            <p>Activity Goal</p>
                        </div>
                        <div class="calorie-goal-profile">
                            <i class="fa-solid fa-heart"></i>
                            <p> ${calorieGoal} </p>
                            <p>kcal p/ day</p>
                            <p>Calorie Goal</p>
                        </div>
                    </div>
                `
                mainCardContainer.appendChild(profileCard)

                
                axios
                .get(`/api/latestActivity/${user_id}`)
                .then((response) => {

                    // const latestActivityEntry = response.data[0].activity
                    // const latestActivityDate = response.data[0].date

                    const activityCard = document.createElement('div')
                    activityCard.id = 'activity-card'
                    activityCard.classList.add('activity-card')
                    activityCard.innerHTML = `
                        <div class="activity-card-header">
                            <h2>Latest Activity <button class="add-activity-button"><i class="fa-solid fa-plus"></i></button> </h2>
                        </div>
                        <div class="activity-card-body">
                            <div class="activity-card-body-header">
                                <h3>Activity</h3>
                                <h3>Calories</h3>
                                <h3>Time</h3>
                            </div>
                            <div class="activity-card-body-content">
                                <h3>${latestActivityEntry}</h3>
                                <h3>500</h3>
                                <h3>30 mins</h3>
                            </div>
                        </div>
                    `
                    profileCard.appendChild(activityCard)

                })

                axios
                .get(`/api/latestCalorie/${user_id}`)
                .then((response) => {
                    const latestCalorieEntry = response.data[0].calories
                    const latestCalorieDate = response.data[0].date

                    const calorieCard = document.createElement('div')
                    calorieCard.id = 'calorie-card'
                    calorieCard.classList.add('calorie-card')
                    calorieCard.innerHTML = `
                        <div class="calorie-card-header">
                            <h2>Latest Calories <button class="add-calorie-button"><i class="fa-solid fa-plus"></i></button> </h2>
                        </div>
                        <div class="calorie-card-body">
                            <div class="calorie-card-body-header">
                                <h3>Calories</h3>
                                <h3>Date</h3>
                            </div>
                            <div class="calorie-card-body-content">
                                <h3>${latestCalorieEntry}</h3>
                                <h3>${latestCalorieDate}</h3>
                            </div>
                        </div>
                    `

                    profileCard.appendChild(calorieCard)
                })

                axios
                .get(`/api/latestWeight/${user_id}`)
                .then((response) => {
                    const latestWeightEntry = response.data[0].weight
                    const latestWeightDate = response.data[0].date

                    const weightCard = document.createElement('div')
                    weightCard.id = 'weight-card'
                    weightCard.classList.add('weight-card')
                    weightCard.innerHTML = `
                        <div class="weight-card-header">
                            <h2>Latest Weight <button class="add-weight-button"><i class="fa-solid fa-plus"></i></button> </h2>
                            
                        </div>
                        <div class="weight-card-body">
                            <div class="weight-card-body-header">
                                <h3>Weight</h3>
                                <h3>Date</h3>
                            </div>
                            <div class="weight-card-body-content">
                                <h3>${latestWeightEntry}</h3>
                                <h3>${latestWeightDate}</h3>
                            </div>
                        </div>
                    `
                    profileCard.appendChild(weightCard)

                })
            
            })
    })
}
        