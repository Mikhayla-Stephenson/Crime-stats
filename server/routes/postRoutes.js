const express = require('express');
const router = express.Router();
const options = require('../knexfile.js');
const knex = require('knex')(options);
const checkToken = require('../middleware/checkToken.js');
const searchMiddleware = require('../middleware/searchMiddleware.js');
const loginMiddleware = require('../middleware/loginMiddleware.js');
const registerMiddleware = require('../middleware/registerMiddleware.js');

router.use((req, res, next) => {
	req.db = knex;
	next();
});

//These routes involve some form of authentification

/**
 * Route to login
 * Validates user and generates JWT token
 */
router.post('/login', loginMiddleware);

/**
 * Route to Register
 * Creates new user if they don't already exist
 */
router.post('/register', registerMiddleware);

/**
 * Search Route
 * Queries database based on offence and filters sent
 */

router.get('/search?', checkToken, searchMiddleware);

module.exports = router;
