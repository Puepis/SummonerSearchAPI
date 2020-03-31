
const express = require('express');
const bodyParser = require('body-parser');

// Create express app
const app = express()

// Bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use('/summoner', require('./api/routes/summoner'));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`SummonerSearch server started on port ${PORT}`));
