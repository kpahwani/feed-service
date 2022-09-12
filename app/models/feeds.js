const mongoose = require('mongoose');

const { Schema } = mongoose;

const feedSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    content_url: { type: String, trim: true },
    created_at: Date,
});

const Feed = mongoose.model('feeds', feedSchema);

module.exports = {
    Feed,
};
