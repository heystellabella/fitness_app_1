import { renderLogInForm } from './login.js'

export function renderSignUpForm() {

    const head = document.getElementsByTagName('head')[0]
    head.innerHTML = `
        <link rel="stylesheet" href="./css/sign-up-styles.css">
        <title>Sign Up | GoFit</title>
    `

    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = `
        <main class="main-container">
            <header>
                <!-- Insert Logo Below -->
            </header>
            <div class="flex-form-parent-element">
                <section class="flex-child-element sign-up-form-container" id="sign-up-form-container">
                </section>
            
                <div class="flex-child-element image-container">
                    <img src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="">
                </div>
            </div>
        </main>
    `

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
                    <input type="text" name="f_name" placeholder="First Name" /><br>
                    <input type="text" name="l_name" placeholder="Last Name"  /><br>
                    <input type="text" name="email" placeholder="Email" /><br>
                    <input type="password" name="password" placeholder="Password" /><br>
                    <input type="password" name="password2" placeholder="Confirm Password"/><br>
                    <button type="button" class="next-button" id="next-button">Next</button><br>
                </div>
                <div class="sign-up-2" id="sign-up-2" style="display: none">
                    <input type="text" name="username" placeholder="Username" required/><br>
                    <input type="text" name="bio" placeholder="Bio"/><br>
                    <input type="text" name="weight_goal" placeholder="Weight Goal" required/><br>
                    <input type="text" name="activity_goal" placeholder="Activity Goal" required/><br>
                    <input type="text" name="calorie_goal" placeholder="Calorie Goal" required/><br>
                    <button type="button" class="back-button" id="back-button">Back</button><br>
                    <button class="submit">Sign Up</button><br>
                </div>
            </div>
            <p>Already have an account? <span class="log-in-link">Log in</span></p>
    `

    signUpFormContainer.appendChild(signUpForm);

    document.getElementById('next-button').addEventListener('click', () => {
        document.getElementById('sign-up-1').style.display = 'none'
        document.getElementById('sign-up-2').style.display = 'block'

    })

    document.getElementById('back-button').addEventListener('click', () => {
        document.getElementById('sign-up-1').style.display = 'block'
        document.getElementById('sign-up-2').style.display = 'none'
    })

    document.querySelector('.log-in-link').addEventListener('click', () => {
        renderLogInForm()
    })

    signUpForm.addEventListener('submit', submitSignUpForm);

    function submitSignUpForm(event) {
        event.preventDefault()

        const signUpFormData = new FormData(signUpForm)
        const data = {
            f_name: signUpFormData.get('f_name'),
            l_name: signUpFormData.get('l_name'),
            email: signUpFormData.get('email'),
            password: signUpFormData.get('password'),
            password2: signUpFormData.get('password2'),
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
                renderLogInForm()
            })
            .catch((error) => {
                errors.innerHTML = ''
                errorChild.innerHTML = error.response.data.message;
                errorChild.classList.add('error-message');
                errors.appendChild(errorChild)

                console.log(error.response.data.message)
            })
    }


}