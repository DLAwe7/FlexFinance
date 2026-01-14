import {toggleDropdownMenu, toggleLightMode, applySavedTheme} from './Components/dropdown-menu.js';
import {toggleAccordion, toggleMenu} from "./functionality.js"
import { handleClickOutside, handleEsc, inertToggle, setAriaCurrent } from './accessibility.js';



async function loadComponent(id, file){
    const response = await fetch(file);
    const content = await response.text();
    document.getElementById(id).innerHTML = content;
}

async function init(){

    const components = [
        {id: "header", file: "header.html"},
        {id: "main-aside", file: "aside.html"},
        {id: "footer", file: "footer.html"}
    ];

    

    await Promise.all(components.map(({id, file}) => loadComponent(id, file)));

    applySavedTheme();
    currentPageInit();
    
}

function currentPageInit(){


    // === Aria labels updaters ===

    setAriaCurrent();

    // === Global Handlers ===

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("click", handleClickOutside);


    // === Sidebar toggles ====

    document.querySelectorAll('.main-sidebar-toggle').forEach(btn => btn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu(event.currentTarget);
    }));



    // === Accordions ===

    document.querySelectorAll(".accordion-button").forEach(btn => {
        btn.addEventListener("click", (e) => {

            e.stopPropagation();
            toggleAccordion(btn);
            btn.classList.toggle("active")

        });
    });


    // === Header dropdwon menu ===


    document.querySelector(".header-image-wrapper").addEventListener("click", toggleDropdownMenu);
    document.getElementById("theme-toggle").addEventListener("click", toggleLightMode);

}

document.addEventListener("DOMContentLoaded", init);



