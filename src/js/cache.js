
/** a cache class where you can store dataPacks to use them quicker instead of
 * calling the api with the same parameters again and again.
 */
class cache{
    #cache = {};

        // todo change the parameter iatacode for something that uses latitude and longitude
    /**
     * Checks if the coords are already in the cache.
     * @param {} iatacode 
     * @returns a boolean telling if the <> is already in the cache
     */
    isOnCache(iatacode){
        return (this.#cache[iatacode] != undefined) && isOlderRegister();
    }

    /**
     * Adds to the cache a new entry, wich has a <> and weatherPack.
     * @param {*} iatacode 
     * @param {object} weatherPack
     */
    addToCache(iatacode, weatherPack){
        this.#cache[iatacode] = weatherPack;
    }

    /**
     * Gives you the current WeatherPack contained in the coods defined by parameter.
     * if the coords are not in the cache, then returns an error insthead.
     * @param {*} iataCode 
     * @returns {object}
     */
    getWeatherPack(iataCode){
        if(!this.isOnCache(iataCode)){
            console.error('Iata code not found inside of the cache');
        }else{
            return this.#cache[iataCode];
        }
    }

    /**
     * Returns the cache to his fist state, empty.
     */
    refreshCache(){
        this.#cache = {}
    }

    /**
     * Updates the entry specified in the parameters with the new
     * WeatherPack also especified in the parameters.
     * @param {*} iatacode 
     * @param {object} newWeatherPack 
     */
    updateWeatherPack(iatacode, newWeatherPack){
        if(!this.isOnCache(iatacode)){
            console.error('Iata code not found inside of the cache');
        }else{
            this.#cache[iatacode] = newWeatherPack;
        }
    }

    //todo create a new method called isOldeerRegister to check if the weather pack has a time older than 5 minutes.
    //todo create a new security step to prevent for making more than 60 calls with the api.
}

module.exports = cache;