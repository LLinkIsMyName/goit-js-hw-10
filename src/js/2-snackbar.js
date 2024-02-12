import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]');
    const stateRadio = document.querySelector('input[name="state"]:checked');

    const delay = parseInt(delayInput.value, 10);
    const state = stateRadio.value;

    if (isNaN(delay) || delay <= 0) {
        iziToast.error({
            title: "Error",
            message: "Please enter a valid positive delay value",
        });
        return;
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

    promise.then(
        (delay) => {
            iziToast.success({
                title: "Fulfilled promise",
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'bottomCenter',
            });
        },
        (delay) => {
            iziToast.error({
                title: "Rejected promise",
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'bottomCenter',
            });
        }
    );
});
