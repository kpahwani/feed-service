const { default: mongoose } = require('mongoose');
const { VError } = require('verror');
const { Feed } = require('../../models/feeds');

async function handler(payload) {
    console.log('Processing create event event with payload:', { payload });
    try {
        await Feed.insertMany([{
            user_id: mongoose.Types.ObjectId(),
            content_url: payload.content_url,
            created_at: payload.created_at,
        }]);
    } catch (error) {
        throw new VError({ cause: error }, 'Unable to create feed');
    }
}

module.exports = {
    handler,
};
