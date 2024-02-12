import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector('button')
const inputData = document.querySelector('input#datetime-picker');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');
const timer = document.querySelector(".timer");


const datetimePicker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const userSelectedDate = selectedDates[0];

        if (userSelectedDate < new Date()) {
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
                position: 'topRight',
            });
            document.getElementById("datetime-picker").disabled = true;
        } else {
            document.getElementById("datetime-picker").disabled = false;
        }
    },
});


let countdownInterval;

document.getElementById("datetime-picker").addEventListener("change", () => {
    const userSelectedDate = datetimePicker.selectedDates[0];
    const now = new Date();

    if (userSelectedDate < now) {
        iziToast.error({
            title: "Error",
            message: "Please choose a date in the future",
        });
        return;
    }

    document.getElementById("datetime-picker").disabled = true;

    startTimer();

    function startTimer() {
        countdownInterval = setInterval(() => {
            updateTimer(userSelectedDate);
        }, 1000);
    }

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
    }

    function updateTimer(endDate) {
        const currentDate = new Date();
        const remainingTime = endDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(remainingTime);

        if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
            document.querySelector('.timer [data-days]').textContent = addLeadingZero(days);
            document.querySelector('.timer [data-hours]').textContent = addLeadingZero(hours);
            document.querySelector('.timer [data-minutes]').textContent = addLeadingZero(minutes);
            document.querySelector('.timer [data-seconds]').textContent = addLeadingZero(seconds);
        }

        if (remainingTime <= 0) {
            stopTimer();
        }
    }

    function stopTimer() {
        clearInterval(countdownInterval);
        // Additional actions to perform when the timer stops
    }

    function addLeadingZero(value) {
        return value < 10 ? `0${value}` : `${value}`;
    }
});