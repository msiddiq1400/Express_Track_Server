const express = require('express');
const mongoose = require('mongoose');

const app = express();

const mongoUri = 'mongodb://127.0.0.1:27017';
mongoose.connect(mongoUri,{
    dbName: 'tracker',
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("database connected")
})

mongoose.connection.on('error', (err) => {
    console.log("error connecting to mongo", err)
})

app.get('/', (req, res) => {
    res.send("hi there");
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})