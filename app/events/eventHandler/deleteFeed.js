const { default: mongoose } = require('mongoose');
const { VError } = require('verror');
const { Feed } = require('../../models/feeds');

async function handler(payload) {
    console.log('Processing event with payload:', { payload });
    try {
        await Feed.deleteOne(
            { _id: mongoose.Types.ObjectId(payload.id) },
        );
    } catch (error) {
        throw new VError({ cause: error }, 'Unable to delete feeds');
    }
}

module.exports = {
    handler,
};
