const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file');
const multer = require('multer');

const upload = multer();

router.route('/').post(upload.single('file'), fileController.uploadFile);

module.exports = router;
