const express = require('express');
const options = require('../knexfile.js');
const knex = require('knex')(options);
var jwt = require('jwt-simple');
var app = express();
app.set('jwtTokenSecret', 'VyJ2xZ8GhgNL3hA0wSotdEVePGWEDMIHZL9lbxv1sUusXiSQclNvgiLQIAPWrFI');

//function to be used in authorized searches. Checks the validity of a user's jwt
module.exports = function(req, res, next) {
	//Extract token
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);

		if (token.length <= 4) {
			res.status(401).json({
				message: "oops! it looks like you're missing the authorization header"
			});
		}
	}
	if (token != null) {
		try {
			// decode jwt, extract and and compare user email with database. If the email exists
			//in the database, move on to the search endpoint, else return an error.
			let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
			let given_email = decoded.iss;
			knex('users')
				.where({
					email: given_email
				})
				.select('email')
				.then(function(email) {
					if (email[0].email === given_email) {
						next();
					} else {
						res.sendStatus(401);
					}
				});
		} catch (err) {
			res.status(400).json({
				message: 'oh no! it looks like your authorization token is invalid...'
			});
			return next();
		}
	} else {
		res.status(400).json({
			message: "oops! it looks like you're missing the authorization header"
		});
	}
};
