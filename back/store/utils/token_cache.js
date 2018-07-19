const NodeCache     = require('node-cache');

class CacheManager {

    constructor(){
        this.cacheInstance = new NodeCache({
            stdTTL: 20,
            checkperiod: 4,
            errorOnMissing: false
        });
    }

    async set(key, value){
        try {
            this.cacheInstance.set(key, value);
            return true;
        } catch (err) {
            console.error(err);
            throw new ApiException({
                status: 500,
                error: 'Cache failure'
            });
        }
    }

    get(key){
        return this.cacheInstance.get(key);
    }
}

module.exports = new CacheManager();