const express = require('express');
const router = express.Router();
const todolist = require('./todolist');
const todoitem = require('./todoitem');

router.use('/todolist', todolist);
router.use('/todoitems', todoitem);

module.exports = router;