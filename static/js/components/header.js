import { renderCalaries } from "./calariesList.js";

export function renderHeader() {
    const header = document.getElementById("header-nav");

    header.innerHTML = `
    <h1>GoFit</h1>
    <section id = "create_form"></section>
    <ul id="navlist">
       <li id="cal_form_btn">Calaries</li>
       <section id="cal_page"></section?
       
    </ul>
   `;

   document.getElementById('cal_form_btn').addEventListener('click', renderCalaries)
}