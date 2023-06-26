const error = document.querySelector('#MsjErr');
const form = document.querySelector('#coordForm');

const tempCard = document.querySelector('#tempCard');
const humidityCard = document.querySelector('#humidityCard');
const windCard = document.querySelector('#windCard');
const cloudsCard = document.querySelector('#cloudsCard');

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

            temp.textContent = data.temp + '°C';
            humidity.textContent = data.humidity + '%';
            wind.textContent = data.wind + 'm/s';
            clouds.textContent = data.clouds + '%';
            city.lastElementChild.textContent = data.cityName;
            flipCards();
        }else{
            error.textContent = 'Coordenadas incorrectas, intente de nuevo';
        }
    });
});

function flipCards(){
    tempCard.firstElementChild.classList.add('flipFront');
    tempCard.lastElementChild.classList.add('flipBack');

    setTimeout(() => {
        humidityCard.firstElementChild.classList.add('flipFront');
        humidityCard.lastElementChild.classList.add('flipBack');
    }, 200);
    setTimeout(() => {
        cloudsCard.firstElementChild.classList.add('flipFront');
        cloudsCard.lastElementChild.classList.add('flipBack');
    }, 400);
    setTimeout(() => {
        windCard.firstElementChild.classList.add('flipFront');
        windCard.lastElementChild.classList.add('flipBack');
    }, 600);
    
}

