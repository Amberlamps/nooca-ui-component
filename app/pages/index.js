'use strict';

/**
 * MODULES.
 */
var express = require('express');
var router = express.Router();
var dust = require('dustjs-linkedin');
var debug = require('debug')('pages');


/**
 * ROUTES.
 */
router.use('/', (req, res, next) => {
  debug('getting index page');
  res.set('Content-Type', 'text/html');
  dust.stream("module.html", {}).pipe(res);
});


/**
 * EXPORTS.
 */
module.exports = router;