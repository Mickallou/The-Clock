const theClock = document.getElementById(`theClock`);
const theTimer = document.getElementById(`theTimer`);
const theChrono = document.getElementById(`theChrono`);
const clockDisplay = document.getElementById(`clockDisplay`);
const dateDisplay = document.getElementById(`dateDisplay`);
const timerDisplay = document.getElementById(`timerDisplay`);
const chronoDisplay = document.getElementById(`chronoDisplay`);
const clock = document.getElementById(`clock`);
const timer = document.getElementById(`timer`);
const chrono = document.getElementById(`chrono`);
const timerBtnStart = document.getElementById(`startTimer`);
const timerBtnReset = document.getElementById(`resetTimer`);
const timerHours = document.getElementById(`timerHours`);
const timerMinutes = document.getElementById(`timerMinute`);
const timerSeconds = document.getElementById(`timerSecond`);
const chronoBtnStart = document.getElementById(`startChrono`);
const chronoBtnStop = document.getElementById(`stopChrono`);
const chronoBtnReset = document.getElementById(`resetChrono`);

function openNav(element) {
    switch (element) {
        case 1:
            clock.style.display = `flex`;
            timer.style.display = `none`;
            chrono.style.display = `none`;
            break;
        case 2:
            clock.style.display = `none`;
            timer.style.display = `flex`;
            chrono.style.display = `none`;
            break;
        case 3:
            clock.style.display = `none`;
            timer.style.display = `none`;
            chrono.style.display = `flex`;
            break;
    }
}



theClock.addEventListener(`click`, () => openNav(1));
theTimer.addEventListener(`click`, () => openNav(2));
theChrono.addEventListener(`click`, () => openNav(3));

const myDate = new Date();
const myClock = {
    hour: myDate.getHours(),
    minute: myDate.getMinutes(),
    second: myDate.getSeconds(),
    day: myDate.getDate(),
    month: myDate.getMonth(),
    year: myDate.getFullYear()
}
const convertMonth = (month) => {
    switch (month) {
        case 0:
            return `January`;
        case 1:
            return `February`;
        case 2:
            return `March`;
        case 3:
            return `April`;
        case 4:
            return `May`;
        case 5:
            return `June`;
        case 6:
            return `July`;
        case 7:
            return `August`;
        case 8:
            return `September`;
        case 9:
            return `October`;
        case 10:
            return `November`;
        case 11:
            return `December`;
    }
}
const convertDay = (day) => {
    switch (day) {
        case 0:
            return `Sunday`;
        case 1:
            return `Monday`;
        case 2:
            return `Tuesday`;
        case 3:
            return `Wednesday`;
        case 4:
            return `Thursday`;
        case 5:
            return `Friday`;
        case 6:
            return `Saturday`;
    }
}

const displayClock = () => {
    setInterval(() => {
        const myDate = new Date();
        const myClock = {
            hour: myDate.getHours(),
            minute: myDate.getMinutes(),
            second: myDate.getSeconds(),
            day: myDate.getDate(),
            month: myDate.getMonth(),
            year: myDate.getFullYear()
        }

        if (myClock.hour < 10) {
            myClock.hour = `0${myClock.hour}`;
        }
        if (myClock.minute < 10) {
            myClock.minute = `0${myClock.minute}`;
        }
        if (myClock.second < 10) {
            myClock.second = `0${myClock.second}`;
        }
        clockDisplay.innerHTML = `${myClock.hour}:${myClock.minute}:${myClock.second}`;
        dateDisplay.innerHTML = `${convertDay(myDate.getDay())}, ${convertMonth(myDate.getMonth())} ${myDate.getDate()}, ${myDate.getFullYear()}`;
    }, 1000);
}

displayClock();

let timerInterval;

function startTimer() {
    const hours = parseInt(timerHours.value) || 0;
    const minutes = parseInt(timerMinutes.value) || 0;
    const seconds = parseInt(timerSeconds.value) || 0;

    let totalTime = hours * 3600 + minutes * 60 + seconds;

    if (isNaN(totalTime) || totalTime <= 0) {
        alert('Please enter a valid time!');
        return;
    }

    timerInterval = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            alert('The time is up!');
            resetTimer();
        } else {
            const remainingHours = Math.floor(totalTime / 3600);
            const remainingMinutes = Math.floor((totalTime % 3600) / 60);
            const remainingSeconds = totalTime % 60;

            const displayHours = remainingHours < 10 ? `0${remainingHours}` : remainingHours;
            const displayMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
            const displaySeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

            timerDisplay.innerText = `${displayHours}:${displayMinutes}:${displaySeconds}`;
            totalTime--;
        }
    }, 1000);

}
function resetTimer() {
    clearInterval(timerInterval);
    timerDisplay.innerText = '00:00:00';
}

timerBtnStart.addEventListener('click', startTimer);
timerBtnReset.addEventListener('click', resetTimer);

let chronoInterval;
let chronoTime = 0;

function startChrono() {
    chronoInterval = setInterval(() => {
        chronoTime++;
        const displayHours = Math.floor(chronoTime / 3600);
        const displayMinutes = Math.floor((chronoTime % 3600) / 60);
        const displaySeconds = chronoTime % 60;

        chronoDisplay.innerText = `${displayHours < 10 ? `0${displayHours}` : displayHours}:${displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes}:${displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}`;
    }, 1000);
}
function stopChrono() {
    clearInterval(chronoInterval);
}

function resetChrono() {
    clearInterval(chronoInterval);
    chronoTime = 0;
    chronoDisplay.innerText = '00:00:00';
}

chronoBtnStart.addEventListener('click', startChrono);
chronoBtnStop.addEventListener('click', stopChrono);
chronoBtnReset.addEventListener('click', resetChrono);