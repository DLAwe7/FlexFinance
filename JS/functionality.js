import {inertToggle, toggleAriaExpanded} from "./accessibility.js"


// Toggle menus visibility

export function toggleMenu(button){

    const targetId = button.getAttribute("aria-controls");
    const element = document.getElementById(targetId);
    if (!element) return;

    const toggleClass = element.dataset.toggleClass;
    const isOpen = element.classList.toggle(toggleClass);

    toggleAriaExpanded(button);

    if (element.dataset.useInert !== undefined) {
        inertToggle(element, isOpen);
    }

}


/* Usage: element.querySelector("").addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMeu(element); }); 

    Required format: data-toggle-class="" class="toggleable" data-use-inert
*/


// Toggle accordions


export function toggleAccordion(button){

    const elementId = button.getAttribute("aria-controls");
    const element = document.getElementById(elementId);
    if (!element) return;

    const toggleClass = element.dataset.toggleClass;
    if (!toggleClass) return;

    const isOpen = element.classList.contains(toggleClass);

    if(isOpen){

        element.style.maxHeight = element.scrollHeight + "px";

        requestAnimationFrame(() => {
        element.style.maxHeight = '0';});

        element.classList.remove(toggleClass);

    }
    else{

        element.style.maxHeight = element.scrollHeight + "px";
        element.classList.add(toggleClass);

    }

    toggleAriaExpanded(button);

    inertToggle(element, !isOpen);
};


/* usage: document.querySelectorAll("").forEach(btn => {
    btn.addEventListener("click", (e) => {e.stopPropagation();toggleAccordion(btn);});
});  */



/* Number formatter */

export function formatNumber(number){
  return new Intl.NumberFormat('de-DE').format(number);
}

export function formatISODate(isoString){

  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${month} ${day}, ${year} - ${hours}:${minutes}:${seconds}`;

}