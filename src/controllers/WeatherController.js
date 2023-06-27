/**
 * Controladores para la aplicación, de esta forma separamos la funcionalidad (modelo) de la vista (página renderizada). Estos
 * controladores hacen de mediador entre estos 2 aspectos.
 */

const { raw } = require('body-parser');
const WeatherActions = require('../js/WeatherReq');
const cache = require('../js/cache');
const Cache = new cache();
var key;

    // Controllers
/**
 * Function to render the home page to the user by one GET method
 */
function root(req, res){
    res.render('homePage');
}

/**
 * function to render the ConsultWeather View, if no key is loaded, it redirect the user
 * to the home page
 */
function consultWeather(req, res){
    if(!key){
        res.redirect('/');
        return;
    }

    res.render('consultWeather');
}

/**
 * Function to set the ApiKey to the server
 * It uses a call to the OpenWeather api to check if the apiKey provided is useful or not
 */
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

/**
 * This is the main function of the program, it get the coordinates provided by the user an then it converts
 * the coordinates to a coordKey to check if the coordKey is alredy defined in the cache, if it is, then we just return the 
 * weatherPack asociate to that coordKey, if not, then we make an api call to OpenWeatherMap, afterwards we create a new cache entry with this coordKey.
 */
async function requestWeather(req, res){
    if(!key){
        res.redirect(200, '/');
        return;
    }

    const rawCords = req.body.coordinates;
    const coords = rawCords.split(" ");
    const coordKey = createCacheKey(rawCords);
    let weatherPack;

    if(Cache.isOnCache(coordKey)){
        if(Cache.isOlderRegister(coordKey)){
            weatherPack = await getWeatherPack(coords[0], coords[1], key);
            Cache.updateWeatherPack(coordKey, weatherPack);
            res.send(weatherPack);
            return;
        }else{
            weatherPack = Cache.getWeatherPack(coordKey);
            res.send(weatherPack);
            return; 
        }
    }

    weatherPack = await getWeatherPack(coords[0], coords[1], key);
    if(weatherPack.cod != 400){
        Cache.addToCache(coordKey, weatherPack);
        res.send(weatherPack); 
    }else{
        res.send(weatherPack); //We send the error code to the client
    }
}



// Auxiliar functions 

/**
 * function to get a weatherPack by calling the OpenWeather api
 * @param {int} lat 
 * @param {int} long 
 * @param {string} key 
 * @returns {object}
 */
async function getWeatherPack(lat, long, key){
    const { generateWeatherPack } = WeatherActions;
    
    weatherPack = await generateWeatherPack(lat, long, key);
    return weatherPack;
}

/**
 * Function to convert a raw text of coordinates and convert it to a coordKey sintaxys
 * @param {string} rawCords 
 * @returns {string}
 */
function createCacheKey(rawCords){
    let cacheKey = rawCords.replaceAll('.','');
    cacheKey = cacheKey.replaceAll(' ','');
    cacheKey = cacheKey.replaceAll('-','');
    return cacheKey;
}


module.exports = {
    root,
    postKey,
    consultWeather,
    requestWeather
}