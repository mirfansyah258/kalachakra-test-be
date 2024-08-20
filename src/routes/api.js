const express = require('express');
const router = express.Router();
const todolist = require('./todolist');

router.use('/todolist', todolist);

module.exports = router;