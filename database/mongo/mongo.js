const {MongoMemoryServer} = require('mongodb-memory-server');
const {mongoClient} = require('mongodb');

let database = null;

async function starDatabase(){
    const mongo = new MongoMemoryServer();
    const mongoDBURL = await mongo.getConnectionString();
    const connection = await mongoClient.connect(mongoDBURL, {useNewUrlParser: true});
    database = connection.db();
}

async function getDatabase(){
    if(!database) await starDatabase();
    return database;
}
module.exports = {
    getDatabase,
    starDatabase
}