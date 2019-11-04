const {getDatabase} = require('./mongo');
const collectionName = 'ads';

//To insert in database
async function insertAd(){
    const database = await getDatabase();
    const {insertId} = await database.collection(collectionName).insertOne(ad);
    return insertId;
}


//Get all ads from dayabase
async function getAds(){
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
    insertAd,
    getAds
}