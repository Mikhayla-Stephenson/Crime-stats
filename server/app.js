var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var rfs = require('rotating-file-stream');

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const helmet = require('helmet');
const cors = require('cors');

var postRoutes = require('./routes/postRoutes');
var helperRoutes = require('./routes/helperRoutes');

var app = express();

var accessLogStream = rfs('access.log', {
	interval: '1d',
	path: path.join(__dirname, 'log')
});

//Uncomment below to allow https. This WILL cause issues with self signed certs.

/*
const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync(' /etc/ssl/private/node-selfsigned.key','utf8');
const certificate = fs.readFileSync('/etc/ssl/certs/node-selfsigned.crt','utf8');
const credentials = {
 key: privateKey,
 cert: certificate
};

const server = https.createServer(credentials,app);
server.listen(443);
*/

logger.token('req', (req, res) => JSON.stringify(req.headers));
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');

logger.token('res', (req, res) => {
	const headers = {};
	res.getHeaderNames().map((h) => (headers[h] = res.getHeader(h)));
	return JSON.stringify(headers);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('common'));
app.use(logger('combined', { stream: accessLogStream }));
app.use(helmet());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: [ "'self'" ]
		}
	})
);
app.use(cors());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', postRoutes);
app.use('/', helperRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
