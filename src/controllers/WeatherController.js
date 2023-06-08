/**
 * Controladores para la aplicación, de esta forma separamos la funcionalidad (modelo) de la vista (página renderizada). Estos
 * controladores hacen de mediador entre estos 2 aspectos.
 */

const {generateWeatherPack} = require('../js/WeatherReq');
const cache = require('../js/cache');
const Cache = new cache();


let apikey = '';

function root(req, res){
    apikey = '';
    res.render('homePage');
}


module.exports = {
    root
}