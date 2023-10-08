const moongoose = require('mongoose')

const url = `mongodb+srv://anmolgaur26:cristiano7@cluster0.mtpav2m.mongodb.net/?retryWrites=true&w=majority`


moongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('Connected to db')).catch((error) => { console.log(error);})