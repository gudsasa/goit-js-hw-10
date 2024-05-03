// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const inputDealy = form.elements.delay;
const radiobutton = form.elements.state;
const btnSubmit = document.querySelector(".form button")


function errorMessage (data) {
    iziToast.error({
        title: 'Error:',
        message: data,
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'rgb(238, 4, 50)',
        theme: 'dark', 
        color: 'red', 
        width: "500",
        messageSize: "16",
        titleSize:"16",
        progressBar: false,
    });
}


function succesMessage (data) {
    iziToast.success({
        title: 'OK',
        message: data,
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: "#59a10d",
        theme: 'dark', 
        messageSize: "16",
        titleSize:"16",
        progressBar: false,
    });
}
 
function warningMessage (data) {
    iziToast.warning({
        title: 'Caution',
        message: data,
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: " #ffa000",
        theme: 'dark', 
        messageSize: "16",
        titleSize:"16",
        progressBar: false,
    });
}


function makePromises (options) {
    const {delay, state} = options;
    const newPromise = new Promise ((resolve, reject) => {
        setTimeout (()=>{
            if(state === "fulfilled") {
                resolve (`Fulfilled promise in ${delay}ms`)
            }
            else {
                reject(`Rejected promise in ${delay}ms`)
            }
        }, delay)
    })
    return newPromise 
}


btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    const promiseOptions = {}
    if(inputDealy.value !== "" ) {
        promiseOptions.delay = Number(inputDealy.value.trim())
    }
   
    const isChecked = Array.from(radiobutton).some(element => element.checked );
    if(isChecked) {
        radiobutton.forEach(element => {
            if (element.checked) {
                promiseOptions.state = element.value;
            }
        })
    }

    const promiseOptionsLength= Object.values(promiseOptions).length

    if (promiseOptionsLength !== 2) {
       warningMessage ("fill all fields") 

    }
    else {
        makePromises (promiseOptions)
            .then (data =>{
                succesMessage (data)
            })
            .catch (data => {
                errorMessage(data)
            })
    }

    radiobutton.forEach(element => {
        element.checked = false 
    })
    inputDealy.value ="";

})