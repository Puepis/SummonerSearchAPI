
/*
 * This module defines the endpoints for users
 */

// String formatting
const formatUnicorn = require('format-unicorn/safe');

// Constants
const constants = require('../constants/riot_constants');

const axios = require('axios').default;

require('dotenv').config();

const express = require('express');
const router = express.Router();

// Summoner ID by name
router.post('/id/by/name', async (req, res) => {
    const { region, name } = req.body;

    const url = formatUnicorn(constants.URL['base'], {
        region: region,
        url: formatUnicorn(constants.URL['summoner_by_name'], {
            version: constants.API_VERSIONS['summoner'],
            summoner_name: name,
            api_key: process.env.RIOT_KEY
        })
    });

    try {
        const idResponse = await axios.get(url);
        res.send(idResponse.data);
    } catch (e) {
        console.log(e);
        res.status(401).send(e);
    }
});

// Ranked info by id
router.post('/ranked/by/id', async (req, res) => {
    const { region, id } = req.body;

    try {
        const rankedResponse = await axios.get(formatUnicorn(constants.URL['base'], {
            region: region,
            url: formatUnicorn(constants.URL['league_by_summoner'], {
                version: constants.API_VERSIONS['league'],
                summoner_id: id,
                api_key: process.env.RIOT_KEY
            })
        }));
        res.send(rankedResponse.data);
    } catch (e) {
        console.log(e);
        res.status(401).send(e);
    }
});

// Mastery level by id
router.post('/mastery/by/id', async (req, res) => {
    const { region, id } = req.body;

    const url = formatUnicorn(constants.URL['base'], {
        region: region,
        url: formatUnicorn(constants.URL['mastery_score_by_summoner'], {
            version: constants.API_VERSIONS['champion-mastery'],
            summoner_id: id,
            api_key: process.env.RIOT_KEY
        })
    });

    try {
        const masteryScore = await axios.get(url);
        res.send({id: masteryScore.data});
    } catch (e) {
        console.log(e);
        res.status(401).send(e);
    }
});

module.exports = router;
