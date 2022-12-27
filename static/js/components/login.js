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
        <p>Don't have an account? <a href="/sign-up.html">Sign Up</a></p>
`;

loginFormContainer.appendChild(loginForm);

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