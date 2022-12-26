const loginFormContainer = document.getElementById('login-form-container');
const loginForm = document.createElement('form');
loginForm.setAttribute('method', 'POST');
loginForm.setAttribute('id', 'login-form');
loginForm.innerHTML = `
        <h1>Login</h1>
        <section id="errors"></section>
        <input type="text" name="email" placeholder="email address"/><br>
        <input type="password" name="password" placeholder="password"/><br>
        <button class="submit">Log in</button><br>
        <p>Not a member? <a href="/sign-up.html">Sign up now</a></p>
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
    
    axios
        .post('/api/login-session', data)
        .then((response) => {
            console.log(response.data)
        })
}