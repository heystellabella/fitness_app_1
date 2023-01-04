

export function renderCalaries() {
    
    console.log('rendered')

    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    const cal_section = document.createElement('div')
    cal_section.id = 'cal_section'



    axios
        .get('http://localhost:3000/profile/calaries/1')
        .then((response) => {
            const list = response.data
            console.log(list)
            const user_id = list[0].user_id
            console.log(user_id)
            const date = list[0].date
            const calories = list[0].calories

            cal_section.innerHTML = `
            <div class="main-card-container">
            <div class="page-title">
            <h1>Calories</h1>
            </div>
            </div>
            `
            mainContainer.appendChild(cal_section)

        
        
        
        
        
        })   
        }

          
            

