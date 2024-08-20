const express = require('express');
const { todolist } = require('../controllers');
const router = express.Router();

// Define routes and map to controller methods
router.get('/', todolist.getAll);
router.get('/:id', todolist.getById);
router.post('/', todolist.create);

module.exports = router;