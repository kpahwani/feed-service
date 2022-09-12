const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const { listen: listenToSQS } = require('./events/sqs/listen');

const app = express();

// Routing
const feeds = require('./routes/feeds');

app.use('/feeds', feeds);

const DATABASE_CONNECTION = config.get('DATABASE_CONNECTION');

function server() {
    console.log('Entered feed server');
    listenToSQS();

    mongoose.connect(DATABASE_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
    process.env.db = mongoose.connection;
    console.log('Established database connection');

    return Promise.resolve(app);
}

module.exports = {
    server,
};
