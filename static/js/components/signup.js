const signUpFormContainer = document.getElementById('sign-up-form-container')
const signUpForm = document.createElement('form')
signUpForm.setAttribute('method', 'POST')
signUpForm.innerHTML = `
        <section id="errors"></section>
        <div class="sign-up-1">
            <input type="text" name="name" placeholder="Name" required /><br>
            <input type="text" name="email" placeholder="Email" required /><br>
            <input type="password" name="password" placeholder="Password" required /><br>
            <input type="password" name="password2" placeholder="Confirm Password"/><br>
            <button type="button" id="next">Next</button><br>
        </div>
        <div class="sign-up-2">
            <input type="text" name="username" placeholder="Username" required/><br>
            <input type="text" name="bio" placeholder="Bio"/><br>
            <input type="text" name="weight_goal" placeholder="Weight Goal" required/><br>
            <input type="text" name="activity_goal" placeholder="Activity Goal" required/><br>
            <input type="text" name="calorie_goal" placeholder="Calorie Goal" required/><br>
            <button>Sign Up</button><br>
        </div>
        <a href="/sign-up.html">Sign in</a>
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
}

signUpFormContainer.appendChild(signUpForm);

signUpForm.addEventListener('submit', submitSignUpForm);

function submitSignUpForm(event) {
    event.preventDefault()

    const signUpFormData = new FormData(signUpForm)
    const data = {
        f_name: signUpFormData.get('name'),
        email: signUpFormData.get('email'),
        password: signUpFormData.get('password')
    }

    // TO DO: validate the password to the confirm password
    axios
        .post('/api/accounts', data)
        .then((response) => {
            console.log(response.data)
        })
}
