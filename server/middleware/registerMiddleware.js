const bcrypt = require('bcrypt');

// A function that allows the user to register a unique email and password.

module.exports = function(req, res) {
	//Check that email and password are not null
	if (req.body.email == '' || req.body.password == '') {
		res.status(400).json({ message: 'error creating new user - you need to supply both an email and password' });
	} else {
		// Hash user password and create insert object
		let user_name = req.body.email;
		let hash = bcrypt.hashSync(req.body.password, 10);
		console.log(req.body);
		let insert = { email: user_name, password: hash };
		req.db
			.insert(insert)
			.into('users')
			.then(function(id) {
				res.status(201).json({ message: "yay! you've successfully registered your user account :)" });
			})
			// return error if email already exists in database
			.catch(function(err) {
				res.status(400).json({ message: 'oops! It looks like that user already exists :(' });
				throw err;
			});
	}
};
