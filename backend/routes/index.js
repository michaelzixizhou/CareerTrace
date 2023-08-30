const express = require('express');
const usersRouter = require('./users');

const router = express.Router();

router.use('/api/users', usersRouter);

module.exports = router;