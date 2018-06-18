/* eslint-env node */
'use strict';

module.exports = function(app) {
  const express = require('express');
  let tokenRouter = express.Router();

  tokenRouter.get('/', function(req, res) {
    res.send({
      'token': []
    });
  });

  tokenRouter.post('/', function(req, res) {
    // copied for a quick example
    res.send({"access_token":"ACCESS_TOKEN","token_type":"bearer","expires_in":2592000,"refresh_token":"REFRESH_TOKEN","scope":"read","uid":100101,"info":{"name":"Mark E. Mark","email":"mark@thefunkybunch.com"}});
  });

  tokenRouter.get('/:id', function(req, res) {
    res.send({
      'token': {
        id: req.params.id
      }
    });
  });

  tokenRouter.put('/:id', function(req, res) {
    res.send({
      'token': {
        id: req.params.id
      }
    });
  });

  tokenRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/token', require('body-parser').json());
  app.use('/api/token', tokenRouter);
};
