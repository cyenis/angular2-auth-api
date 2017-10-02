const express = require('express');
const router = express.Router();

const response = require('../helpers/response');
const requireAuthentication = require('../middlewares/require-authentication');
const Task = require('../models/task').Task;

router.use(requireAuthentication);

router.get('/', (req, res, next) => {
  Task.find({}, (err, tasks) => {
    if (err) {
      return next(res);
    }
    let data = tasks.map((task) => new Task(task));
    return response.data(req, res, data);
  });
});

router.get('/:id', (req, res, next) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return response.notFound(req, res);
  }
  Task.findById(req.params.id, (err, task) => {
    if (err) {
      return next(err);
    }
    if (!task) {
      return response.notFound(req, res);
    }
    return response.data(req, res, task.asData());
  });
});

module.exports = router;
