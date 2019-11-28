var express = require('express');
var router = express.Router();
const options = require('../knexfile.js');
const knex = require('knex')(options);
router.use((req, res, next) => {
 req.db = knex
 next()
})
/* GET users listing. */
router.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login',function(req,res){
  var user_name="email@email";
  var password="password";
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});

module.exports = router;
