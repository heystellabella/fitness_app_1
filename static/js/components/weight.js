export function renderWeightPage() {
    console.log("i clicked this")
    // Retrieving the main container element on the html page
    const mainContainer = document.getElementById("main-container")
    mainContainer.innerHTML = ""

    // Create a div to for the form to input weight
    const weightInputForm = document.createElement("form")
    weightInputForm.setAttribute('method', 'POST');
    weightInputForm.id = "weight-input-form"

    weightInputForm.innerHTML = `
        <h2>Log your weight here: </h2><br>
        Date: <input id="date" type="date" name="date" placedoler="date" required> <br>
        Weight: <input id="weight" type="number" name="weight" placeholder="Weight in kgs" required> <br>
        <button class="submit">Save</button>`

    weightInputForm.addEventListener("submit", submitWeightEntry)

    function submitWeightEntry(event) {
        event.preventDefault()

        const weightInputData = new FormData(weightInputForm);
        const data = {
            weight: weightInputData.get("weight"),
            date: weightInputData.get("date")
        }
        console.log(data.date)



        console.log("better date:", slicedActivityDate)
        axios
            .get("/api/session")
            .then((response) => {
                console.log(response)
                const user_id = response.data.user_id
                console.log(user_id)
                axios
                    .post(`/api/weightEntry/${user_id}`, data)
                    .then((response) => {

                        window.location.href = "/"

                    }).catch((error) => {
                        console.log(error)
                    })
            })
    }

    mainContainer.appendChild(weightInputForm)

    // Create div to hold weight data
    const weightContainer = document.createElement("div")

    // Assigning the weight container with id of 'weight data'
    weightContainer.id = "weight-data"

    // Appending this to the main container section of the html page.
    mainContainer.appendChild(weightContainer)
    axios
        .get("/api/session")
        .then((response) => {
            const user_id = response.data.user_id
            axios
                // Getting the JSON information from the weight table for user x (in this case user 1)
                .get(`/api/weight/${user_id}`)
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
                        const weight_tracker_id = dbResponse[i].weight_tracker_id

                        const slicedActivityDate = date.slice(0, 10).split('-').reverse().join('-').replace('-', '/').replace('-', '/')

                        console.log("date array is: ", date)
                        console.log("weight array is: ", weight)

                        // Creating a new div for each entry
                        const dailyWeight = document.createElement("div")
                        dailyWeight.setAttribute("class", "daily-weight-card")

                        // // Inputting the newly created div with the weight and date
                        dailyWeight.innerHTML = `
                        <p>On ${slicedActivityDate}, you weighed ${weight}kg.</p> <br>
                        <button class="edit-button" id="edit-button-${weight_tracker_id}">Edit</button> 
                        <button class="delete-button" id="delete-button-${weight_tracker_id}">Delete</button>`

                        // Appending each entry to the overall weight container.
                        weightContainer.appendChild(dailyWeight)

                        const delete_button = document.getElementById(`delete-button-${weight_tracker_id}`)
                        const edit_button = document.getElementById(`edit-button-${weight_tracker_id}`)


                        delete_button.addEventListener("click", deleteWeightEntry)
                        edit_button.addEventListener("click", editWeightEntry)

                        function deleteWeightEntry(event) {
                            event.preventDefault()
                            console.log("delete button clicked")
                            axios
                                .delete(`/api/weight/${user_id}/${weight_tracker_id}`)
                                .then((response) => {
                                    console.log("deleted")
                                    window.location.href = "/"
                                })
                        }

                        function editWeightEntry(event) {
                            event.preventDefault()

                            // form to put in new data
                            const weightEditForm = document.createElement("form")
                            weightEditForm.setAttribute('method', 'PUT');
                            weightEditForm.id = "weight-edit-form"

                            weightEditForm.innerHTML = `
                                Weight: <input id="weight" type="number" name="weight" placeholder="Weight" required> kg <br><br>
                                Date: <input id="date" type="date" name="date" placedoler="date" required> <br><br>
                                <button class="submit">Save</button>`

                            weightEditForm.addEventListener("submit", submitWeightEdit)

                            function submitWeightEdit(event) {
                                event.preventDefault()

                                const newWeightData = new FormData(weightEditForm)

                                const data = {
                                    date: newWeightData.get("date"),
                                    weight: newWeightData.get("weight")
                                }

                                axios
                                .put(`/api/weight/${user_id}/${weight_tracker_id}`, data)
                                .then((response) => {
                                    window.location.href = "/"
                                }).catch((error) => {
                                    console.log("error")
                                })
                            }
                            dailyWeight.append(weightEditForm)
                        }


                    }
                })
        })
}