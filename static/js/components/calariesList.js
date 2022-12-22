

export function renderCalaries() {
    console.log('rendered')
    const cal_page = document.getElementById('cal_page')
    cal_page.innerHTML = ""

    axios
        .get("http://localhost:3000/profile/calaries")

}