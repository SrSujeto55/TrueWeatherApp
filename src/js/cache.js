class cache{
    #cache = {};

    isOnCache(iatacode){
        return this.#cache[iatacode] != undefined;
    }

    addToCache(iatacode, weatherPack){
        this.#cache[iatacode] = weatherPack;
    }

    getWeatherPack(iataCode){
        if(!this.isOnCache(iataCode)){
            console.error('Iata code not found inside of the cache');
        }else{
            return this.#cache[iataCode];
        }
    }

    refreshCache(){
        this.#cache = {}
    }

    updateWeatherPack(iatacode, newWeatherPack){
        if(!this.isOnCache(iatacode)){
            console.error('Iata code not found inside of the cache');
        }else{
            this.#cache[iatacode] = newWeatherPack;
        }
    }
}