"use strict"

const form = document.getElementById("calculator");
const bill = document.querySelector(".input-1");
const custom = document.querySelector(".input-custom");
const people = document.querySelector(".input-2");
const numberTip = document.querySelector(".numberTip");
const numberTotal = document.querySelector(".numberTotal");
const percentage = document.querySelector(".flex-percentage");
const reset = document.querySelector(".button-reset");

//function
const formData=()=>{
    let data = new FormData(form);
    let obj = {};
    obj.b = parseInt(data.get("bill")) || 0;
    obj.c = parseInt(data.get("custom")) || 0;
    obj.p = parseInt(data.get("numerPeople")) || 0;
    return obj
}

const calculator =()=>{
    let data = formData();
    if(data.b > 0){
        numberTotal.textContent = "$" + parseInt(data.b);

        if(data.c > 0){ 
            numberTip.textContent = "$" + (data.b * data.c)/ 100;
        }

        if(data.p > 0){
            numberTotal.textContent = "$" + data.b / data.p;
            numberTip.textContent = "$" + (data.b * data.c)/ 100 / data.p;
        }
    }
    else{   
        numberTotal.textContent = "$0.00";
        numberTip.textContent = "$0.00";
    }
}

const verification = (event) =>{
    let value = parseInt(event.value);
    if (value < 0)
        event.style.borderColor = "var(--color-2)";
    else if (value > 0) event.style.borderColor = "var(--Strongcyan)";
    else event.style.borderColor = "transparent";
}

const resetAvtivated =()=>{
    let data = formData();
    if(data.b && data.c && data.p){
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
form.addEventListener("keyup", ()=>{
    calculator();
});

bill.addEventListener("change",(e)=>{
    verification(e.target); 
    resetAvtivated();

});

people.addEventListener("change",(e)=>{
    verification(e.target); 
    resetAvtivated();
});

custom.addEventListener("change",(e)=>{
    verification(e.target); 
    resetAvtivated();
});

percentage.addEventListener("click",(e)=>{
    if(e.target.classList.contains("percentage")){
        custom.value = parseInt(e.target.value);
        let desactivar = e.target.parentNode.children;
        for(let i = 0; i < desactivar.length -1; i++){
            desactivar[i].classList.remove("active");
        }
        e.target.classList.add("active")
        calculator()
    }
});

reset.addEventListener("click",()=>{
    let data = formData();
    if(data.b && data.p && data.c){
        form.reset(); 
        numberTotal.textContent = "$0.00";
        numberTip.textContent = "$0.00";
    }
});

//arreglar la cuenta, el porsentaje no debe cambiar lo que muesta input custom, evitar ejecutar cuenta si esta mal algo