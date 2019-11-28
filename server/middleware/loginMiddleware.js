const express = require('express');
const options = require('../knexfile.js');
const knex = require('knex')(options);
var moment = require('moment');
var jwt = require('jwt-simple');
var app = express();
const bcrypt = require('bcrypt');
app.set('jwtTokenSecret', 'VyJ2xZ8GhgNL3hA0wSotdEVePGWEDMIHZL9lbxv1sUusXiSQclNvgiLQIAPWrFI');

// A function that authenticates pre-existing user using an email and password
// and return a jwt token to the client.

module.exports = function(req, res) {
	var user_name = req.body.email;
	var given_password = req.body.password;
	matched = false;

	knex('users')
		.where({
			email: user_name
		})
		.select('password')
		.then(function(Password) {
			var string = JSON.stringify(Password);
			var json = JSON.parse(string);

			//compare stored, hashed password with given password using bcrypt
			if (Password.length === 0) {
				res.status(401).json({ message: 'invalid login - bad password' });
			} else if (bcrypt.compareSync(given_password, json[0].password)) {
				matched = true;
			}

			//If password is valid, create and send jwt to client
			if (!matched) {
				res.status(401).json({ message: 'invalid login - bad password' });
			} else {
				var expiration = moment().add('days', 7).valueOf();
				let token = jwt.encode(
					{
						iss: user_name,
						exp: expiration
					},
					app.get('jwtTokenSecret')
				);
				token = {
					access_token: token,
					token_type: 'Bearer',
					expires_in: expiration
				};
				res.status(200).json(token);
			}
		});
};
