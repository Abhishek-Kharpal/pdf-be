const express = require('express');
const router = express.Router();

const { register: registerController } = require('../controllers/register');

router.route('/').post(registerController);

module.exports = router;
