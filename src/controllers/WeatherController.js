/**
 * Controladores para la aplicación, de esta forma separamos la funcionalidad (modelo) de la vista (página renderizada). Estos
 * controladores hacen de mediador entre estos 2 aspectos.
 */

const WeatherActions = require('../js/WeatherReq');
const cache = require('../js/cache');
const Cache = new cache();

var key = '';

function root(req, res){
    res.render('homePage');
}

async function postKey (req, res, next){
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

function getKeys(req, res) {
    res.send({'apikey':`${key}`});
}


function consultWeather(req, res){
    res.render('consultWeather');
}


module.exports = {
    root,
    postKey,
    consultWeather,
    getKeys
}