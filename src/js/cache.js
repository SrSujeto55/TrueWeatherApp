
/** a cache class where you can store dataPacks to use them quicker instead of
 * calling the api with the same parameters again and again.
 */
class cache{
    #cache = {};

    /**
     * Checks if the coords are already in the cache.
     * @param {} coordKey 
     * @returns a boolean telling if the <> is already in the cache
     */
    isOnCache(coordKey){
        return (this.#cache[coordKey] != undefined);
    }

    /**
     * Adds to the cache a new entry, wich has a <> and weatherPack.
     * @param {*} coordKey 
     * @param {object} weatherPack
     */
    addToCache(coordKey, weatherPack){
        this.#cache[coordKey] = weatherPack;
    }

    /**
     * Gives you the current WeatherPack contained in the coods defined by parameter.
     * if the coords are not in the cache, then returns an error insthead.
     * @param {*} coordKey 
     * @returns {object}
     */
    getWeatherPack(coordKey){
        if(!this.isOnCache(coordKey)){
            console.error('Error trying to get a coordKey wich is not in the cache');
        }else{
            return this.#cache[coordKey];
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
     * @param {*} coordKey 
     * @param {object} newWeatherPack 
     */
    updateWeatherPack(coordKey, newWeatherPack){
        if(!this.isOnCache(coordKey)){
            console.error('Error trying to update a coordKey wich is not in the cache');
        }else{
            this.#cache[coordKey] = newWeatherPack;
        }
    }

    isOlderRegister(coordKey){
        const weatherpack = this.getWeatherPack(coordKey);
        return this.checkTime(weatherpack.time, 5)
    }

    checkTime(time, lapse){
        const date = new Date();
        return (date.getHours() != time.hour) || (date.getMinutes < time.minute) || (date.getMinutes() - time.minute >= lapse)
    }
 
    //todo create a new security step to prevent for making more than 60 calls with the api.
}

module.exports = cache;