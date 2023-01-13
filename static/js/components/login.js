import { renderSignUpForm } from './signup.js'
import { renderHome } from './homeDashboard.js' 

export function renderLogInForm() {

    const head = document.getElementsByTagName('head')[0]
    head.innerHTML = `
        <title>Login | GoFit</title>
        <link rel="stylesheet" href="./css/login-styles.css">
    `

    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = `
    <main class="main-container">
        <header>
            <!-- Insert Logo Below -->
        </header>
        <div class="flex-form-parent-element">
            <section class="flex-child-element login-form-container" id="login-form-container">
            </section>
        
            <div class="flex-child-element image-container">
                <img src="https://images.unsplash.com/photo-1629993471098-9cc8de61aece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHdvcmtvdXR8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="">
            </div>
        </div>
    </main>
    `

    const loginFormContainer = document.getElementById('login-form-container');
    const loginForm = document.createElement('form');
    loginForm.setAttribute('method', 'POST');
    loginForm.setAttribute('id', 'login-form');
    loginForm.innerHTML = `
            <h1>GoFit</h1>
            <h2>Welcome back. Let's get it.</h2>
            <section id="errors"></section>
            <input id="email" type="text" name="email" placeholder="email" required /><br>
            <input id="password" type="password" name="password" placeholder="password" required/><br>
            <button class="submit">Log in</button><br>
            <p>Don't have an account? <span class="sign-up-link">Sign Up</span></p>
    `;
    
    loginFormContainer.appendChild(loginForm);

    const signUpButton = document.querySelector('.sign-up-link');
    signUpButton.addEventListener('click', () => {
        renderSignUpForm();
    });
    
    loginForm.addEventListener('submit', submitLoginForm);
    
    function submitLoginForm(event) {
        event.preventDefault();
    
        const loginFormData = new FormData(loginForm);
        const data = {
            email: loginFormData.get('email'),
            password: loginFormData.get('password')
        }
        
        const errors = document.getElementById('errors');
        const errorChild = document.createElement('p');
        
        axios
        .post('/api/login-session', data)
        .then((response) => {
            errorChild.innerHTML = response.data.message;
            errors.appendChild(errorChild);
            window.location.href = '/';
        })
        .catch((error) => {
            errors.innerHTML = ''
            errorChild.innerHTML = error.response.data.message;
            errorChild.classList.add('error-message');
            errors.appendChild(errorChild);
            
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
    
            if (error.response.data.message === 'User not found') {
                emailInput.value = '';
                passwordInput.value = '';
                emailInput.focus();
            }
    
            if (error.response.data.message === 'Invalid password') {
                passwordInput.value = '';
                passwordInput.focus();
            }
    
        })

    }

}
