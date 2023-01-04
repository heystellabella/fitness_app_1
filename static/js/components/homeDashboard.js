export function renderHome() {
    const mainContainer = document.getElementById('main-container')
    mainContainer.innerHTML = ''
    mainContainer.innerHTML = `
        <div id="home-container" class="main-card-container">
            <div class="page-title">
                <h1>Home</h1>
            </div>
        </div>
    `
}