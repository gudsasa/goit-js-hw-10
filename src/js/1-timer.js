// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const btnStart = document.querySelector("button");
const timeValue =  document.querySelectorAll(".value");
const myInput = document.querySelector("#datetime-picker");

let userSelectedDate = 0;

const options = {
  enableTime: true,
  altInputClass: "calendar-block",
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};


btnStart.disabled = true;


function addLeadingZero(value) {
  value=value.toString()
  return value.padStart(2, '0')
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  

  
const fp = flatpickr(myInput, {...options});  

fp.config.onOpen.push(function()  {
  btnStart.style.backgroundColor="#4e75ff";
  btnStart.style.color="#fff";
  myInput.style.border = "none";
  myInput.style.outline = "1px solid blue";
})


fp.config.onClose.push(function() { 

  const currentUnixTime = options.defaultDate.getTime()
  const nextUnixTime = fp.selectedDates[0].getTime()
  const gapTime = nextUnixTime - currentUnixTime;

  if (gapTime > 0) {
      userSelectedDate = gapTime;
      btnStart.disabled = false;
  }

  else {
      iziToast.error({
        title: 'Error',
        message: "Please choose a date in the future",
        position:	'topRight',
        backgroundColor: "red",
        messageColor: "#fff",
        titleColor: "#fff",
        iconColor: "#fff",
        theme: 'light',
      });
    
      btnStart.disabled = true;
      btnStart.style.backgroundColor="#cfcfcf";
      btnStart.style.color="#989898";
      myInput.style.border = "none";
      myInput.style.outline = "1px solid black";
  }

 } );

 
btnStart.addEventListener("click", ()=>{

    btnStart.style.backgroundColor="#cfcfcf";
    btnStart.style.color="#989898";
    myInput.style.border = "none";
    myInput.style.outline = "1px solid black";
    btnStart.disabled = true;
    myInput.disabled  = true; 

    const intervaLid =  setInterval(() => {
        const objcTime = convertMs( userSelectedDate);
        const valuesObjectTime = Object.values(objcTime);
        
        timeValue.forEach((element, index) => {
          element.textContent = addLeadingZero(valuesObjectTime[index])
        })
  
        userSelectedDate = userSelectedDate-1000
        if (userSelectedDate <=0) {
            clearInterval(intervaLid)
            btnStart.disabled = true;
            myInput.disabled  = false; 
        }

    }, 1000);

})