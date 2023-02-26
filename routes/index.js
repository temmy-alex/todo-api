const route = require('express').Router()
const todoRoute = require('./todo');

route.use('/todo', todoRoute);

module.exports = route