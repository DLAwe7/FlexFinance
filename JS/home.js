document.addEventListener("DOMContentLoaded", function(){

    document.querySelector('.extender-wrapper').addEventListener('click', () => {
    document.querySelector('.home-section').scrollIntoView({ behavior: 'smooth', block: "start"});
    });

    

    let cardIndex = 0;
    let intervalId = null;

    const cards = document.querySelectorAll(".card");

    document.querySelector(".prev").addEventListener("click", prevSlide);
    document.querySelector(".next").addEventListener("click", nextSlide);
    
    initializeSlider();

    function initializeSlider(){

        if(cards.length > 0){

            cards[cardIndex].classList.add("display-card");
            intervalId = setInterval(nextSlide, 5000);
            
        }

    }

    function showSlide(index){

        if(index >= cards.length){
            cardIndex = 0;
        }
    
        else if(index < 0){
            cardIndex = cards.length - 1;
            
        }
    
        cards.forEach(card => {
            card.classList.remove("display-card");
        });
    
        cards[cardIndex].classList.add("display-card");
    
    };
    
    function prevSlide(){
        clearInterval(intervalId)
        cardIndex -= 1;
        showSlide(cardIndex)
    
    };
    
    function nextSlide(){
        cardIndex += 1;
        showSlide(cardIndex)
        
    
    };

    const cardParagraph = document.querySelectorAll(".card-paragraph");

    cardParagraph.forEach(card => {

        const paragraph = card.querySelector(".paragraph");

        card.addEventListener("mouseenter", () => {

        clearInterval(intervalId);
        paragraph.style.maxHeight = paragraph.scrollHeight + "px";


    });

    card.addEventListener("mouseleave", () => {


        showSlide(cardIndex);
        paragraph.style.maxHeight = paragraph.scrollHeight + "px";
        requestAnimationFrame(() => {
        paragraph.style.maxHeight = '0';
        })
        }


      

    
    
    );});

});

