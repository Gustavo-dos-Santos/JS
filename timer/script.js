let intervalTimer;
let miliSecond = document.getElementById("ms");
let seconds = document.getElementById("ss");
let minutes = document.getElementById('mm');
let hours = document.getElementById('HH');
let startButton =  document.getElementById("start");
let stopButton =  document.getElementById("stop");
let turnButton =  document.getElementById("turn");
let resetButton =  document.getElementById("reset");
let title = document.getElementById("title");
let ulTurn = document.getElementById("ulTurn");
let spanTime = document.getElementById("time");

let turnList = [];

    time();
    timer();

    function timer() {
        resetTurnList();
        stopTimer();
        resetButton.style.display = "none";
        startButton.removeEventListener("click", startStopWatch)
        startButton.addEventListener("click", startTimer);
        title.textContent = "Timer";
    }

    function stopWatch() {
        stopTimer();

        resetButton.style.display = "inline-block";

        startButton.removeEventListener("click", startTimer);
        startButton.addEventListener("click", startStopWatch);
        title.textContent = "StopWatch";
    }


    function filterValue(event){
        let value = event.target.value;
        event.target.value = value.replace(/\D/g, "");
        if(value == 0){
            event.target.value = 0;
        }
    }

    function startTimer(){


        seconds.value = seconds.value%60;
        let minutesValue = Math.floor(seconds.value/60) + minutes.value*1;
        minutes.value = minutesValue%60;
        hours.value = Math.floor(minutesValue/60) + hours.value*1

        
        startButton.style.display = "none";
        stopButton.style.display = "inline-block";

        console.log(total)
    
         intervalTimer = setInterval(() => {

            if(miliSecond.value == 0 ){
                if (seconds.value == 0) {
                    if (minutes.value == 0) {
                        if(hours.value  == 0){
                            stopTimer();
                        }else{
                            minutes.value = 60;
                            hours.value--;
                        }
                    }else{
                        seconds.value = 60;
                        minutes.value--;
                    }
                }else{
                    miliSecond.value = 100;
                    seconds.value--;
                }
        }else{
            miliSecond.value--;
        }
        }, 10);
        console.log(total)
    }

    
    function startStopWatch() {
        
        
        startButton.style.display = "none";
        resetButton.style.display = "none";
        stopButton.style.display = "inline-block"
        turnButton.style.display = "inline-block"

        
        intervalTimer = setInterval(() =>{
        miliSecond.value++;
        if (miliSecond.value == 100) {
            miliSecond.value = 0;
            seconds.value++;
            if(seconds.value == 60){
                minutes.value++; 
                seconds.value = 0;
                if(minutes.value == 60){
                    hours.value++;
                    minutes.value = 0;
                }
            }    
        }
    },10)   
    
}


function reset() {
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    miliSecond.value = 0;

    resetTurnList();

}

function turn() {
    let liTurn = document.createElement("li");
    liTurn.textContent = hours.value + ":" + minutes.value + ":" + seconds.value + "." + miliSecond.value; 

    ulTurn.appendChild(liTurn);
}

function resetTurnList() {
    while (ulTurn.firstChild) {
        ulTurn.removeChild(ulTurn.firstChild);
    }
}

function stopTimer() {

    if(title.textContent == "StopWatch"){
        resetButton.style.display = "inline-block";
        turnButton.style.display = "none"
    }

    startButton.style.display = "inline-block";
    stopButton.style.display = "none"
    
clearInterval( intervalTimer);
}

function time() {
    let date = new Date();

    spanTime.textContent = date.getHours() + ":" + date.getMinutes();
    console.log( spanTime.textContent = date.getHours() + ":" + date.getMinutes());
    setTimeout(() => {
        time();
    }, 1000);
}