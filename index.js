"use strict";

var express = require('express')
  , app = express()
  , environment = require('./config/environment')
  , http = require('http')
  , server = http.createServer(app)

module.exports = app

environment.init(app)
  .then(function(app) {
    var pubsub = require('./app/pubsub').init().listen(server, app)
    var routes = require('./app/routes')(app)

    var port = (process.env.PEPYATKA_SERVER_PORT || app.get('port'))

    server.listen(port, function() {
      app.logger.info("Express server is listening on port " + port);
      app.logger.info("Server is running in " + (process.env.NODE_ENV || "development") + " mode")
    })
  })
