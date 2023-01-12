export function renderNewCalories() {
    console.log('render form')
    const form_section = document.getElementById('form_section')

    const form = document.createElement('form')
    form.innerHTML = `
  
        <label for="date">Date: </label><br>
        <input type="date" name="date">
        <label for="calories">Calories: </label><br>
        <input type="number" name="calories">
        <button>Submit</button>`
    form.setAttribute("method","POST")
    form_section.appendChild(form)

}