export function renderProfileDescription() {
    const mainContainer = document.getElementById('main-container');
    const profileDescription = document.createElement('div');
    profileDescription.id = 'profile-description';
    
    axios
    .get('/api/profile/2')
        .then((response) => {
            const username = response.data.username
            const bio = response.data.bio
            const weightGoal = response.data.weight_goal
            const activityGoal = response.data.activity_goal
            const calorieGoal = response.data.calorie_goal
            
            profileDescription.innerHTML = `
            <div class="profile-description-container">
            <div class="page-title">
            <h1>Your Profile</h1>
            </div>
            <div class="gradient-background"></div>
            <div class="profile-picture"></div>
            <div id="errors"></div>
            <form class="user-details" id="user-details" method="POST">
                <h2>Username<input type="text" name="username" value="${username}" placeholder="Update your username"/></h2>
                <h2>Bio<input type="text" name="bio" value="${bio}" placeholder="e.g. I like long walks on the beach"/></h2>
                <h2>Weight Goal<input type="text" name="weightGoal" value="${weightGoal}" placeholder="Enter in KGs"/></h2>
                <h2>Activity Goal<input type="text" name="activityGoal" value="${activityGoal}" placeholder="How many times a week?"/></h2>
                <h2>Calorie Goal<input type="text" name="calorieGoal" value="${calorieGoal}" placeholder="What is your calorie goal?"/></h2>
                <button class="save-button">Save</button>
            </form>
            
            `

            mainContainer.appendChild(profileDescription);
            
            const saveButton = document.querySelector('.save-button');
            saveButton.addEventListener('click', submitProfileDescription);

            function submitProfileDescription(event) {
                event.preventDefault();
                const userDetails = document.getElementById('user-details');
                const userDetailsFormData = new FormData(userDetails);
                const data = {
                    username: userDetailsFormData.get('username'),
                    bio: userDetailsFormData.get('bio'),
                    weight_goal: userDetailsFormData.get('weightGoal'),
                    activity_goal: userDetailsFormData.get('activityGoal'),
                    calorie_goal: userDetailsFormData.get('calorieGoal')
                }

                const errors = document.getElementById('errors');
                const errorChild = document.createElement('p'); 

                axios
                .put('/api/accounts/2', data)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    errors.innerHTML = ''
                    errorChild.innerHTML = error.response.data.message;
                    errorChild.classList.add('error-message');
                    errors.appendChild(errorChild);
                })
            }

        });

}