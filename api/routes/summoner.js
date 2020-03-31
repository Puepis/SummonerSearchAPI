
/*
 * This module defines the endpoints for users
 */

// String formatting
const formatUnicorn = require('format-unicorn/safe');

// Constants
const constants = require('../constants/riot_constants');

require('dotenv').config();

const express = require('express');
const router = express.Router();

// Summoner ID by name
router.get('/id/by/name', async (req, res) => {
    const { region, summonerName } = req.body;

    try {
        const idResponse = await fetch(formatUnicorn(constants.URL['base'], {
            region: region,
            url: formatUnicorn(constants.URL['summoner_by_name'], {
                version: constants.API_VERSIONS['summoner'],
                summoner_name: summonerName,
                api_key: process.env.RIOT_KEY
            })
        }));
        console.log(idResponse);
        res.send(idResponse);
    } catch (e) {
        res.status(401);
    }
});

// Ranked info by id
router.get('/ranked/by/id', async (req, res) => {
    const { region, id } = req.body;

    try {
        const rankedResponse = await fetch(formatUnicorn(constants.URL['base'], {
            region: region,
            url: formatUnicorn(constants.URL['league_by_summoner'], {
                version: constants.API_VERSIONS['league'],
                summoner_id: id,
                api_key: process.env.RIOT_KEY
            })
        }));
        res.send(rankedResponse);
    } catch (e) {
        res.status(401);
    }
});

// Mastery level by id
router.get('/mastery/by/id', async (req, res) => {
    const { region, id } = req.body;

    try {
        const masteryScore = await fetch(formatUnicorn(constants.URL['base'], {
            region: region,
            url: formatUnicorn(constants.URL['mastery_score_by_summoner'], {
                version: constants.API_VERSIONS['champion-mastery'],
                summoner_id: id,
                api_key: process.env.RIOT_KEY
            })
        }));
        res.send(masteryScore);
    } catch (e) {
        res.status(401);
    }
});

module.exports = router;
