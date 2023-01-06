

export function renderCalaries() {
    
    console.log('rendered')

    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    // const cal_section = document.createElement('div')
    // cal_section.id = 'cal_section'



    axios
        .get('http://localhost:3000/profile/calaries/1')
        .then((response) => {
            const lists = response.data
            console.log(lists)

            const cal_section = document.createElement('div')
            cal_section.id = 'cal_section'

            lists.forEach(list=> {
            console.log(list)
            const user_id = list.user_id
            const user_name = list.f_name
            console.log(user_id)
            const date = new Date(list.date)
            let year = date.getFullYear(date)
            let month = date.getMonth(date)
            let day = date.getDay(date)
            let d = date.getDate()
            const calories = list.calories

            cal_section.innerHTML = `
            <div class="main-card-container">
            <div class="page-title">
            <h1>Calories</h1>
            </div>
            <div id="cal_rendering">
                <h2>User Name: ${user_name}</h2>
                <h2>Acitivty Date: ${day} - ${month} - ${year}</h2>
                <h2>Calaries Consumed: ${calories} Calaries</h2>
            </div>
            </div>
            </div>
            `})
            mainContainer.appendChild(cal_section)

        
        
        
        
        
        })   
        }

          
            

