const { default: mongoose } = require('mongoose');
const { VError } = require('verror');
const { Feed } = require('../../models/feeds');

async function handler(payload) {
    console.log('Processing update event with payload:', { payload });
    try {
        await Feed.updateOne(
            { _id: mongoose.Types.ObjectId(payload.id) },
            { $set: (({ id, ...o }) => o)(payload) },
        );
    } catch (error) {
        throw new VError({ cause: error }, 'Unable to update feeds');
    }
}

module.exports = {
    handler,
};
