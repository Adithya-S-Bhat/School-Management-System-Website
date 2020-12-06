const express = require('express');
const router = express.Router();
const url=require('url')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Home Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

module.exports = router;