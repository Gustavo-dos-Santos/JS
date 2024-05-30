const TIME = 60;

let textList = ["Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, vel delectus. Harum ipsum ipsam aut ducimus soluta provident ullam vitae accusamus doloribus dolorum, ut dolores, voluptatibus necessitatibus blanditiis totam aliquam?"];
let wordList;
let contMove;

let fistLetter;
let intervalTimer;

let spanTimer = document.getElementById("timer");
let input = document.getElementById("input");
let divText = document.getElementById("div-text");
let divShow = document.querySelector(".show-text");
let spanId;

let result;
let metric;



newGame();

function newGame() {
    deleteSpanText();
    resetDivText()
    resetTimer();
    resetMetric();
    fistLetter = true;
    resetInput();
    contMove = 0;

    
    wordList = setWordList();
    printSpanText(wordList);
    word = wordList.shift();
    
    spanId = setSpan();
    changeClass(spanId, "focus");
}

function start(event) {
    if (fistLetter) {
        timer();
        fistLetter = false;
    }

    writeCheck(event);
}

function timer() {
    let cont = TIME ; 
    intervalTimer = setInterval(() => {
        if (cont == 0) {
            divText.style.display= "none";
            resetInput()
            showResults();
            clearInterval(intervalTimer)
        }else{
            spanTimer.textContent = --cont ;
        }
    }, 1000);
}

function writeCheck(event) {
    if (event.keyCode == 32) {
        let value = input.value;
        input.value = "";
        if (value == word + " ") {
            changeClass(spanId,"correct");
            metric.correctWord++;
        }else{
            changeClass(spanId,"wrong");
            metric.wrongWord++;
        }
        spanId = setSpan();
        changeClass(spanId,"focus");
        moveText(spanId);
        word = wordList.shift();
    }else{
        if (word.includes(input.value)) {
            metric.correctLetter++;
            changeClass(spanId,"focus");
        }else{
            metric.wrongLetter++;
            changeClass(spanId,"wrong")
        }
    }
}  

function moveText(element) {
    let divCoord = (divShow.getBoundingClientRect().top + 1.111 + 10);
    let elementCoord = element.getBoundingClientRect().top;

    if (Math.round(divCoord) != Math.round(elementCoord)) {
        contMove++;
        divText.style.top = contMove * (divCoord - elementCoord) + "px";
    }

}

function showResults() {
    let trs = document.getElementsByTagName("tr");
    result = setResult();
    for (let i = 0; i < trs.length; i++) {
        
        if (trs[i].children.name) {
            trs[i].children.name.textContent = result[trs[i].id].name;
        }
        trs[i].children.value.innerHTML = result[trs[i].id].value;
    }



}

function resetMetric() {
    metric = {
        correctLetter: 0,
        wrongLetter: 0,
        correctWord: 0,
        wrongWord: 0,
    }
}

function printSpanText(wordArray) {
    for (let i = 0; i < wordArray.length; i++) {
        let span = document.createElement("span");
        span.id=i;
        span.textContent = wordArray[i];
        divText.appendChild(span);
    }
}

function setResult() {
    let result = {
        grade: {
            value: metric.correctLetter/5 + "WPM",
        },
        keystroke : {
            name: "Digits",
            value: "<small><span class='correct'> " + metric.correctLetter +" </span> | <span class='wrong'> " + metric.wrongLetter +" </span>" + (metric.wrongLetter + metric.correctLetter) +"</small>",
        },
        accuracy : {
            name: "Precision",
            value: Math.round((metric.correctWord / (metric.correctWord + metric.wrongWord)) * 100) + "%",
        },
        correct : {
            name: "Correct words",
            value: metric.correctWord,
        },
        wrong : {
            name: "Wrong words",
            value: metric.wrongWord,
        },
    }

    return result;
}
function resetInput() {
    input.value = "";
}

function resetTimer() {
    clearInterval(intervalTimer);
    spanTimer.textContent = 60;
}

function changeClass(element, className) {
    element.className = className;
}

function setSpan() {
    return document.getElementById(metric.correctWord + metric.wrongWord);
}

function resetDivText() {
    divText.style.top = "0px";
    divText.style.display = "block"
}

function deleteSpanText() {
    while(divText.firstChild) {
        divText.removeChild(divText.firstChild);
    }
}

function selectText() {
    let number = Math.floor(Math.random() * (textList.length-1));
    return textList[number];
}

function setWordList() {
    return selectText().replace(/[^a-zA-Z\s]/g, "").split(" ");
}

function toggleTimer() {
    
    if (spanTimer.style.display == "block") {
        spanTimer.style.display = "none";
    }else{
        spanTimer.style.display = "block";
    }
}