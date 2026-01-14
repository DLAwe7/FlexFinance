import { fetchData } from './Components/fetchData.js';
import { toggleMenu } from './functionality.js';


const postContainer = document.querySelector(".cards-listContainer");

const sortButtons = document.querySelectorAll("[data-sort]");
const dropdownToggler = document.querySelector(".filters-dropdown");

const state = {
    allPosts: {},
    activeCategories: [],
    sortBy: null
}

const sidebarBtns = document.querySelectorAll(".forum-sidebar-toggle");




document.addEventListener("DOMContentLoaded", function(){

    (async function (){

        const usersList = await fetchData("./JSON/users-list.json");

        state.allPosts = usersList;

        categoryList(usersList);
        createPostCard(usersList);
        
    })();

    

    updateResponsiveUI();


    sortButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {

        const clickedBtn = e.currentTarget;
        const sortType = clickedBtn.dataset.sort;

        sortButtons.forEach(b => b.classList.remove("active"));

        if (window.innerWidth <= 800){toggleMenu(dropdownToggler);}

        clickedBtn.classList.add("active");

        state.sortBy = sortType;
  
      applyFilters();
    });
    });



    dropdownToggler.addEventListener("click", (e) => {

        e.stopPropagation();
        toggleMenu(dropdownToggler);
        dropdownToggler.classList.toggle("selected");



    });





    sidebarBtns.forEach(btn => btn.addEventListener("click", (e) => {

        e.stopPropagation();
        toggleMenu(btn);

        const sidebar = document.querySelector("#main-aside");
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        
        if (isOpen) {
            document.body.style.overflow = "hidden";
            sidebar.focus({ preventScroll: true });
        } else {
            document.body.style.overflow = "";
        }
        
    }));

    
});


function updateResponsiveUI(){

    const filtersBtn = document.querySelector('.filters-dropdown');

    if(filtersBtn){

        if(window.innerWidth <= 800){
            filtersBtn.removeAttribute("disabled");
        } 
        else {
            filtersBtn.setAttribute("disabled", true);
        }
    }

    sidebarBtns.forEach(btn => {

        if (window.innerWidth <= 800) {
            btn.setAttribute('aria-expanded', 'false');
        } else {
            btn.removeAttribute('aria-expanded');
        }

    });


}


window.addEventListener("resize", updateResponsiveUI);



function categoryList(usersList){


    const categoriesList = document.querySelector(".categories-list");

    const keysList = Object.keys(usersList);


    keysList.forEach(key => {

        const li = document.createElement("li");

        const btn = document.createElement("button");
        btn.textContent = key;
        btn.setAttribute("aria-label", `filter results by ${key} category`)

        li.append(btn);
        categoriesList.append(li);

        btn.addEventListener("click", () => {

            btn.classList.toggle("selected");

            if (state.activeCategories.includes(key)) {
                state.activeCategories = state.activeCategories.filter(c => c !== key);
            } else {
                state.activeCategories.push(key);
            }

            applyFilters();
        });

    });

 

}

function applyFilters() {
  let filtered = {};

  if (state.activeCategories.length > 0) {
    for (const cat of state.activeCategories) {
      filtered[cat] = state.allPosts[cat];
    }
  } else {
    filtered = { ...state.allPosts };
  }


  let postsArray = Object.values(filtered).flat();


  if (state.sortBy === 'date') {
    postsArray.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  } else if (state.sortBy === 'likes') {
    postsArray.sort((a, b) => b.likes - a.likes);
  } else if (state.sortBy === 'dislikes') {
    postsArray.sort((a, b) => b.dislikes - a.dislikes);
  }

  createPostCard(postsArray);
}


    

function createPostCard(usersList){

    postContainer.innerHTML = ``;

    if (Array.isArray(usersList)){
        usersList.forEach(post => {
            
         renderPost(post);

        });
    } else if (typeof usersList === "object"){

        Object.entries(usersList).forEach(([keys, values]) => {

        values.forEach(value => {

        renderPost(value);})
    })}    
};

function renderPost(value){

     const newPostCard = document.createElement("li");

            newPostCard.classList.add("post-card");

                const headerWrapper = document.createElement("div");

                    headerWrapper.classList.add("header-wrapper")

                const postH1 = document.createElement("h1");

                    postH1.textContent = `${value.postTitle}`;

                const postCategory = document.createElement("span");

                    postCategory.innerText = `${value.category}`

                headerWrapper.append(postH1);
                headerWrapper.append(postCategory);
                newPostCard.append(headerWrapper);


                const userInfoRow = document.createElement("div");

                    userInfoRow.classList.add("userDisplay");

                const postIMG = document.createElement("img");

                    postIMG.src = `./Assets/${value.userImage}.webp`;
                    postIMG.alt = `${value.userName} image`;
                    postIMG.classList.add("forumImage")

                
                const postUser = document.createElement("span");

                    postUser.classList.add("userName");

                    postUser.textContent = `${value.userName}`;

                userInfoRow.append(postIMG);
                userInfoRow.append(postUser);
                newPostCard.append(userInfoRow); 

                
                const postParagraph = document.createElement("p");

                    postParagraph.classList.add("commentContent");

                    postParagraph.textContent = `${value.postContent}`;

                newPostCard.append(postParagraph);


                const postIconsContainer = document.createElement("ul");
            
                    postIconsContainer.classList.add("icon-container");

                    const iconsList = ["fa-thumbs-up", "fa-thumbs-down", "fa-comment", "fa-share"];

                    iconsList.forEach(icon => {

                        const itemHolder = document.createElement("li");

                            itemHolder.classList.add("icons-wrapper");
                            
                            if(icon === "fa-thumbs-up"){itemHolder.dataset.type = "likes"};
                            if(icon === "fa-thumbs-down"){itemHolder.dataset.type = "dislikes"};
                            if(icon === "fa-comment"){itemHolder.dataset.type = "comments"};

                        const iconButton = document.createElement("button");

                        let labelText = "";
                            if (icon === "fa-thumbs-up") labelText = "Like post";
                            if (icon === "fa-thumbs-down") labelText = "Dislike post";
                            if (icon === "fa-comment") labelText = "View comments";
                            if (icon === "fa-share") labelText = "Share post";

                            iconButton.setAttribute("aria-label", labelText);

                        const iconItem = document.createElement("i");

                            iconItem.classList.add("fa-solid", icon);
                            iconItem.setAttribute("aria-hidden", "true");

                        iconButton.append(iconItem);
                        itemHolder.append(iconButton);

                        if(["fa-thumbs-up","fa-thumbs-down","fa-comment"].includes(icon)){

                            const counter = document.createElement("span");
                            counter.textContent = value[itemHolder.dataset.type];
                            counter.classList.add("counter");
                            itemHolder.append(counter);

                        }
                         
                        postIconsContainer.append(itemHolder);

                    });

                const postDate = document.createElement("span");

                postDate.classList.add("isolated-li", "fs-16px")

                const dateVal = value.publishedAt;
                const dateObj = new Date(dateVal);

                const formatted = dateObj.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                });

                const cardWrapper = document.createElement("div");

                cardWrapper.classList.add("cards-wrapper");
                
                postDate.textContent = formatted;
                
            cardWrapper.append(postIconsContainer);
            cardWrapper.append(postDate);
            newPostCard.append(cardWrapper);
            postContainer.append(newPostCard);

       

            postIconsContainer.addEventListener("click" , (e) => {

                const button = e.target.closest("button")
                if(!button) return;

                const li = button.parentElement;
                const type = li.dataset.type;
                if(!type) return;

                const counterSpan = li.querySelector(".counter");
                let count = parseInt(counterSpan.textContent);



                const oppositeType = type === "likes" ? "dislikes" : "likes";
                const oppositeLi = postIconsContainer.querySelector(`[data-type="${oppositeType}"]`);

                const oppositeButton = oppositeLi.querySelector("button");
                const oppositeSpan = oppositeLi.querySelector(".counter");
                
                let oppositeCount = parseInt(oppositeSpan.textContent);

                  if (button.classList.contains("chosen")) {

                        count -= 1;
                        button.classList.remove("chosen");

                    } else {

                        count += 1;
                        button.classList.add("chosen");

                        if (oppositeButton.classList.contains("chosen")) {

                            oppositeButton.classList.remove("chosen");
                            oppositeCount -= 1;
                            oppositeSpan.textContent = oppositeCount;
                        }
                    }

                counterSpan.textContent = count;
        
            })








}



