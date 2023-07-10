const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

router.route('/').post(commentController.createComment);

module.exports = router;
