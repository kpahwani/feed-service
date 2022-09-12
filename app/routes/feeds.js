const express = require('express');
const config = require('config');

const router = express.Router();

const { VError } = require('verror');
const { default: mongoose } = require('mongoose');
const { Feed } = require('../models/feeds');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
        res.send('Invalid user id', 400);
    }
    const skip = req.query.skip || 0;
    const limit = req.query.limit || config.get('LIMIT');
    try {
        const userFeeds = await Feed.find({ user_id: userId }).skip(skip).limit(limit);
        res.send(userFeeds);
    } catch (error) {
        throw new VError({ cause: error }, 'Unable to fetch latest feeds');
    }
});

module.exports = router;
