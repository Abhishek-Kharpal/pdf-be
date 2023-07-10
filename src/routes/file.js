const express = require('express');
const fileController = require('../controllers/file');
const multer = require('multer');

const router = express.Router();
const upload = multer();

router.route('/upload').post(upload.single('file'), fileController.uploadFile);

router.route('/:id').get(fileController.getFileByID);

module.exports = router;
