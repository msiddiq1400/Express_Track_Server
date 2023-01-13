require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//routes
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

//middleware
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());

app.use(authRoutes);
app.use(trackRoutes);

//do not use localhost use 127.0.0.1
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

app.get('/', requireAuth, (req, res) => {
    res.send(`your email is ${req.user.email}`);
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})