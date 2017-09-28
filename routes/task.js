var express = require('express');
var router = express.Router();
var Task = require('../models/task').Task;
var response = require('../helpers/response');

//Todo List
router.get('/', function(req, res, next) {

  Task.find({}, (err, data) => {
    if(err){
      response.unexpectedError(res);
      return;
    }
    res.json(data);
  });
});

router.get('/:id', function(req, res, next) {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    response.notFound(res);
    return;
  }
  Task.findById(req.params.id, (err, data) => {

    if(err){
      response.unexpectedError(req, res, err);
      return;
    }

    if(!data){
      response.notFound(res);
      return;
    }

    res.json(data);
  });
});

module.exports = router;
