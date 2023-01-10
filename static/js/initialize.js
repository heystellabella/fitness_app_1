import { renderHeader } from './components/header.js'
import { renderFooter } from './components/footer.js'
import { renderHome } from './components/homeDashboard.js'
import { renderProfileDescription } from './components/profileDescription.js'
import { renderCalaries } from './components/calariesList.js'
import { renderWeightPage } from './components/weight.js'
import { renderActivityPage } from './components/activity.js'
import { renderLogOutState } from './components/logOutState.js'

axios
    .get('/api/session')
    .then((response) => {
        console.log(response.data)
        const f_name = response.data.f_name
        if (response.data.user_id) {
            renderHeader()
            renderWeightPage()
            renderActivityPage()
            renderHome()
            renderHeader()
            renderProfileDescription()
            renderFooter()
            renderCalaries()
        } else {
            renderLogOutState()
        }
    })