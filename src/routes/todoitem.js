const express = require('express');
const { todoitem } = require('../controllers');
const router = express.Router();

// Define routes and map to controller methods
router.post('/', todoitem.create);
router.get('/:id', todoitem.getAllById);
router.put('/:id', todoitem.update);

module.exports = router;