const signUpFormContainer = document.getElementById('sign-up-form-container')
const signUpForm = document.createElement('form')
signUpForm.setAttribute('method', 'POST')
signUpForm.innerHTML = `
        <div class="form-container" id="form-container">
            <h1>GoFit</h1>
            <h2>Sign up to get started.</h2>
            <p>Track progress toward your nutrition, fitness and weight loss with your mates.</p>
            <section id="errors"></section>
            <div class="sign-up-1" id="sign-up-1">
                <input type="text" name="f_name" placeholder="First Name" required /><br>
                <input type="text" name="l_name" placeholder="Last Name"  /><br>
                <input type="text" name="email" placeholder="Email" required /><br>
                <input type="password" name="password" placeholder="Password" required /><br>
                <input type="password" name="password2" placeholder="Confirm Password"/><br>
                <button type="button" class="next-button" id="next">Next</button><br>
            </div>
            <div class="sign-up-2" id="sign-up-2">
                <input type="text" name="username" placeholder="Username" required/><br>
                <input type="text" name="bio" placeholder="Bio"/><br>
                <input type="text" name="weight_goal" placeholder="Weight Goal" required/><br>
                <input type="text" name="activity_goal" placeholder="Activity Goal" required/><br>
                <input type="text" name="calorie_goal" placeholder="Calorie Goal" required/><br>
                <button type="button" class="back-button" id="back">Back</button><br>
                <button class="submit">Sign Up</button><br>
            </div>
        </div>
        <p>Already have an account? <a href="/login.html">Log in</a></p>
`

window.onload = function() {
    const signUpForm1 = document.querySelector('.sign-up-1')
    const signUpForm2 = document.querySelector('.sign-up-2')
    signUpForm2.style.display = 'none'
    const nextButton = document.getElementById('next')
    nextButton.addEventListener('click', () => {
        signUpForm1.style.display = 'none'
        signUpForm2.style.display = 'block'
    })
    const backButton = document.getElementById('back')
    backButton.addEventListener('click', () => {
        signUpForm1.style.display = 'block'
        signUpForm2.style.display = 'none'
    })
}

signUpFormContainer.appendChild(signUpForm);

signUpForm.addEventListener('submit', submitSignUpForm);

function submitSignUpForm(event) {
    event.preventDefault()

    const signUpFormData = new FormData(signUpForm)
    const data = {
        f_name: signUpFormData.get('f_name'),
        l_name: signUpFormData.get('l_name'),
        email: signUpFormData.get('email'),
        password: signUpFormData.get('password'),
        username: signUpFormData.get('username'),
        bio: signUpFormData.get('bio'),
        weight_goal: signUpFormData.get('weight_goal'),
        activity_goal: signUpFormData.get('activity_goal'),
        calorie_goal: signUpFormData.get('calorie_goal')

    }

    const errors = document.getElementById('errors');
    const errorChild = document.createElement('p');

    axios
        .post('/api/accounts', data)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            errors.innerHTML = ''
            errorChild.innerHTML = error.response.data.message;
            errorChild.classList.add('error-message');
            errors.appendChild(errorChild)

            console.log(error.response.data.message)
        })
}
