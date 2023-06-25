const error = document.querySelector('#MsjErr');
const form = document.querySelector('#coordForm');

const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const clouds = document.querySelector('#clouds');
const city = document.querySelector('#cityname');

const button = document.querySelector('#reqButton');

form.addEventListener('submit', e => {
    e.preventDefault();

    formData = new FormData(form);
    fetch('/setcoords', {
        method: 'POST',
        body: formData
    })
    .then(request => request.json())
    .then(data => 
    {
        if(data.cod != 400){
            error.textContent = '';
            temp.lastElementChild.textContent = data.temp + '°';
            humidity.lastElementChild.textContent = data.humidity + '%';
            wind.lastElementChild.textContent = data.wind + 'm/s';
            clouds.lastElementChild.textContent = data.clouds + '%';
            city.lastElementChild.textContent = data.cityName;
        }else{
            error.textContent = 'Coordenadas incorrectas, intente de nuevo';
        }
    });
});

button.addEventListener('click', () => {
    temp.classList.add('flip');
    setTimeout(() => {
        humidity.classList.add('flip');
    }, 200);
    setTimeout(() => {
        clouds.classList.add('flip');
    }, 400);
    setTimeout(() => {
        wind.classList.add('flip');
    }, 600);

})


