export function renderActivityPage() {
    // Retrieving the main container element on the html page
    const mainContainer = document.getElementById("main-container")
    mainContainer.innerHTML = ""

    const activityInputForm = document.createElement("form")
    activityInputForm.setAttribute('method', 'POST');
    activityInputForm.id = "activity-input-form"

    activityInputForm.innerHTML = `
        <h2>Log your activity here: </h2><br>
        <form class="activity-input-form" method="POST"> 
        
        Date: <input id="date" type="date" name="date" placedoler="date" required> <br>
        What activity did you do today?
        <input id="activity-input-box" type="text" name="activity" placeholder="Activity" required><br>
        <button class="submit">Save</button>
        </form>
    `
    activityInputForm.addEventListener("submit", submitActivityEntry)

    function submitActivityEntry(event) {
        event.preventDefault()

        const activityInputData = new FormData(activityInputForm);
        const data = {
            date: activityInputData.get("date"),
            activity: activityInputData.get("activity")
        }
       
        axios
            .get("/api/session")
            .then((response) => {
     
                const user_id = response.data.user_id
    
                axios
                    .post(`/api/activityEntry/${user_id}`, data)
                    .then((response) => {
                        window.location.href = "/"
                    }).catch((error) => {
                        console.log(error)
                    })
            })

    }

    mainContainer.appendChild(activityInputForm)
    // Create div to hold activity data
    const activityContainer = document.createElement("div")

    // Assigning the activity container with id of 'activity data'
    activityContainer.id = "activity-data"

    // Appending this to the main container section of the html page.
    mainContainer.appendChild(activityContainer)
    axios
        .get("/api/session")
        .then((response) => {
            const user_id = response.data.user_id
            axios
                // Getting the JSON information from the activity table for user x (in this case user 1)

                .get(`/api/activity/${user_id}`)
                // Using this response to display information on html page.
                .then((response) => {

                    // dbResponse is an array of objects. Each object is an entry of the user's date, activity, user id and activity tracker id.
                    const dbResponse = response.data

                    // Loop through each activity entry of the user to get the date and activity
                    for (let i = 0; i < dbResponse.length; i++) {
                        // Storing the activity and date from the db response into variables
                        const activity = dbResponse[i].activities
                        const date = dbResponse[i].date
                        const activity_tracker_id = dbResponse[i].activity_tracker_id

                        const slicedActivityDate = date.slice(0, 10).split('-').reverse().join('-').replace('-', '/').replace('-', '/')

                        // Creating a new div for each entry
                        const dailyActivity = document.createElement("div")
                        dailyActivity.setAttribute("class", "daily-activty-card")

                        // Inputting the newly created div with the Activity and date
                        dailyActivity.innerHTML = `
                        <p>Date: ${slicedActivityDate} <br><br>
                        Activity: <br>${activity}</p> <br>
                        
                        <button class="edit-button" id="edit-button-${activity_tracker_id}">Edit</button> 
                        <button class="delete-button" id="delete-button-${activity_tracker_id}">Delete</button>`

                        // Appending each entry to the overall activity container.
                        activityContainer.appendChild(dailyActivity)

                        const delete_button = document.getElementById(`delete-button-${activity_tracker_id}`)

                        const edit_button = document.getElementById(`edit-button-${activity_tracker_id}`)

                        delete_button.addEventListener("click", deleteActivityEntry)
                        edit_button.addEventListener("click", editActivityEntry)

                        function deleteActivityEntry(event) {
                            event.preventDefault()
   
                            axios
                                .delete(`/api/activity/${user_id}/${activity_tracker_id}`)
                                .then((response) => {
                                    window.location.href = "/"
                                })
                        }

                        function editActivityEntry(event) {
                            event.preventDefault()

                            // form to put in new data
                            const activityEditForm = document.createElement("form")
                            activityEditForm.setAttribute('method', 'PUT');
                            activityEditForm.id = "activity-edit-form"

                            activityEditForm.innerHTML = `
                            Date: <input id="date" type="date" name="date" placedoler="date" required> <br><br>
                            What activity did you do today? <br>
                            <input id="activity" type="text" name="activity" placeholder="Activity" required><br><br>
                            <button class="submit">Save</button>`

                            activityEditForm.addEventListener("submit", submitActivityEdit)

                            function submitActivityEdit(event) {
                                event.preventDefault()

                                const newActivityData = new FormData(activityEditForm)

                                const data = {
                                    date: newActivityData.get("date"),
                                    activity: newActivityData.get("activity")
                                }

                                axios
                                .put(`/api/activity/${user_id}/${activity_tracker_id}`, data)
                                .then((response) => {
                                    window.location.href = "/"
                                }).catch((error) => {
                                    console.log("error")
                                })
                            }
                            dailyActivity.append(activityEditForm)
                        }

                    }
                })
        })


}