const { VError } = require('verror');
const _ = require('lodash');

const { eventTypes } = require('../../const/events');
const { eventHandlerMap } = require('./index');

/**
 *
 * @param {*} message
 */
function parseMessageBody(message) {
    if (!message.Body) {
        throw new VError({ info: message }, 'Empty message body');
    }

    try {
        if (_.isString(message.Body)) {
            message.Body = JSON.parse(message.Body);
        }
    } catch (error) {
        throw new VError({ info: message.Body }, 'Unable to parse message body');
    }
}

/**
 *
 * @param {*} event
 */
function assertEventTypes(event) {
    if (!eventTypes[event]) {
        throw new VError({ info: event }, 'Unrecognized event');
    }
}

/**
 *
 * @param {*} event
 * @param {*} payload
 */
async function handleEvent(event, payload) {
    console.log(`Calling handler for ${event} with payload`, { payload });
    await new Promise((resolve, reject) => {
        try {
            eventHandlerMap[event](payload);
            console.log(`Handled ${event} with payload`, { payload });
            resolve();
        } catch (error) {
            console.log(`Failed to handle ${event} with payload`, { payload });
            reject();
        }
    });
}

/**
 *
 * @param {*} message
 */
async function handleMessage(message) {
    const { Body: { event, payload } } = message;

    assertEventTypes(event);

    await handleEvent(event, payload);
}

module.exports = {
    handleMessage,
    parseMessageBody,
};
