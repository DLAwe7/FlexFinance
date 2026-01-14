import { toggleMenu } from "./functionality.js";

let userObject = {
    username: null,
    birthday: null,
    email: null,
    phoneNumber: null
};

let storedButton;
let storedField;

const inputCard = document.querySelector(".edit-cardData");

document.addEventListener("DOMContentLoaded", function(){


    displayUserInfo(userObject);
    loadEventListeners();


    inputCard.addEventListener("submit", (event) => {

        event.preventDefault();
        
        const newValue = document.querySelector(`input[name="${storedField}"]`).value;
        
        userObject[storedField] = newValue;

        displayUserInfo(userObject);
        toggleMenu(storedButton);


    });

})


function loadEventListeners(){

    const inputContainer = document.querySelector(".input-container");
    const informativeMessage = document.querySelector(".informative-message");

    const modifyButtons = document.querySelectorAll(".modifyBtn");
     
    modifyButtons.forEach(button => {button.addEventListener("click", function(event){

        event.stopPropagation();
        const clickedButton = event.currentTarget;
        inputContainer.innerHTML = ``;    

        if(button.classList.contains("operative")){

              
            storedButton = clickedButton;
            const labelText = clickedButton.dataset.label;
            const inputType = clickedButton.dataset.type;
            const field = clickedButton.dataset.field;
            storedField = field;
            const currentValue = document.querySelector(`.${field}`)?.textContent || "";


            const inputLabel = document.createElement("label");


                inputLabel.htmlFor = "inputModify";
                inputLabel.textContent = labelText;


            const inputElement = document.createElement("input");

                inputElement.className = "inputModify";
                inputElement.type = inputType;
                inputElement.value = currentValue;
                inputElement.name = field;


            inputContainer.append(inputLabel);
            inputContainer.append(inputElement);

        }
        else{
            
            informativeMessage.textContent = button.id === `change-picture-button` ? "This button changes your profile picture. File uploads are not functional yet, try another button!" : `This is a mocking button. Try using one from Personal Information that is not "change your picture"!`;
        }

        toggleMenu(clickedButton);

    });

})};

function displayUserInfo(userInfo){

    const nameDisplayer = document.querySelector(".username");
    const birthDayDisplayer = document.querySelector(".birthday");
    const emailDisplayer = document.querySelector(".email");
    const phoneDisplayer = document.querySelector(".telephone")

 
    nameDisplayer.textContent = userInfo.username || "Emily Watson";
    birthDayDisplayer.textContent = userInfo.birthday || "1/1/1970";
    emailDisplayer.textContent = userInfo.email || "emilywatson@example.com";
    phoneDisplayer.textContent = userInfo.phoneNumber || "+34 123456789";

};


