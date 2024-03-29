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

let initialCunter = true;

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
            if(initialCunter){
                flipCards();
                city.lastElementChild.textContent = data.cityName;
                extendTitle();
            }else{
                city.lastElementChild.textContent = data.cityName;
            }
            
            initialCunter = false;
        }else{
            error.textContent = 'Wrong coordinates, try again';
        }
    });
});

function flipCards(){

    tempCard.firstElementChild.classList.add('flipFront');
    tempCard.lastElementChild.classList.add('flipBack');
    tempCard.lastElementChild.classList.add('holdable');

    setTimeout(() => {
        humidityCard.firstElementChild.classList.add('flipFront');
        humidityCard.lastElementChild.classList.add('flipBack');
        humidityCard.lastElementChild.classList.add('holdable');
    }, 200);
    setTimeout(() => {
        cloudsCard.firstElementChild.classList.add('flipFront');
        cloudsCard.lastElementChild.classList.add('flipBack');
        cloudsCard.lastElementChild.classList.add('holdable');
    }, 400);
    setTimeout(() => {
        windCard.firstElementChild.classList.add('flipFront');
        windCard.lastElementChild.classList.add('flipBack');
        windCard.lastElementChild.classList.add('holdable');
    }, 600);
    
}

function extendTitle(){
    city.classList.add('wrapper');
}
