/**
 * Controladores para la aplicación, de esta forma separamos la funcionalidad (modelo) de la vista (página renderizada). Estos
 * controladores hacen de mediador entre estos 2 aspectos.
 */

const { raw } = require('body-parser');
const WeatherActions = require('../js/WeatherReq');
const cache = require('../js/cache');
const Cache = new cache();

var key;

function root(req, res){
    res.render('homePage');
}

function consultWeather(req, res){
    if(!key){
        res.redirect('/');
        return;
    }

    res.render('consultWeather');
}

async function postKey (req, res){
    const apikey = req.body.key;
    const { consultWeather } = WeatherActions;
    let response = await consultWeather(19,-99,apikey);

    if(response.cod && response.cod === 200){
        key = apikey;
        res.send({'message':'ok'});
    }else{
        res.status(403).send({'error':'invalid ApiKey'});
    }
}

async function requestWeather(req, res){
    if(!key){
        res.redirect(200, '/');
        return;
    }

    const rawCords = req.body.coordinates;
    const coords = rawCords.split(" ");
    const { generateWeatherPack } = WeatherActions;
    
    const weatherPack = await generateWeatherPack(coords[0], coords[1], '7753fd975ab98f5d1d730a4475ef23d6');
    if(weatherPack.cod != 400){
       res.send(weatherPack); 
    }else{
       res.send(weatherPack);
    }
    
}

module.exports = {
    root,
    postKey,
    consultWeather,
    requestWeather
}