const { handler: updateFeedHandler } = require('../eventHandler/updateFeed');
const { handler: createFeedHandler } = require('../eventHandler/createFeed');
const { handler: deleteFeedHandler } = require('../eventHandler/deleteFeed');
const { eventTypes } = require('../../const/events');

const eventHandlerMap = {
    [eventTypes.UPDATE_USER_FEEDS]: updateFeedHandler,
    [eventTypes.CREATE_USER_FEEDS]: createFeedHandler,
    [eventTypes.DELETE_USER_FEEDS]: deleteFeedHandler,
};

module.exports = {
    eventHandlerMap,
};
