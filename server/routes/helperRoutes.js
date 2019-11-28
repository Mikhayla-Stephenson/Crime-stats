const express = require('express');
const router = express.Router();
const options = require('../knexfile.js');
const knex = require('knex')(options);

router.use((req, res, next) => {
	req.db = knex;
	next();
});

/**
 * HELPER ROUTES -
 *  These routes do not require authentification
 */

// return a list of offences from the database
router.get('/offences', function(req, res, next) {
	req.db
		.from('offence_columns')
		.select('pretty')
		.then((rows) => {
			let arr = new Array(rows.length);
			for (let i = 0; i < rows.length; i++) {
				arr[i] = rows[i].pretty;
			}
			res.status(200).json({ Offences: arr });
		})
		.catch((err) => {
			console.log(err);
			res.json({ Message: 'Error in MySQL query' });
		});
});

//return a list of locations from the database
router.get('/areas', function(req, res, next) {
	req.db
		.from('areas')
		.select('area')
		.then((rows) => {
			let arr = new Array(rows.length);
			for (let i = 0; i < rows.length; i++) {
				arr[i] = rows[i].area;
			}
			res.status(200).json({ areas: arr });
		})
		.catch((err) => {
			console.log(err);
			res.json({ Message: 'Error in MySQL query' });
		});
});

//return a list of ages from the database
router.get('/ages', function(req, res, next) {
	req.db
		.from('offences')
		.distinct('age')
		.then((rows) => {
			let arr = new Array(rows.length);
			for (let i = 0; i < rows.length; i++) {
				arr[i] = rows[i].age;
			}
			res.status(200).json({ ages: arr });
		})
		.catch((err) => {
			console.log(err);
			res.json({ Message: 'Error in MySQL query' });
		});
});

//return a list of years from the database
router.get('/years', function(req, res, next) {
	req.db
		.from('offences')
		.distinct('year')
		.then((rows) => {
			let arr = new Array(rows.length);
			for (let i = 0; i < rows.length; i++) {
				arr[i] = rows[i].year;
			}
			res.json({ years: arr });
		})
		.catch((err) => {
			console.log(err);
			res.status(200).json({ Message: 'Error in MySQL query' });
		});
});

//return a list of genders from the database
router.get('/genders', function(req, res, next) {
	req.db
		.from('offences')
		.distinct('gender')
		.then((rows) => {
			let arr = new Array(rows.length);
			for (let i = 0; i < rows.length; i++) {
				arr[i] = rows[i].gender;
			}
			res.json({ ages: arr });
		})
		.catch((err) => {
			console.log(err);
			res.status(200).json({ Message: 'Error in MySQL query' });
		});
});

module.exports = router;
