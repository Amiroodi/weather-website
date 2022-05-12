const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const error_message = document.querySelector('#error-message');
const results = document.querySelector("#results");
const img_template = document.querySelector("#icon_template");
const para_template = document.querySelector("#para_template");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    results.textContent = '';

    fetch(`/weather?address=${encodeURIComponent(location)}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            let para_clone = para_template.content.cloneNode(true);
            let para_tag = para_clone.querySelector('p');
            para_tag.textContent = data.error;
            results.appendChild(para_tag);
            return;
        };

        const para_data = [data.location, `It is ${data.weather_descriptions}.`, `It is ${data.temperature} degrees.`];

        para_data.forEach(data => {
            let para_clone = para_template.content.cloneNode(true);
            let para_tag = para_clone.querySelector('p');
            para_tag.textContent = data;
            results.appendChild(para_tag);
        });

        const img_clone = img_template.content.cloneNode(true);
        const img_tag = img_clone.querySelector('img');
        img_tag.setAttribute('src', data.weather_icon);
        results.appendChild(img_tag);
    });
});
});