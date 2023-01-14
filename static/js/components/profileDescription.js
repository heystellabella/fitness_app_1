export function renderProfileDescription() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    const profileDescription = document.createElement('div');
    profileDescription.id = 'profile-description';


    axios
    .get("/api/session")
    .then((response) => {

        const user_id = response.data.user_id

        axios
        .get(`/api/profile/${user_id}`)

        .then((response) => {
                const f_name = response.data.f_name
                const l_name = response.data.l_name
                const username = response.data.username
                const bio = response.data.bio
                const weightGoal = response.data.weight_goal
                const activityGoal = response.data.activity_goal
                const calorieGoal = response.data.calorie_goal
                
                profileDescription.innerHTML = `
                <div class="main-card-container">
                <div class="page-title">
                    <h1>Your Profile</h1>
                </div>
                <div class="gradient-background"></div>
                <div class="profile-picture"></div>
                <div id="response-element"></div>
                <form class="user-details" id="user-details" method="POST">
                    <div class="submit-container">
                        <h2>${f_name} ${l_name}</h2>
                        <button class="upload-picture" type="submit"><i class="fa-regular fa-image"></i></button>
                        <button class="submit">Save</button>    
                    </div>
                    <div class="form-container">
                        <div class="form-col">
                            <h2>Username:</h2>
                            <h2>Bio:</h2>
                            <h2>Weight Goal:</h2>
                            <h2>Activity Goal:</h2>
                            <h2>Calorie Goal:</h2>
                        </div>
                        <div class="form-col" id="form-inputs">
                            <input type="text" name="username" value="${username}" placeholder="Update your username"/>
                            <input type="text" name="bio" value="${bio}" placeholder="e.g. I like long walks on the beach"/>
                            <input type="text" class="weight-goal" name="weightGoal" value="${weightGoal}" placeholder="Enter in KGs"/>
                            <input type="text" name="activityGoal" value="${activityGoal}" placeholder="How many times a week?"/>
                            <input type="text" name="calorieGoal" value="${calorieGoal}" placeholder="What is your calorie goal?"/>
                        </div>
                    </div>
                </form>
                </div>
                
                `;
    
                mainContainer.appendChild(profileDescription);
                
                const saveButton = document.querySelector('.submit');
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
    
                    const responseElement = document.getElementById('response-element');
                    const responseElementChild = document.createElement('p'); 
                    responseElementChild.classList.add('response-message');
                    responseElement.innerHTML = ''
    
                    axios
                    .put(`/api/accounts/${user_id}`, data)
                    .then((response) => {
                        responseElementChild.innerHTML = response.data.message;
                        responseElement.appendChild(responseElementChild);
                    })
                    .catch((error) => {
                        responseElementChild.innerHTML = error.response.data.message;
                        responseElement.appendChild(responseElementChild);
    
                        if (error.response.data.message === 'Please enter a number for your weight goal.') {
                            const weightGoalInput = document.querySelector('.weight-goal');
                            weightGoalInput.value = '';
                            weightGoalInput.focus();
                        } 
                    })
                }
    
                const submitProfilePicture = document.querySelector('.upload-picture');
                submitProfilePicture.addEventListener('click', uploadProfilePicture);
    
                function uploadProfilePicture(event) {

                    event.preventDefault();
                    // const userDetails = document.getElementById('user-details');
                    // const profilePictureFormData = new FormData(userDetails);
                    // const data = {
                    //     profile_picture: profilePictureFormData.get('profilePicture')
                    // }
    
                    // axios
                    // .put('/api/accounts/2', data)
                    // .then((response) => {
                    //     cloudinary.uploader.upload
                    // })
                };
    
            });

    })

}