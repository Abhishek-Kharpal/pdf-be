const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file');

router.route('/').get(fileController.getFilesByUser);

module.exports = router;
