// fetch('http://puzzle.mead.io/puzzle').then((response => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// }));



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const error_message = document.querySelector('#error-message');
const success_message_1 = document.querySelector('#success-message-1');
const success_message_2 = document.querySelector('#success-message-2');
const success_message_3 = document.querySelector('#success-message-3');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    error_message.textContent = '';
    success_message_1.textContent = '';
    success_message_2.textContent = '';
    success_message_3.textContent = '';

    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            return error_message.textContent = data.error;
        };

        success_message_1.textContent = `Your location is ${data.location}.`;
        success_message_2.textContent = `It is ${data.weather_descriptions}.`;
        success_message_3.textContent = `It is ${data.temperature} degrees.`;
    });
});
});