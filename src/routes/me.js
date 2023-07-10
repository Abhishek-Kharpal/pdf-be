const express = require('express');
const { getMe } = require('../controllers/me');

const router = express.Router();

router.route('/').get(getMe);

module.exports = router;
