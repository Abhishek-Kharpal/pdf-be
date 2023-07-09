const express = require('express');
const router = express.Router();

const { login: loginController } = require('../controllers/login');

router.route('/').post(loginController);

module.exports = router;
