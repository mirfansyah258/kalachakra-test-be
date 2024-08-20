const express = require('express');
const { todoitem } = require('../controllers');
const router = express.Router();

// Define routes and map to controller methods
router.post('/', todoitem.create);
router.get('/:id', todoitem.getAllById);
router.put('/check/:id', todoitem.check);
router.put('/:id', todoitem.update);
router.delete('/:id', todoitem.delete);

module.exports = router;