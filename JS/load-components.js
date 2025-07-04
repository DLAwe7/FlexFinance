import {toggleCountryMenu, selectCountry} from './Components/country-menu.js';
import {openSidebar, closeSidebar, displayInvesting} from './Components/sidebar.js';
import {toggleLangMenu, selectLanguage} from './Components/language-menu.js';
import {openDropdownMenu, toggleLightMode, applySavedTheme} from './Components/dropdown-menu.js';
import {logOut} from './Components/log-out.js';



async function loadComponent(id, file){
    const response = await fetch(file);
    const content = await response.text();
    document.getElementById(id).innerHTML = content;
}

async function init(){

    const userStatus = JSON.parse(localStorage.getItem("isLoggedIn"));
    
    if (userStatus === null || userStatus === false) {

        const guestUser = {
        username: "Guest",
        email: "guest@example.com",
        password: "",
        telephone: "",
        birthday: ""
        };

        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("userData", JSON.stringify(guestUser));
    }

    const components = [
        {id: "header", file: "header.html"},
        {id: "aside", file: "aside.html"},
        {id: "footer", file: "footer.html"},
        {id: "language-container", file: "language-container.html"}, 
        {id: "country-container", file: "country-container.html"}
    ];

    

    await Promise.all(components.map(({id, file}) => loadComponent(id, file)));

    const loggedIn = document.querySelector(".header-right");
    const logInButton = document.querySelector(".log-inHBtn");

    if((userStatus !== true || userStatus === null)){
        
        loggedIn.classList.remove("logInVis");
        logInButton.classList.add("logInVis");
        
    }else{

        logInButton.classList.remove("logInVis");
        loggedIn.classList.add("logInVis");       
    }

    
    applySavedTheme();
    currentPageInit();
    
}

function currentPageInit(){

    document.querySelector(".sidebarInvesting").addEventListener("click", displayInvesting); 

    document.getElementById("toggleCountryMenu").addEventListener("click", toggleCountryMenu);
    document.getElementById("countryBtn").addEventListener("click", toggleCountryMenu);
    document.querySelectorAll(".countries").forEach((countryElement) => {
        countryElement.addEventListener('click', selectCountry);
    });
    

    document.getElementById("toggleLanguageMenu").addEventListener("click", toggleLangMenu);
    document.getElementById("langBtn").addEventListener("click", toggleLangMenu);
    document.querySelectorAll(".languages").forEach((languageElement) => {
        languageElement.addEventListener('click', selectLanguage);

    });


    document.querySelector(".optionsBtn").addEventListener("click", openSidebar);
    document.getElementById("closingButton").addEventListener("click", closeSidebar);

    document.getElementById("myImage").addEventListener("click", openDropdownMenu);
    document.getElementById("theme-toggle").addEventListener("click", toggleLightMode);


    document.getElementById("logout-button").addEventListener("click", logOut); 
    
}

document.addEventListener("DOMContentLoaded", init);

