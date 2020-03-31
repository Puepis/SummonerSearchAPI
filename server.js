
const express = require('express');
const bodyParser = require('body-parser');

// Create express app
const app = express()

// Bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Enable CORS for all resources
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
app.use('/summoner', require('./api/routes/summoner'));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

// To deploy to heroku, use "git push heroku master"
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`SummonerSearch server started on port ${PORT}`));
