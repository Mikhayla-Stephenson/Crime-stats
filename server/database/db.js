const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root', //insert user type
	password: '****', // insert your db password here
	database: 'web_computing' // insert database name
});
connection.connect(function(err) {
	if (err) throw err;
});
module.exports = (req, res, next) => {
	req.db = connection;
	next();
};
