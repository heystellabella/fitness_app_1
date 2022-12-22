export function renderProfileDescription() {
    const mainContainer = document.getElementById('main-container');
    const profileDescription = document.createElement('div');
    profileDescription.id = 'profile-description';
    mainContainer.appendChild(profileDescription);

    axios
        .get('/api/profile/3')
        .then((response) => {
            const username = response.data.username
            const bio = response.data.bio
            const weightGoal = response.data.weight_goal
            const activityGoal = response.data.activity_goal
            const calorieGoal = response.data.calorie_goal
            
            profileDescription.innerHTML = `
                <div class="profile-description-container">
                    <div>
                        <div class="profile-picture">

                            <h2>@${username}</h2>
                        </div>
                        <div>
                            <p>Weight Goal: ${weightGoal}</p>
                            <p>Activity Goal: ${activityGoal} times a week</p>
                            <p>Calorie Goal: ${calorieGoal}</p>
                        </div>
                    </div>
                </div>
            
            `
    })



}