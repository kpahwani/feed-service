const { Consumer } = require('sqs-consumer');
const config = require('config');
const { handleMessage, parseMessageBody } = require('./handleEvents');

function createConsumer() {
    const consumer = Consumer.create({
        queueUrl: `${config.get('SERVICE_ENDPOINT')}/${config.get('ACCOUNT_ID')}/${config.get('QUEUE_NAME')}`,
        visibilityTimeout: config.get('VISIBILITY_TIMEOUT'),
        region: config.get('REGION'),
        handleMessage,
    });

    consumer.on('message_received', (message) => {
        parseMessageBody(message);
        console.log('Message received', { message });
    });

    consumer.on('error', (error) => {
        console.log(`Error : ${error}`);
    });

    return consumer;
}

function listen() {
    const consumer = createConsumer();
    console.log('Started listing to queue');
    consumer.start();
}

module.exports = {
    listen,
};
