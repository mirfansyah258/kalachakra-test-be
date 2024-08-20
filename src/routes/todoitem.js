const express = require('express');
const { todoitem } = require('../controllers');
const router = express.Router();

// Define routes and map to controller methods
router.post('/', todoitem.create);

module.exports = router;