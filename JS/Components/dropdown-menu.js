import { toggleMenu } from "../functionality.js";


export function toggleDropdownMenu(event){ 

    event.stopPropagation();

    const button = event.currentTarget;

    toggleMenu(button);
};


export function applySavedTheme(){

    let savedTheme = localStorage.getItem("theme");
    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");

    if (!savedTheme){
        savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        localStorage.setItem("theme", savedTheme);
    }

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        sun.classList.add("activeMenu");
        moon.classList.remove("activeMenu");
    }else{
        document.body.classList.remove("light-mode");
        sun.classList.remove("activeMenu");
        moon.classList.add("activeMenu");
    }

}

export function toggleLightMode(){

    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");

    if (!sun || !moon) return;

    const isLightMode = document.body.classList.toggle("light-mode");

    localStorage.setItem("theme", isLightMode ? "light" : "dark");

    if(isLightMode){
        sun.classList.add("activeMenu");
        moon.classList.remove("activeMenu");
    }else{
        sun.classList.remove("activeMenu");
        moon.classList.add("activeMenu");
    }

}

