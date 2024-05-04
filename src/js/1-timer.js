import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDatePicker(selectedDates[0]);
  },
};

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let userSelectedDate;
let countdownInterval;

flatpickr(datetimePicker, options);

function handleDatePicker(selectedDate) {
  if (selectedDate < new Date()) {
    iziToast.warning({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    startButton.disabled = true;
    userSelectedDate = null;
  } else {
    startButton.disabled = false;
    userSelectedDate = selectedDate;
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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

function updateTimer() {
  if (!userSelectedDate) return;

  const remainingTime = userSelectedDate.getTime() - new Date().getTime();

  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    daysValue.textContent = '00';
    hoursValue.textContent = '00';
    minutesValue.textContent = '00';
    secondsValue.textContent = '00';
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(remainingTime);

  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

startButton.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startButton.disabled = true;
  datetimePicker.disabled = true;

  countdownInterval = setInterval(updateTimer, 1000);
});
