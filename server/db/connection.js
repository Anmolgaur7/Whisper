const moongoose = require('mongoose')

const url = `mongodb+srv://anmolgaur26:Cristiano7@cluster0.hlpolen.mongodb.net/?retryWrites=true&w=majority`


moongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('Connected to db')).catch((error) => { console.log(error);})