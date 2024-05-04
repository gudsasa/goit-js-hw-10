import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const inputEl = event.target.elements.delay;
  const stateRadiosEl = event.target.elements.state;
  const delay = parseInt(inputEl.value);

  let state;
  for (const radio of stateRadiosEl) {
    if (radio.checked) {
      state = radio.value;
      break;
    }
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: '✅ Fulfilled promise',
        message: `in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Rejected promise',
        message: `in ${delay}ms`,
        position: 'topRight',
      });
    });
});
