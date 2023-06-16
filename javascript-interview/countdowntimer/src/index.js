const hour = document.getElementById("hour");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
var finaltext = document.getElementById("finaltext")
var counttimer = null;


startBtn.addEventListener("click", function () {
    //handling no inputs
  if (hour.value == 0 && min.value == 0 && sec.value == 0) {
    return;
    }
    
  function startInterval() {
    startBtn.style.display = "none";
      stopBtn.style.display = "initial";
      counttimer = setInterval(() => {
          timer();
      }, 1000);
      
  }
  startInterval();
});

function timer() {
    //formatting the time
    if (sec.value > 60) {
      min.value++;
      sec.value = (sec.value) - 59;
    }
    if (min.value > 60) {
      hour.value++;
      min.value = (min.value) - 60;
    }
    //Base condition(the watch stops if again all three values reach to zero)
    if (hour.value == 0 && min.value == 0 && sec.value == 0) {
        stopBtn.style.display = "none"
        finaltext.innerHTML = "TIMEOUT!"
        
    }

    else if (sec.value != 0) {
        sec.value = `${sec.value<10?"0":""}${sec.value - 1}`
    }
    else if (min.value != 0 && sec.value == 0) {
        sec.value = 59
        min.value = `${min.value<10?"0":""}${min.value - 1}`
    }
    else if (hour.value != 0 && min.value == 0) {
      min.value = 60;
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
    }
    return;
}

function stopInterval(state) {
    startBtn.innerHTML = state === "pause" ? "Continue" : "Start";

    stopBtn.style.display = "none";
    startBtn.style.display = "initial";
    clearInterval(counttimer);
  }
  // Stop Interval Logic - END

  // Stop Timer Button - START
  stopBtn.addEventListener("click", function () {
    stopInterval("pause");
  });
  // Start Timer Button - END

  // Reset Timer Button - START
  resetBtn.addEventListener("click", function () {
    hour.value = "00";
    min.value = "00";
    sec.value = "00";

    stopInterval();
  });

function restrictInputLength(event, maxLength) {
  let input = event.target;
  if (input.value.length > maxLength) {
    event.preventDefault();
    input.value = input.value.slice(0, maxLength);
  }
}
