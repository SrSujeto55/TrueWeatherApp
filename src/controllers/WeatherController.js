/**
 * Controladores para la aplicación, de esta forma separamos la funcionalidad (modelo) de la vista (página renderizada). Estos
 * controladores hacen de mediador entre estos 2 aspectos.
 */

const WeatherActions = require('../js/WeatherReq');
const cache = require('../js/cache');
const Cache = new cache();

function root(req, res){
    res.render('homePage');
}

async function postKey (req, res, next){
    const key = req.body.key;
    const { consultWeather } = WeatherActions;
    let response = await consultWeather(19,-99,key);

    if(response.cod && response.cod === 200){
        res.send({'message':'this works'});
    }else{
        res.status(403).send({'error':'invalid ApiKey'});
    }
}

function consultWeather(req, res){
    res.render('consultWeather');
}

function getKeys(req, res){
    res.send({'message':'working'});
}

module.exports = {
    root,
    postKey,
    getKeys,
    consultWeather
}