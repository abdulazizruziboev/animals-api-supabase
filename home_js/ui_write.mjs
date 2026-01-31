import { elCardsBox, elCardTemplate, elMoreLoader, elMoreLoaderButton, elSkeletonsBox, elSkeletonTemplate } from "./html_elements.mjs";

function skeletonWrite(bool) {
    if(bool==true) {
        elSkeletonsBox.classList.remove("hidden");
        elSkeletonsBox.classList.add("grid");
        Array.from({length:100})
        .forEach(()=>{
            elSkeletonsBox.appendChild(elSkeletonTemplate.cloneNode(true).content);
        });
    } else {
        elSkeletonsBox.innerHTML=null;
        elSkeletonsBox.classList.remove("grid");
        elSkeletonsBox.classList.add("hidden");
    };
};

function cardsWrite(data) {
    elCardsBox.classList.remove("hidden");
    elCardsBox.classList.add("grid");
    skeletonWrite(false);
    if(data.length!=0) {data.forEach(el => {
        let cloneCard = elCardTemplate.cloneNode(true).content;
        cloneCard.querySelector(".animal-title").textContent=el.name?el.name:"No title";
        cloneCard.querySelector(".animal-category").textContent=el.category?el.category:"No category";
        cloneCard.querySelector(".animal-speed").textContent=el.speed?el.speed:"No speed";
        cloneCard.querySelector(".animal-sound").textContent=el.soundText?el.soundText:"No sound";
        cloneCard.querySelector(".animal-year").textContent=el.year?el.year:"No year";
        cloneCard.querySelector(".animal-weight").textContent=el.weight?el.weight:"No weight";
        cloneCard.querySelector(".animal-color").textContent=el.color?el.color:"No color";
        cloneCard.querySelector(".animal-habibat").textContent=el.habitat?el.habitat:"No habitat";
        if(el.isWild==true) {
            cloneCard.querySelector(".animal-wild").textContent="Yes";
        } else if(el.isWild!=true) {
            cloneCard.querySelector(".animal-wild").textContent="No";
        } else if(el.isWild==undefined) {
            cloneCard.querySelector(".animal-wild").textContent="No";
        }
        elCardsBox.appendChild(cloneCard);
    } );} else {
        document.querySelector("#empty_box").classList.remove("hidden");
        document.querySelector("#empty_box").classList.add("flex");
    }
};

export {
    skeletonWrite,
    cardsWrite
};