const light = document.getElementById("light");
const dark = document.getElementById("dark");
const lighti = document.getElementById("lighti");
const darki = document.getElementById("darki");


const wrapper = document.getElementById("wrapper");
const input = document.getElementById("input");
const buttons = document.querySelectorAll("button");


const upperText = document.getElementById("upper");
const lowerText = document.getElementById("lower");

let isLight;
let isDark;

Light();

function Dark(){
    isDark = true;
    isLight = false;

    darki.style.color = "var(--secondary-text)";
    darki.style.opacity = "1";
    lighti.style.color = "var(--secondary-text)";
    lighti.style.opacity = "0.3";

    wrapper.style.backgroundColor = `var(--secondary-wrapper)`;
    input.style.backgroundColor = `var(--secondary-input)`;
    upperText.style.color = "var(--secondary-text)";
    lowerText.style.color = "var(--secondary-text)";


    Array.prototype.forEach.call (buttons, function (node) {

        node.style.backgroundColor = "var(--secondary-button)";
        node.style.color = "var(--secondary-text)";
    
    } );

}

function Light(){
    isDark = true;
    isLight = false;


    lighti.style.color = "var(--primary-text)";
    lighti.style.opacity = "1";
    darki.style.color = "var(--primary-text)";
    darki.style.opacity = "0.3";

    wrapper.style.backgroundColor = `var(--primary-wrapper)`;
    input.style.backgroundColor = `var(--primary-input)`;
 
    upperText.style.color = "var(--primary-text)";
    lowerText.style.color = "var(--primary-text)";

    Array.prototype.forEach.call (buttons, function (node) {

        node.style.backgroundColor = "var(--primary-button)";
        node.style.color = "var(--primary-text)";
    
    } );

}