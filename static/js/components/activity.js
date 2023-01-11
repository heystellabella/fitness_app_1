export function renderActivityPage() {
    // Retrieving the main container element on the html page
    const mainContainer = document.getElementById("main-container")
    mainContainer.innerHTML = ""
    // Create div to hold activity data
    const activityContainer = document.createElement("div")

    // Assigning the activity container with id of 'activity data'
    activityContainer.id = "activity-data"

    // Appending this to the main container section of the html page.
    mainContainer.appendChild(activityContainer)
    axios
        .get("api/session")
        .then((response) => {
            const user_id = response.data.user_id
            axios
                // Getting the JSON information from the activity table for user x (in this case user 1)

                .get(`/api/activity/${user_id}`)
                // Using this response to display information on html page.
                .then((response) => {
                    console.log(response.data)
                    // dbResponse is an array of objects. Each object is an entry of the user's date, activity, user id and activity tracker id.
                    const dbResponse = response.data
                    console.log("database response is: ", dbResponse)

                    // Loop through each activity entry of the user to get the date and activity
                    for (let i = 0; i < dbResponse.length; i++) {
                        // Storing the activity and date from the db response into variables
                        const activity = dbResponse[i].activities
                        const date = dbResponse[i].date

                        console.log("date array is: ", date)
                        console.log("activity array is: ", activity)

                        // Creating a new div for each entry
                        const dailyActivity = document.createElement("div")

                        // Inputting the newly created div with the Activity and date
                        dailyActivity.innerHTML = `
                        <p>Date: ${date}: <br>
                        Activity: ${activity}</p>`

                        // Appending each entry to the overall activity container.
                        activityContainer.appendChild(dailyActivity)
                    }
                })
        })


}