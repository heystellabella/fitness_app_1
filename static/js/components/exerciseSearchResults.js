export function renderExerciseSearchResults() {
    
    const mainContainer = document.getElementById("main-container")
    mainContainer.innerHTML = ''

    const mainCardContainer = document.createElement('div')
    mainCardContainer.setAttribute('class', 'main-card-container')

    const searchValue = document.getElementById("search-bar").value;

    axios
    .get(`https://exercisedb.p.rapidapi.com/exercises/name/${searchValue}`, {
        headers: {
        "X-RapidAPI-Key": "164db46a4amsh7966b0337aa8006p128e47jsn6e9b51af6944",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
    })
    .then((response) => {
        console.log(response.data)

        const resultsHeader = document.createElement('h2')
        resultsHeader.setAttribute('class', 'results-header')

        const resultsContainer = document.createElement('div')
        resultsContainer.setAttribute('class', 'results-container')
        mainCardContainer.appendChild(resultsContainer)

        if (response.data.length === 0) {
            resultsHeader.textContent = 'No Results Found'
            mainCardContainer.appendChild(resultsHeader)
        } else {

            if (response.data.length > 10) {
                resultsHeader.textContent = `Showing 10 Results`
                mainCardContainer.appendChild(resultsHeader)

                for (let i = 0; i < 10; i++) {
                    const result = document.createElement('div')
                    result.setAttribute('class', 'result')
                    result.innerHTML = `
                        <h3>${response.data[i].name}</h3>
                        <h4>Body Part: ${response.data[i].bodyPart}</h4>
                        <h5>Equipment: ${response.data[i].equipment}</h5>
                        <img src="${response.data[i].gifUrl}">
                    `
                    resultsContainer.appendChild(result)
                }
            }

        }

        mainContainer.appendChild(mainCardContainer)

    })
}
