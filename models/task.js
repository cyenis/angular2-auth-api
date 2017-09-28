const express = require('express');
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

const Task = mongoose.model('Task', taskSchema);

module.exports = {
    Task
};
