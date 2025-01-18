let time = document.getElementById("time");
let dateInput = document.getElementById("alarmDate");
let tInput = document.getElementById("alarmTime");
let btn = document.getElementById("setAlarm");
let contan = document.getElementById("alarms");
let alarms = [];
let maxValue = 15;

function updateCurrentTime() {
    let curr = new Date();
    let hrs = curr.getHours();
    let min = String(curr.getMinutes()).padStart(2, "0");
    let sec = String(curr.getSeconds()).padStart(2, "0");
    let period = hrs >= 12 ? "PM" : "AM";
    if (hrs > 12) hrs -= 12;
    hrs = String(hrs).padStart(2, "0");
    time.textContent = `${hrs}:${min}:${sec} ${period}`;
}

function createAlarmElement(alarm, timeout) {
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.innerHTML = `
        <span>⏰ ${alarm.time.toLocaleString()}</span>
        <button class="delete-alarm">Delete</button>
    `;
    alarmDiv.querySelector(".delete-alarm").addEventListener("click", () => {
        clearTimeout(timeout);
        alarmDiv.remove();
        alarms = alarms.filter((a) => a.id !== alarm.id);
    });
    contan.appendChild(alarmDiv);
}

function setAlarm() {
    let now = new Date();
    let selectedDate = new Date(dateInput.value + "T" + tInput.value);

    if (selectedDate <= now) {
        alert("Invalid time. Please select a future date and time.");
        return;
    }

    if (alarms.some((alarm) => alarm.time.getTime() === selectedDate.getTime())) {
        alert("You cannot set multiple alarms for the same time.");
        return;
    }

    if (alarms.length >= maxValue) {
        alert(`You can only set a maximum of ${maxValue} alarms.`);
        return;
    }

    let timeout = setTimeout(() => {
        alert("Time to wake up!");
        alarms = alarms.filter((alarm) => alarm.id !== selectedDate.getTime());
        contan.querySelector(`div[data-id="${selectedDate.getTime()}"]`)?.remove();
    }, selectedDate - now);

    let alarm = { id: selectedDate.getTime(), time: selectedDate };
    alarms.push(alarm);
    createAlarmElement(alarm, timeout);
}

setInterval(updateCurrentTime, 1000);
btn.addEventListener("click", setAlarm);
updateCurrentTime();
