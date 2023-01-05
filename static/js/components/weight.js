export function renderWeightPage() {
    // Retrieving the main container element on the html page
    const mainContainer = document.getElementById("main-container")

    // Create div to hold weight data
    const weightContainer = document.createElement("div")

    // Assigning the weight container with id of 'weight data'
    weightContainer.id = "weight-data"

    // Appending this to the main container section of the html page.
    mainContainer.appendChild(weightContainer)

    axios
        // Getting the JSON information from the weight table for user x (in this case user 1)
        .get("/api/weight/1")
        // Using this response to display information on html page.
        .then((response) => {
            console.log(response.data)
            // dbResponse is an array of objects. Each object is an entry of the user's date, weight, user id and weight tracker id.
            const dbResponse = response.data
            console.log("database response is: ", dbResponse)

            // Loop through each weight entry of the user to get the date and weight
            for (let i = 0; i < dbResponse.length; i++) {   
                // Storing the weight and date from the db response into variables
                const weight = dbResponse[i].weight
                const date = dbResponse[i].date

                console.log("date array is: ", date)
                console.log("weight array is: ", weight)

                // Creating a new div for each entry
                const dailyWeight = document.createElement("div")

                // Inputting the newly created div with the weight and date
                dailyWeight.innerHTML = `
                    <p>On the ${date}, you weighed ${weight}kg.</p>
                `

                // Appending each entry to the overall weight container.
                weightContainer.appendChild(dailyWeight)
            }
        })

}