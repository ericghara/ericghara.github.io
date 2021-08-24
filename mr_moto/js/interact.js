var clicks = 0,
    toggle = false,
    yourName = "",
    shakeState=false;
const dTXT = document.getElementsByTagName("p")[0],
    sTIME = [100, 2000, 0, 3000, 0],
    dIMG = document.getElementById("dynamImg");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    toggle = !toggle;
    if (dIMG.src.indexOf("moto.png") == -1) {
        dIMG.src = "moto.png";
        dIMG.style.left = -200 + "px";;
    }
    dTXT.innerHTML = "";
    while (clicks < 5 && toggle) {
        await onClick();
        await sleep(sTIME[clicks]);
        clicks++;
    }
    clicks = 0;
}

function onClick() {
    //element.innerText += 1;
    switch (clicks) {
        case 0:
            translate(dIMG, 500);
            break;
        case 1:
            loadup();
            break;
        case 2:
            askName();
            break;
        case 3:
            greet(yourName);
            break;
        case 4:
            byebye(yourName);
            break;
    }
    return false
}

function loadup() {
    dTXT.innerText = 'Hello I\'m Mr. Moto';
}

function askName() {
    txt = "Let's get acquainted! What's your name?"
    dTXT.innerText = txt;
    yourName = prompt(txt);
    if (yourName.length < 1) {
        yourName = "Agent Anonymous";
    }
}

function greet(_name) {
    dTXT.innerText = "Hello " + _name + "!";
}

function byebye(_name) {
    dTXT.innerText = "I just remembered, I'm late for my race! Bye Bye " + _name + "!";
    dIMG.src = "finish.png";
}

async function translate(elem, fLeft) {
    const rate = 4; //How much we move between frames
    const trans = getProp(elem,"transform");
    const refresh = 1 / 60 * 1000; //ie inverse frames per ms
    var Left = parseInt(getProp(elem, "left"), 10);
    var dLeft = fLeft - Left;
    var frames = Math.floor(dLeft / rate);
    var dLast = dLeft % rate;
    var tLast = dLast / rate * refresh; //Last frame will refresh faster if there is a remainder
    sTIME[0] = frames * refresh + tLast + 100; // time start of next function just after animation ends (remember async) 
    dTXT.style.left = (fLeft + 200) + "px";  //Move text position too
    shakeToggle = 0
    while (frames > 0) {
        frames--;
        Left += rate;
        elem.style.left = Left + "px";
        if (shakeToggle==3) {shake(elem, trans); shakeToggle = 0;}
        else {shakeToggle ++;}
        await sleep(refresh);
        
    }
    elem.style.transform = trans // set to final point in case of remainder in calc of frames
    elem.style.left = fLeft + "px" // set to "unshaken" orientation in event ended in a transformed state
}

//**** future plans make versitile class to efficiently handle transforms and translations
// *** write another class that performs important visual effects like moving and shaking motorcycle, waving the flag etc

function shake(elem, trans) {
    const amp = 2 // amplitude of shake
    var transNow = getProp(elem,"transform");
    // console.log(trans,transNow);
    if (trans == transNow) {
        elem.style.transform ="matrix(1,.01,.00,1,0, 2)";
    }
    else {
        elem.style.transform ="matrix(1,0,0,1,0,0)";
    }
}

function getProp(elem, property) {
    return window.getComputedStyle(elem, null).getPropertyValue(property);
}
