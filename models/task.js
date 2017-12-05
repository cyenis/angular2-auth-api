const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: Number
  },
  priority: {
    type: Number
  }
});

taskSchema.methods.asData = function () {
  return {
    id: this._id,
    status: this.status,
    priority: this.priority
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = {
  Task
};
