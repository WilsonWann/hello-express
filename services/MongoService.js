class MongoService {
    /*
    *
    * @param {MongoClient} mongoClient
    */
    constructor({ mongoClient, echoDao }) {
        this.mongoClient = mongoClient;
        this.echoDao = echoDao;
    }

    /*
    *
    * @return Promise<bool>
    */
    isConnected() {
        return Promise.resolve(this.mongoClient.isConnected());
    }

    /**
     * 
     * @param {*} data 
     * @returns Promise
     */
    async insertEcho(data) {
        return this.echoDao.insert(data);
    }
}

module.exports = MongoService;