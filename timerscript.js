let timeleft = 60;
const timerElement = document.getElementById("timer");
const countdown = setInterval(() => {
    timeleft--;
    timerElement.textContent = timeleft;

    if(timeleft <= 0){
        clearInterval(countdown);
        alert("De tijd is om!");
    }
}, 1000);