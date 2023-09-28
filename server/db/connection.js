const moongoose = require('mongoose')

const url = `mongodb+srv://anmolgaur87:@cristiano7cluster0.7xhmzm9.mongodb.net/?retryWrites=true&w=majority`


moongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('Connected to db')).catch((error) => { console.log(error);})