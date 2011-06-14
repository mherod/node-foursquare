/**
 * Construct the Foursquare.Users module.
 * @param {Object} config A valid configuration.
 */
module.exports = function(config) {
  var core = require("./core")(config),
    logger = require('log4js')(config.log4js).getLogger("node-foursquare.Users");
  
  /**
   * Returns the leaderboard for the User identified by the supplied accessToken.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getLeaderboard
   * @see https://developer.foursquare.com/docs/users/leaderboard.html
   */
  function getLeaderboard(params, accessToken, callback) {
    logger.debug("ENTERING: Users.getLeaderboard");
    core.callApi("/users/leaderboard", accessToken, "leaderboard", params || {}, callback);
  }

  /**
   * Find Foursquare Users.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name search
   * @see https://developer.foursquare.com/docs/users/search.html
   */
  function search(params, accessToken, callback) {
    logger.debug("ENTERING: Users.search");
    core.callApi("/users/search", accessToken, "results", params || {}, callback);
  }


  /**
   * Retrieve Friend Requests for the user identified by the supplied accessToken.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getRequests
   * @see https://developer.foursquare.com/docs/users/requests.html
   */
  function getRequests(accessToken, callback) {
    logger.debug("ENTERING: Users.getRequests");
    core.callApi("/users/search", accessToken, "results", {}, callback);
  }

  /**
   * Retrieve a Foursquare User.
   * @param {String} userId The id of the User to retreive.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getUser
   * @see https://developer.foursquare.com/docs/users/users.html
   */
  function getUser(userId, accessToken, callback) {
    logger.debug("ENTERING: Users.getUser");

    if(!userId) {
      logger.error("getUser: userId is required.");
      callback(new Error("Users.getUser: userId is required."));
      return;
    }

    core.callApi("/users/" + userId, accessToken, "user", null, callback);
  }

  /**
   * Retreive a named aspect for a User from the Foursquare API.
   * @param {String} aspect The aspect to retrieve. Refer to Foursquare documentation for details on currently
   * supported aspects.
   * @param {String} [userId="self"] The id of the User to retreive.
   * @param {String} [field=aspect] The field to return from the JSON response. Refer to the documentation for the
   * specific aspect for details.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getUserAspect
   * @see https://developer.foursquare.com/docs/index_docs.html
   */
  function getUserAspect(aspect, userId, field, params, accessToken, callback) {
    logger.debug("ENTERING: Users.getUser");

    if(!aspect) {
      logger.error("getUserAspect: aspect is required.");
      callback(new Error("Users.getUserAspect: aspect is required."));
      return;
    }

    field = field || aspect;
    core.callApi("/users/" + (userId || "self") + "/" + aspect, accessToken, field, params, callback);
  }

  /**
   * Retrieve a list of badges.
   * @param {String} [userId="self"] The id of the user.
   * @param {String} [field="badges"] The field to return from the JSON response. Refer to the documentation for the
   * specific aspect for details.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getBadges
   * @see https://developer.foursquare.com/docs/users/badges.html
   */
  function getBadges(userId, field, accessToken, callback) {
    logger.debug("ENTERING: Users.getBadges");

    field = field || "badges";
    getUserAspect("badges", userId, field, null, accessToken, callback);
  }

  /**
   * Retrieve Check-ins for a Foursquare User.
   * @param {String} [userId="self"] The id of the user.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getCheckins
   * @see https://developer.foursquare.com/docs/users/checkins.html
   */
  function getCheckins(userId, params, accessToken, callback) {
    logger.debug("ENTERING: Users.getCheckins");
    getUserAspect("checkins", userId, null, params, accessToken, callback);
  }

  /**
   * Retrieve Friends for a Foursquare User.
   * @param {String} [userId="self"] The id of the user.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getFriends
   * @see https://developer.foursquare.com/docs/users/friends.html
   */
  function getFriends(userId, params, accessToken, callback) {
    logger.debug("ENTERING: Users.getFriends");
    getUserAspect("friends", userId, null, params, accessToken, callback);
  }

  /**
   * Retrieve Tips for a Foursquare User.
   * @param {String} [userId="self"] The id of the user.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String|Number} [params.lat] The latitude of the location around which to search.
   * @param {String|Number} [params.lng] The longitude of the location around which to search.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getTips
   * @see https://developer.foursquare.com/docs/users/tips.html
   */
  function getTips(userId, params, accessToken, callback) {
    logger.debug("ENTERING: Users.getTips");
    getUserAspect("tips", userId, null, params, accessToken, callback);
  }

  /**
   * Retrieve Todos for a Foursquare User.
   * @param {String} [userId="self"] The id of the user.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String|Number} [params.lat] The latitude of the location around which to search.
   * @param {String|Number} [params.lng] The longitude of the location around which to search.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getTodos
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @see https://developer.foursquare.com/docs/users/todos.html
   */
  function getTodos(userId, params, accessToken, callback) {
    logger.debug("ENTERING: Users.getTodos");
    params = params || {};
    params.sort = params.sort || "recent";
    getUserAspect("todos", userId, null, params, accessToken, callback);
  }

  /**
   * Retrieve Venues visited by a Foursquare User.
   * @param {String} [userId="self"] The id of the user.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getVenueHistory
   * @see https://developer.foursquare.com/docs/users/venuehistory.html
   */
  function getVenueHistory(userId, params, accessToken, callback) {
    logger.debug("ENTERING: Users.getVenueHistory");
    getUserAspect("venuehistory", userId, "venues", params, accessToken, callback);
  }

  return {
    "getLeaderboard" : getLeaderboard,
    "search" : search,
    "getRequests" : getRequests,
    "getUser" : getUser,
    "getUserAspect" : getUserAspect,
    "getBadges" : getBadges,
    "getCheckins" : getCheckins,
    "getFriends" : getFriends,
    "getTips" : getTips,
    "getTodos" : getTodos,
    "getVenueHistory" : getVenueHistory
  }
};