

export function renderCalaries() {
    
    console.log('rendered')

    const cal_section = document.getElementById('calarie-container')
    
    cal_section.innerHTML = ""

    axios
        .get('http://localhost:3000/profile/calaries/1')
        .then((response) => {
            const list = response.data
            console.log(list)
            const cal = document.createElement('h3')
            cal.innerText = 'Calares Burned: '
            const calData = document.createElement('h3')
            calData.innerText = list[0].calories
            console.log(calData)
            cal_section.after(calData)
            cal_section.after(cal)
          



        }
        )

}

// const cal_page = document.getElementById('view-calorie-button')


// if (cal_page) {
//     cal_page.addEventListener('click', renderCalaries)}

