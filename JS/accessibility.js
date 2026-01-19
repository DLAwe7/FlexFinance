// ESC KEYDOWN ELEMENT HANDLER


export function handleEsc(event){
    if (event.key === "Escape" || event.key === "Esc") {

        document.querySelectorAll(".toggleable").forEach(element => {

            const toggleClass = element.dataset.toggleClass;

            if(toggleClass && element.classList.contains(toggleClass)){

                element.classList.remove(toggleClass);
                toggleAriaExpanded(element);

                if (element.dataset.useInert !== undefined) {
                  inertToggle(element, true);
                }
              }
        });

    }
}


/* Usage: document.addEventListener("keydown", handleEsc); Requires toggleable class on element*/


// CLICK OUTSIDE ELEMENT HANDLER

export function handleClickOutside(event){

  const selection = window.getSelection();
  if (selection && selection.toString().length > 0) return;

  document.querySelectorAll(".toggleable").forEach(element => {

      const toggleClass = element.dataset.toggleClass;
      if(!toggleClass) return;


      const elementId = element.id;
      if (!elementId) return;

      const buttons = document.querySelectorAll(`[aria-controls="${elementId}"]`);

      const clickInsideElement = element.contains(event.target);

      if(element.classList.contains(toggleClass) && !clickInsideElement){
          
        element.classList.remove(toggleClass);
        buttons.forEach(button => toggleAriaExpanded(button));
         if (element.dataset.useInert !== undefined) {
          inertToggle(element, true);
        }
      }
  });

}


/* Usage: document.addEventListener("click", handleClickOutside); Requires toggleable class on element*/


// TOGGLE ARIA EXPANDED

export function toggleAriaExpanded(elementOrButton){

    let element;

    if(elementOrButton.classList && elementOrButton.dataset.toggleClass){
        element = elementOrButton
    }
    else{
        const button = elementOrButton;
        const targetId = button.getAttribute("aria-controls");
        element = document.getElementById(targetId);
        if (!element) return;
    }

    const toggleClass = element.dataset.toggleClass;
    const buttons = document.querySelectorAll(`[aria-controls="${element.id}"]`);

    const isOpen = element.classList.contains(toggleClass);

    buttons.forEach(button => button.setAttribute("aria-expanded", isOpen ? "true" : "false"));

}


/* Usage: Call toggleAriaExpanded(); and pass an element or a button */



/* TOGGLE INERT */

export function inertToggle(element, isVisible) {
  if (isVisible){
    element.removeAttribute('inert');
  } else{
    element.setAttribute('inert', '');
  }
}

/* Usage: */



// === Set correct aria-current === 

export function setAriaCurrent(){

  const currentPage = document.body.dataset.page;
  const currentLink = document.querySelector(`[data-link="${currentPage}"]`);

  if (currentLink) {
    currentLink.setAttribute("aria-current", "page");
    currentLink.classList.add("active");
  }

}

/* Usage: call it on mount */
