const express = require('express');
var app = express();
app.set('jwtTokenSecret', 'VyJ2xZ8GhgNL3hA0wSotdEVePGWEDMIHZL9lbxv1sUusXiSQclNvgiLQIAPWrFI');

//A function the be used in authorized searches.

module.exports = function(req, res, next) {
	let offence = req.query.offence; //either a value or undefined
	//Filters
	let area = [ 'offences.area', req.query.area ];
	let gender = [ 'gender', req.query.gender ];
	let age = [ 'age', req.query.age ];
	let year = [ 'year', req.query.year ];
	let month = [ 'month', req.query.month ];
	let queryList = [ area, gender, age, year, month ];
	let counter = 0;

	let array = [];
	let offenceCheck = offence.split(',');
	//check an offence has been selected
	if (offenceCheck.length > 1) {
		res.status(500).json({
			message:
				'oh no! It looks like there was a database error while performing your search, give it another try...'
		});
	}
	//remove filters that have not been specified
	for (let j = 0; j < queryList.length; j++) {
		if (queryList[j][1] != null) {
			queryList[j][1] = queryList[j][1].split(',');
			array[counter] = queryList[j];
			counter++;
		}
	}

	let obj = {};
	obj['offence'] = offence;
	// loop through each filter, sort and turn into an object
	for (let i = 0; i < array.length; i++) {
		let value = '';
		let subject = array[i];
		for (let k = 0; k < subject[1].length; k++) {
			if (k !== subject[1].length - 1) {
				value = value + subject[1][k] + ',';
			} else {
				value = value + subject[1][k];
			}
		}
		let string = array[i][0];
		obj[string] = value;
	}
	if (offence == '') {
		res.status(400).json({ message: "oops! it looks like you're missing the offence query parm" });
	} else {
		req.db
			//Access database, link "pretty" format to usable format (e.g. armed robbery => armedrobbery)
			.from('offence_columns')
			.select('column')
			.where('pretty', offence)
			.then((offence) =>
				req.db
					.from('offences')
					// create table with:  area | Total | lng | lat : columns
					.select('offences.area as LGA')
					.sum(offence[0].column + ' as total')
					.select('lat', 'lng')
					.innerJoin('areas', 'offences.area', 'areas.area')
					.modify(function(queryBuilder) {
						// this query builder should collect data based on the specified filters.
						// structure should be:
						// "where" filterA = specA "andWhere" filterB = specB 'orWhere' filterB = specC 'andWhere' etc.
						for (let i = 0; i < array.length; i++) {
							let holder = array[i];
							for (let j = 0; j < holder[1].length; j++) {
								//if this is the first filter, start with "where"
								if (i === 0 && j === 0) {
									queryBuilder.where(holder[0], holder[1][j]);
								} else {
									// if this is the first spec of the next filter, use "andWhere"
									if (holder[1].length === 0 || j === 0) {
										queryBuilder.andWhere(holder[0], holder[1][j]);
									} else {
										// if this is not the first spec of a filter (e.g. 2002 and 2003 in the array years = [2001,2002,2003])
										// use orWhere
										queryBuilder.orWhere(holder[0], holder[1][j]);
									}
								}
							}
						}
					})
					.groupBy('offences.area')
					.then((rows) => {
						res.status(200).json({ query: obj, result: rows });
					})
			)
			.catch((err) => {
				console.log(err);
			});
	}
};
