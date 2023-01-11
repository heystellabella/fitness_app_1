import { renderLogInForm } from './login.js'
import { renderSignUpForm } from './signup.js'


export function renderLogOutState() {
    console.log('logged out')

    const header = document.getElementById('header-container')

    const nav = document.createElement('nav')
    nav.id = 'header-nav'
    header.appendChild(nav)

    const mainnav = document.createElement('ul')
    mainnav.id = 'mainnav'
    mainnav.classList.add('mainnav')

    mainnav.innerHTML = `
        <li id="about">About</li>
        <li id="home-logo">GoFit</li>
        <div id="cta" class="cta">
            <li id="cta-join-now" class="join-now">Join Now</li>
            <li id="cta-login" class="login">Log In</li>
        </div>

    `
    nav.appendChild(mainnav)

    const loginButton = document.querySelector('.login')

    loginButton.addEventListener('click', () => {

        renderLogInForm()
    })

    const joinNowButton = document.querySelector('.join-now')

    joinNowButton.addEventListener('click', () => {

        renderSignUpForm()
    })

    const mainContainer = document.getElementById('main-container')
    mainContainer.innerHTML = ''
    const heroBanner = document.createElement('div')
    heroBanner.id = 'hero-banner'
    mainContainer.appendChild(heroBanner)

    const heroImageContainer = document.getElementById('hero-banner')
    heroImageContainer.classList.add('hero-image')

    const heroBannerContent = document.createElement('div')
    heroBannerContent.id = 'hero-banner-content'
    heroImageContainer.appendChild(heroBannerContent)

    const heroParagraph = document.createElement('p')
    heroParagraph.classList.add('hero-paragraph')
    heroParagraph.textContent = 'Set Goals. Track Progress. Get Fit.'
    heroBannerContent.appendChild(heroParagraph)

    const callToActionButton = document.createElement('a')
    callToActionButton.classList.add('call-to-action-button')
    callToActionButton.textContent = 'Create An Account'
    heroBannerContent.appendChild(callToActionButton)
}