const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.route('/me').get(userController.getMe);

module.exports = router;
