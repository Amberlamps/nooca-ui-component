/**
 * MODULES.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var pages = require('./pages');
var debug = require('debug')('server');
var fs = require('fs');

var dust = require('dustjs-linkedin');

dust.config.whitespace = false;
dust.config.cache = false;

// Define a custom `onLoad` function to tell Dust how to load templates
dust.onLoad = (tmpl, cb) => {
  fs.readFile(path.join('./app/views', path.relative('/', path.resolve('/', tmpl))), {
    encoding: 'utf8'
  }, cb);
};


/**
 * VARIABLES.
 */
var app = express();


/**
 * SETTINGS.
 */
app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pages);

app.use(function onNotFound(req, res, next) {
  res.status(404).json({
    error: 'Page not found'
  });
});

if (app.get('env') === 'development') {
  app.use(function onError(err, req, res, next) {
    debug(err);
    res.status(err.status || 500).json({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
  });
} else {
  app.use(function onError(err, req, res, next) {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
      stack: {}
    });
  });
}

/**
 * EXPORTS.
 */
module.exports = app;