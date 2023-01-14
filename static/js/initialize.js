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
        
        // const f_name = response.data.f_name
        // NTS: Why cant I pass the f_name variable to the renderHeader function?
        if (response.data.user_id) {
            renderHeader()
            // renderWeightPage()
            // renderActivityPage()
            renderHome()
            // renderProfileDescription()
            renderFooter()
            // renderCalaries()
        } else {
            renderLogOutState()
            renderFooter()
        }
    })