const {startDatabase} = require('./mongo/mongo');
const {insetAd, getAds} = require('./mongo/ads');


//Here is an example to use mongodb
app.get('/', (req,res)=>{
    res.send(await getAds);
});

startDatabase().then(async ()=>{
    await insetAd({'title': 'Hello , now from In memoryDatabase'});
});

app.listen(8080);