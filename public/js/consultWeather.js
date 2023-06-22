const error = document.querySelector('#MsjErr');
const form = document.querySelector('#coordForm');
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const clouds = document.querySelector('#clouds');
const city = document.querySelector('#cityname');

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
            temp.textContent = 'Temperature: ' + data.temp + '°';
            humidity.textContent = 'humidity: ' + data.humidity + '%';
            wind.textContent = 'Wind: ' + data.wind + 'm/s';
            clouds.textContent = 'Clouds: ' + data.clouds + '%';
            city.textContent = 'City: ' + data.cityName;
        }else{
            error.textContent = 'Coordenadas incorrectas, intente de nuevo';
        }
    });
})