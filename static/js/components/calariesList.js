


export function renderCalaries() {
    
    console.log('rendered')

    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    // const cal_section = document.createElement('div')
    // cal_section.id = 'cal_section'

    axios
    .get("/api/session")
    .then((response) => {
        console.log(response.data)
        const user_id = response.data.user_id

        axios
            .get(`/profile/calaries/${user_id}`)
            .then((response) => {
                const list = response.data
                console.log(list)
                console.log('hello')

                const cal_section = document.createElement('div')
                cal_section.id = 'cal-section'

               

                list.forEach(item=> {
                console.log(item)
                const user_id = item.user_id
               
                console.log(user_id)
                const date = new Date(item.date)
                console.log(date)
                let year = date.getFullYear(date)
                let month = date.getMonth(date)
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                let displayMonth = monthNames[month]
                console.log(month)
                let day = date.getDay(date)
                let d = date.getDate()
                const calories = item.calories
                // const cal_section = document.createElement('div')

                cal_section.innerHTML += `
                
                <div class="cal-card-container">
                <div id="cal_rendering">
                   
                    <h2>Acitivty Date: ${day + 1} - ${displayMonth} - ${year}</h2>
                    <h2>Calaries Consumed: ${calories} Calaries</h2>
                </div>
                </div>
                

                
               
                `})
                mainContainer.appendChild(cal_section)   
            
            })   
            })}
