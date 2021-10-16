"use strict"

const form = document.getElementById("calculator");
const percentage = document.querySelector(".flex-percentage");
const numberTip = document.querySelector(".numberTip");
const numberTotal = document.querySelector(".numberTotal");
const reset = document.querySelector(".button-reset");
const custom = document.querySelector(".input-custom");
//message
const msgB = document.querySelector(".msg-b");
const msgP = document.querySelector(".msg-p");
const msgC = document.querySelector(".msg-c");

//function
const formData=()=>{
    let data = new FormData(form);
    let obj = {};
    obj.b = data.get("bill");
    obj.c = data.get("custom");
    obj.p = data.get("numerPeople");
    return obj
}

const calculator =()=>{
    let data = formData();
    console.log(data.b,typeof data.b, data.c,typeof data.c, data.p,typeof data.p)
    numberTip.textContent = "$" + ((data.b / data.p) * data.c / 100) ;
    numberTotal.textContent = "$" + ((data.b / data.p) + ((data.b / data.p) * data.c / 100));
}   //.toFiced(2)...

const verification = (event) =>{
    let value = parseInt(event.value);
    if (value < 0){
        event.style.borderColor = "var(--color-2)";
        if(event.classList.contains("input-1")){
            msgB.innerHTML = "can't be negative";
        }
        else if(event.classList.contains("input-custom")){
            msgC.innerHTML = "can't be negative";
        }
        else if(event.classList.contains("input-2")){
            msgP.innerHTML = "can't be negative";
        }
    }
    if(value == 0){
        event.style.borderColor = "var(--color-2)";
        if(event.classList.contains("input-1")){
            msgB.innerHTML = "Can't be zero";      
        }
        else if(event.classList.contains("input-custom")){
            msgC.innerHTML = "Can't be zero";   
        }
        else if(event.classList.contains("input-2")){
            msgP.innerHTML = "Can't be zero";   
        }
    }
    if (value > 0){
        event.style.borderColor = "var(--Strongcyan)"
        if(event.classList.contains("input-1")){
            msgB.innerHTML = "";    
        }
        else if(event.classList.contains("input-custom")){
            msgC.innerHTML = "";       
        }
        else if(event.classList.contains("input-2")){
            msgP.innerHTML = "";    
        }
    }   
    if(!value > 0 && !value < 0 && !value == 0){
        event.style.borderColor = "transparent";
    }
}

const resetAvtivated =()=>{
    let data = formData();
    if(data.b || data.c || data.p){
        reset.style.opacity = "1";
        reset.style.cursor = "pointer";
        reset.style.backgroundColor = "var(--Strongcyan)";  
    }
    else {
        reset.style.opacity = ".3";
        reset.style.backgroundColor = "var(--color-1)";
    }
}

//event
form.addEventListener("keyup", (e)=>{
    verification(e.target); 
    let data = formData();
    if(data.b > 0 && data.c >= 0 && data.p > 0){
        calculator();
    }
    resetAvtivated();
});

custom.addEventListener("change", ()=>{
    let data = formData();
    if(data.b > 0 && data.c >= 0 && data.p > 0){
        calculator();
    }
    resetAvtivated();
});

percentage.addEventListener("click",(e)=>{
    if(e.target.classList.contains("percentage")){
        custom.value = parseInt(e.target.value);
        for(let i = 0; i < percentage.children.length -1; i++){
            percentage.children[i].classList.remove("active");
        }
        e.target.classList.add("active");
        verification(e.target)
        let data = formData();
        if(data.b > 0 && data.c >= 0 && data.p > 0){
            calculator();
        }
    }
});

reset.addEventListener("click",()=>{
    let data = formData();
    if(data.b || data.p || data.c){
        numberTotal.textContent = "$0.00";
        numberTip.textContent = "$0.00";
        document.querySelectorAll(".inputs").forEach(e=>{
            e.style.borderColor = "transparent";
        });
        for(let i = 0; i < percentage.children.length -1; i++){
            percentage.children[i].classList.remove("active");
        }
        reset.style.backgroundColor = "var(--color-1)";
        reset.style.opacity = ".3";
            msgB.innerHTML = "";    
            msgC.innerHTML = "";       
            msgP.innerHTML = "";    
        form.reset(); 
    }
});